import { NextResponse } from "next/server";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  const cloudName = clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  const uploadPreset = clean(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  return NextResponse.json(
    {
      success: true,
      cloudinary: {
        cloudName,
        uploadPreset,
        configured: Boolean(cloudName && uploadPreset),
      },
    },
    { status: 200 }
  );
}

