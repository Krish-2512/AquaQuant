import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req, ctx) {
  const handler = NextAuth(getAuthOptions());
  return handler(req, ctx);
}

export async function POST(req, ctx) {
  const handler = NextAuth(getAuthOptions());
  return handler(req, ctx);
}
