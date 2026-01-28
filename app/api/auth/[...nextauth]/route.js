import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";

// Build providers array conditionally so the app works even when OAuth env vars
// are not set (useful for local development).
const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Development-only credentials provider for quick local sign-in.
if (process.env.NODE_ENV !== "production") {
  providers.push(
    CredentialsProvider({
      name: "Demo",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "dev" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Accept any credentials in dev and return a mock user object.
        return {
          id: "dev-user",
          name: credentials?.username || "Dev User",
          email: "dev@example.com",
          image: "https://ui-avatars.com/api/?name=Dev",
        };
      },
    })
  );
}

const handler = NextAuth({
  providers,
  // Provide a fallback secret for local development if one isn't set.
  secret: process.env.NEXTAUTH_SECRET || crypto.randomBytes(32).toString("hex"),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.includes("/auth/signin")) {
        return baseUrl;
      }
      return `${baseUrl}/dashboard`;
    },
  },
});

export { handler as GET, handler as POST };