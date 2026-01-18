import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    // 🔹 GOOGLE AUTH (with timeout fix)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // ✅ FIX: increase timeout to avoid OAuthCallback error
      httpOptions: {
        timeout: 10000, // 10 seconds
      },
    }),

    // 🔹 EMAIL + PASSWORD AUTH
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // User not found or Google-only account
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    // 🔹 Ensure Google users exist in DB
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },

    // 🔹 Always redirect logged-in users to dashboard
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});

export { handler as GET, handler as POST };
