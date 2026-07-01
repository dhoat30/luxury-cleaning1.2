import { NextResponse } from "next/server";
import crypto from "crypto";

// Meta Conversions API — server side. Receives a lead event from the browser,
// enriches it with IP / user agent (headers) and _fbp / _fbc (cookies), hashes
// PII, and forwards it to Meta with the shared event_id for deduplication.

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE; // remove once verified
const API_VERSION = "v21.0";

const hash = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
};

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("0") ? `64${digits.slice(1)}` : digits;
};

export async function POST(req) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Not configured yet — succeed silently so the form flow is unaffected.
    return NextResponse.json({ success: false, message: "Meta CAPI not configured" });
  }

  const body = await req.json();
  const headers = req.headers;

  const ip =
    (headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "";
  const userAgent = headers.get("user-agent") || "";

  // _fbp / _fbc set by the Meta Pixel; build _fbc from fbclid when absent.
  const fbp = req.cookies.get("_fbp")?.value || "";
  let fbc = req.cookies.get("_fbc")?.value || "";
  if (!fbc && body.fbclid) {
    fbc = `fb.1.${Date.now()}.${body.fbclid}`;
  }

  const userData = {
    em: hash(body.email),
    ph: hash(normalizePhone(body.phone)),
    fn: hash(body.firstName),
    ln: hash(body.lastName),
    ct: hash(body.city),
    st: hash(body.region),
    zp: hash(body.postalCode),
    country: hash(body.country),
    client_ip_address: ip || undefined,
    client_user_agent: userAgent || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };
  Object.keys(userData).forEach(
    (key) => userData[key] === undefined && delete userData[key]
  );

  const payload = {
    data: [
      {
        event_name: body.eventName || "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        event_source_url: body.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: body.currency || "NZD",
          value: Number(body.value) || 0,
        },
      },
    ],
  };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return NextResponse.json({ success: res.ok, data });
  } catch (error) {
    console.error("Meta CAPI error:", error);
    return NextResponse.json({ success: false, message: String(error) });
  }
}
