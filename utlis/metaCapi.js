// Meta (Facebook) Conversions API trigger — browser side.
//
// Fires one Lead event through TWO channels that share a single event_id so
// Meta deduplicates them into one conversion:
//   1. dataLayer push  -> GTM Meta Pixel tag fires the BROWSER event (uses event_id as eventID)
//   2. /api/meta-capi  -> server sends the SERVER event with the same event_id
//
// GTM setup required (once): in your Meta Pixel "Lead" tag, set the Event ID
// field to a dataLayer variable reading `meta_event_id`, and trigger it on the
// custom event `meta_lead`.

import { getAttribution } from "./marketingAttribution";

const newEventId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const lower = (value) => String(value || "").trim().toLowerCase();
const noSpace = (value) => lower(value).replace(/\s+/g, "");
const phoneDigits = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("0") ? `64${digits.slice(1)}` : digits;
};

// Normalized (un-hashed) advanced-matching fields. The Meta Pixel hashes these
// in the browser before they leave the page, so plain values here are fine.
const buildMetaUser = (formData) => ({
  em: lower(formData.email),
  ph: phoneDigits(formData.phone),
  fn: lower(formData.first_name || formData.firstname),
  ln: lower(formData.last_name || formData.lastname),
  ct: noSpace(formData.city),
  st: noSpace(formData.region),
  zp: noSpace(formData.postal_code),
  country: lower(formData.country || "NZ"),
});

export const trackMetaLead = async ({
  formData = {},
  eventName = "Lead",
  value = 0,
  currency = "NZD",
} = {}) => {
  if (typeof window === "undefined") return;

  const eventId = newEventId();
  const eventSourceUrl = window.location.href;

  // 1) Browser event via GTM (dedup key = meta_event_id).
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "meta_lead",
    meta_event_name: eventName,
    meta_event_id: eventId,
    meta_user: buildMetaUser(formData),
  });

  // 2) Server event via Conversions API.
  const { lastTouch = {}, firstTouch = {} } = getAttribution();
  const fbclid = lastTouch.fbclid || firstTouch.fbclid || "";

  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventId,
        eventName,
        eventSourceUrl,
        fbclid,
        email: formData.email || "",
        phone: formData.phone || "",
        firstName: formData.first_name || formData.firstname || "",
        lastName: formData.last_name || formData.lastname || "",
        city: formData.city || "",
        region: formData.region || "",
        postalCode: formData.postal_code || "",
        country: formData.country || "NZ",
        value,
        currency,
      }),
    });
  } catch {
    // Never block the form on tracking failure.
  }
};
