import { NextResponse } from 'next/server';
import axios from 'axios';
import { enforceRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { buildRequestMeta, logError, logWarn } from "@/lib/logger";
import { env } from "@/lib/env";

const ALLOWED_LANGUAGE_IDS = new Set([63, 71, 74]);
const MAX_SOURCE_CODE_LENGTH = 20000;
const MAX_STDIN_LENGTH = 5000;

export async function POST(req) {
  try {
    const clientId = getClientIdentifier(req, "judge0-anonymous");
    const rateLimit = await enforceRateLimit("judge0", clientId, {
      limit: 12,
      window: "1 m",
    });

    if (!rateLimit.allowed) {
      logWarn(
        "Judge0 execution rate limit exceeded",
        buildRequestMeta(req, { clientId })
      );
      return NextResponse.json(
        { error: "Too many code execution requests. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const body = await req.json();
    const source_code = typeof body.source_code === "string" ? body.source_code : "";
    const language_id = Number(body.language_id);
    const stdin = typeof body.stdin === "string" ? body.stdin : "";

    if (!source_code.trim()) {
      return NextResponse.json({ error: "Source code is required." }, { status: 400 });
    }

    if (!ALLOWED_LANGUAGE_IDS.has(language_id)) {
      return NextResponse.json({ error: "Unsupported language selected." }, { status: 400 });
    }

    if (source_code.length > MAX_SOURCE_CODE_LENGTH) {
      return NextResponse.json({ error: "Source code is too large." }, { status: 400 });
    }

    if (stdin.length > MAX_STDIN_LENGTH) {
      return NextResponse.json({ error: "Standard input is too large." }, { status: 400 });
    }

    if (!env.judge0ApiKey) {
      return NextResponse.json({ error: "Judge0 is not configured." }, { status: 500 });
    }

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'false', wait: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': env.judge0ApiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: {
        source_code,
        language_id,
        stdin
      },
      timeout: 15000,
    };

    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    const message =
      error.code === "ECONNABORTED"
        ? "Code execution timed out."
        : error.response?.data?.message || error.message;

    logError("Judge0 execution failed", error, buildRequestMeta(req));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
