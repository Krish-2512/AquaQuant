import { NextResponse } from "next/server";
import { requireCohortApi } from "@/lib/cohort";

const ALLOWED_FILE_HOSTS = ["res.cloudinary.com", "cloudinary.com"];

function sanitizeFilename(name) {
  if (!name) return "file";
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "file";
}

export async function GET(request) {
  const access = await requireCohortApi();
  if (!access.ok) {
    return access.response;
  }

  const requestUrl = new URL(request.url);
  const fileUrl = requestUrl.searchParams.get("url")?.trim() || "";
  const fileName = sanitizeFilename(requestUrl.searchParams.get("name")?.trim() || "file");

  if (!fileUrl) {
    return NextResponse.json({ success: false, error: "Missing file URL." }, { status: 400 });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(fileUrl);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid file URL." }, { status: 400 });
  }

  if (parsedUrl.protocol !== "https:") {
    return NextResponse.json({ success: false, error: "Invalid file protocol." }, { status: 400 });
  }

  const hasAllowedHost = ALLOWED_FILE_HOSTS.some(
    (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`)
  );

  if (!hasAllowedHost) {
    return NextResponse.json({ success: false, error: "Unsupported file host." }, { status: 400 });
  }

  try {
    const upstream = await fetch(parsedUrl.toString(), {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, error: "Unable to load file." },
        { status: upstream.status }
      );
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const data = await upstream.arrayBuffer();

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Inline rendering instead of forcing browser "download" behavior.
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to open file." }, { status: 500 });
  }
}

