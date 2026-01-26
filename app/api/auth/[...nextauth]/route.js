






// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb"; // We will create this file next

// const handler = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt", // Keeping JWT as you requested
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       // Passes the MongoDB user ID to the client side
//       if (session.user && token.sub) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // If signing out or at base, go home
//       if (url === baseUrl || url.includes("/auth/signin")) {
//         return baseUrl;
//       }
//       // Default success redirect
//       return `${baseUrl}/dashboard`;
//     },
//   },
// });

// export { handler as GET, handler as POST };













import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async jwt({ token, user, trigger }) {
      // 1. When user first logs in, initialize their custom fields in the DB
      if (user) {
        await dbConnect();
        const dbUser = await User.findById(user.id);
        
        // If it's a new user from the adapter, add our custom tracking fields
        if (dbUser && !dbUser.categoryStats) {
          dbUser.categoryStats = {
            probability: { attempted: 0, correct: 0 },
            brainteaser: { attempted: 0, correct: 0 },
            finance: { attempted: 0, correct: 0 },
            statistics: { attempted: 0, correct: 0 },
            coding: { attempted: 0, correct: 0 }
          };
          dbUser.university = "Not Specified";
          await dbUser.save();
        }
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // 2. Expose the User ID and custom data to the frontend
      if (session.user && token.id) {
        session.user.id = token.id;
        
        // Fetch fresh data for the session (university, etc)
        await dbConnect();
        const dbUser = await User.findById(token.id).lean();
        if (dbUser) {
          session.user.university = dbUser.university;
          session.user.totalAttempted = dbUser.totalAttempted;
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };