import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getMongoClientPromise } from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { logError, logWarn } from "@/lib/logger";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function createAuthOptions() {
  return {
    adapter: MongoDBAdapter(getMongoClientPromise()),
    providers: [
      GoogleProvider({
        clientId: env.googleClientId,
        clientSecret: env.googleClientSecret,
      }),
    ],
    secret: env.nextAuthSecret,
    trustHost: true,
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
    },
    pages: {
      signIn: "/auth/signin",
    },
    callbacks: {
      async signIn({ profile }) {
        if (!profile?.email) {
          logWarn("Auth sign-in rejected: missing email");
          return false;
        }

        if ("email_verified" in (profile || {}) && !profile.email_verified) {
          logWarn("Auth sign-in rejected: unverified email", {
            email: profile.email,
          });
          return false;
        }

        return true;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          try {
            await dbConnect();
            const dbUser = await User.findById(user.id).select("university categoryStats");
            if (dbUser && !dbUser.categoryStats) {
              dbUser.categoryStats = {
                probability: { attempted: 0, correct: 0 },
                brainteaser: { attempted: 0, correct: 0 },
                finance: { attempted: 0, correct: 0 },
                statistics: { attempted: 0, correct: 0 },
                coding: { attempted: 0, correct: 0 }
              };
              await dbUser.save();
            }

            token.university = dbUser?.university || "Not Specified";
          } catch (error) {
            logError("Auth JWT initialization failed", error, {
              userId: user.id,
            });
          }
        }

        return token;
      },
      async session({ session, token }) {
        if (session.user && token.id) {
          session.user.id = token.id;
          session.user.university = token.university || "Not Specified";
        }

        return session;
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) {
          return `${baseUrl}${url}`;
        }

        try {
          const parsedUrl = new URL(url);
          if (parsedUrl.origin === baseUrl) {
            return url;
          }
        } catch (error) {
          logError("Auth redirect parsing failed", error, { url, baseUrl });
          return `${baseUrl}/dashboard`;
        }

        return `${baseUrl}/dashboard`;
      },
    },
  };
}

export async function GET(req, ctx) {
  const handler = NextAuth(createAuthOptions());
  return handler(req, ctx);
}

export async function POST(req, ctx) {
  const handler = NextAuth(createAuthOptions());
  return handler(req, ctx);
}
