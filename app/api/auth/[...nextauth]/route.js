import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

let handler;

function getHandler() {
  if (!handler) {
    handler = NextAuth(getAuthOptions());
  }

  return handler;
}

export async function GET(req, ctx) {
  return getHandler()(req, ctx);
}

export async function POST(req, ctx) {
  return getHandler()(req, ctx);
}
