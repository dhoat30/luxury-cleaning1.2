import { NextResponse } from "next/server";

// Returns the caller's IP, geo and user agent — values only available
// server-side from request headers (browser JS cannot read the client IP).
// Works behind Vercel and most CDNs; falls back gracefully when absent.
export async function GET(req) {
  const headers = req.headers;

  const forwardedFor = headers.get("x-forwarded-for") || "";
  const ip =
    forwardedFor.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "";

  const meta = {
    ip,
    country:
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      "",
    region: headers.get("x-vercel-ip-country-region") || "",
    city: decodeURIComponent(headers.get("x-vercel-ip-city") || ""),
    user_agent: headers.get("user-agent") || "",
  };

  return NextResponse.json(meta, {
    headers: { "Cache-Control": "no-store" },
  });
}
