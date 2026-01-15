// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/mongoDB";
// import connectDB from "@/lib/db";
// import User from "@/models/User";

// const handler = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     }),
//   ],
//   session: {
//     // We keep database strategy, but we MUST sync it with JWT for Middleware
//     strategy: "database", 
//   },
 
// // Inside your app/api/auth/[...nextauth]/route.js

// callbacks: {
//   async jwt({ token, user, trigger, session }) {
//     // If we just updated the session on the client side (from onboarding)
//     if (trigger === "update" && session?.isOnboarded !== undefined) {
//       token.isOnboarded = session.isOnboarded;
//     }
    
//     // Initial sign in
//     if (user) {
//       token.id = user.id;
//       token.isOnboarded = user.isOnboarded ?? false;
//     }
//     return token;
//   },

//   async session({ session, token, user }) {
//     // When using 'database' strategy, 'user' is passed, not 'token'
//     // But for the middleware, we used JWT. Let's make this bulletproof:
//     if (user) {
//       session.user.id = user.id;
//       session.user.isOnboarded = user.isOnboarded;
//       session.user.university = user.university;
//     } else if (token) {
//       session.user.id = token.id;
//       session.user.isOnboarded = token.isOnboarded;
//     }
//     return session;
//   },

//   async redirect({ url, baseUrl }) {
//     // Force redirect to dashboard after login to break the signin page loop
//     if (url === "/auth/signin" || url.includes("callbackUrl")) {
//       return `${baseUrl}/dashboard`;
//     }
//     return url.startsWith(baseUrl) ? url : baseUrl;
//   },
// },

//   pages: {
//     signIn: "/auth/signin",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };



import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({

  providers: [

    GoogleProvider({

      clientId: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),

  ],

  session: {

    strategy: "jwt",

  },

  pages: {

    signIn: "/auth/signin",

  },

});



export { handler as GET, handler as POST }


