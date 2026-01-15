



// import NextAuth from "next-auth";

// import GoogleProvider from "next-auth/providers/google";



// const handler = NextAuth({

//   providers: [

//     GoogleProvider({

//       clientId: process.env.GOOGLE_CLIENT_ID,

//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//     }),

//   ],

//   session: {

//     strategy: "jwt",

//   },

//   pages: {

//     signIn: "/auth/signin",

//   },

// });



// export { handler as GET, handler as POST }


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // ADD THIS LINE
  secret: process.env.NEXTAUTH_SECRET, 
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  // ADD THIS TO FIX VERCEL REDIRECTS
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };