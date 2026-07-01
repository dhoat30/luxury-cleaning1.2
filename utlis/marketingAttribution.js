// Sitewide marketing attribution capture.
//
// Captures click IDs, UTMs and Google Ads ValueTrack parameters from the URL
// into a first-party cookie (first-touch + last-touch), then exposes the data
// for the dataLayer / GTM and for form submissions.
//
// IP address and geo are NOT available to browser JS — they are fetched from
// the /api/client-meta endpoint, which reads them from request headers.

const COOKIE_NAME = "lc_attribution";
const COOKIE_MAX_AGE_DAYS = 90;

// URL params we care about. ValueTrack params (keyword, device, matchtype, etc.)
// only appear if you add them to your Google Ads final URL suffix / tracking
// template, e.g. ?keyword={keyword}&device={device}&matchtype={matchtype}
const URL_PARAM_KEYS = [
  // Click IDs
  "gclid", // Google Ads
  "gbraid", // Google Ads iOS (app)
  "wbraid", // Google Ads iOS (web)
  "msclkid", // Microsoft / Bing Ads
  "fbclid", // Meta
  // UTMs
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  // Google Ads ValueTrack (require ValueTrack params on the Ads URLs)
  "keyword",
  "matchtype",
  "device",
  "network",
  "campaignid",
  "adgroupid",
  "creative",
  "placement",
  "adposition",
  "loc_physical_ms",
  "loc_interest_ms",
];

const isBrowser = () => typeof window !== "undefined";

const readCookie = (name) => {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
};

const writeCookie = (name, value) => {
  if (!isBrowser()) return;
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${name}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

// device type inferred from the user agent (fallback when ValueTrack {device}
// is not present on the URL).
const inferDeviceType = () => {
  if (!isBrowser()) return "";
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
};

const collectUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const collected = {};
  URL_PARAM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) collected[key] = value;
  });
  return collected;
};

const hasAdSignal = (params) =>
  Boolean(
    params.gclid ||
      params.gbraid ||
      params.wbraid ||
      params.msclkid ||
      params.fbclid ||
      params.utm_source ||
      params.utm_medium ||
      params.utm_campaign
  );

// Capture attribution from the current URL. Safe to call on every page load /
// route change. First-touch is written once; last-touch updates whenever a new
// ad/UTM signal is seen.
export const captureAttribution = () => {
  if (!isBrowser()) return null;

  const urlParams = collectUrlParams();
  const now = new Date().toISOString();
  const existing = readCookie(COOKIE_NAME) || {};

  const touch = {
    ...urlParams,
    device_type: urlParams.device || inferDeviceType(),
    referrer: document.referrer || "",
    landing_page: window.location.pathname + window.location.search,
    timestamp: now,
  };

  const next = { ...existing };

  // First touch: set once, never overwritten.
  if (!existing.firstTouch) {
    next.firstTouch = touch;
  }

  // Last touch: update only when a fresh ad/UTM signal is present, so ordinary
  // internal navigation doesn't wipe the original paid source.
  if (hasAdSignal(urlParams) || !existing.lastTouch) {
    next.lastTouch = touch;
  }

  writeCookie(COOKIE_NAME, next);
  return next;
};

// Merge server-supplied meta (IP, geo, user agent) into the stored cookie.
export const mergeClientMeta = (meta) => {
  if (!isBrowser() || !meta) return;
  const existing = readCookie(COOKIE_NAME) || {};
  writeCookie(COOKIE_NAME, { ...existing, meta });
};

// Raw stored attribution object ({ firstTouch, lastTouch, meta }).
export const getAttribution = () => readCookie(COOKIE_NAME) || {};

// Flat object suitable for a dataLayer push. Prefers last-touch values (the
// click most likely responsible for the conversion) and notes the first-touch
// source for multi-touch context.
export const getAttributionForDataLayer = () => {
  const { firstTouch = {}, lastTouch = {}, meta = {} } = getAttribution();
  const touch = Object.keys(lastTouch).length ? lastTouch : firstTouch;

  return {
    gclid: touch.gclid || "",
    gbraid: touch.gbraid || "",
    wbraid: touch.wbraid || "",
    msclkid: touch.msclkid || "",
    fbclid: touch.fbclid || "",
    utm_source: touch.utm_source || "",
    utm_medium: touch.utm_medium || "",
    utm_campaign: touch.utm_campaign || "",
    utm_term: touch.utm_term || "",
    utm_content: touch.utm_content || "",
    ad_keyword: touch.keyword || "",
    ad_matchtype: touch.matchtype || "",
    ad_network: touch.network || "",
    ad_campaign_id: touch.campaignid || "",
    ad_group_id: touch.adgroupid || "",
    device_type: touch.device_type || "",
    landing_page: touch.landing_page || "",
    referrer: touch.referrer || "",
    first_touch_source: firstTouch.utm_source || (firstTouch.gclid ? "google_ads" : ""),
    first_touch_timestamp: firstTouch.timestamp || "",
    ip_address: meta.ip || "",
    geo_country: meta.country || "",
    geo_region: meta.region || "",
    geo_city: meta.city || "",
  };
};

// Human-readable block to append to the email / HubSpot message body. Always
// safe — no HubSpot property configuration required.
export const getAttributionSummary = () => {
  const a = getAttributionForDataLayer();
  const rows = [
    ["GCLID", a.gclid],
    ["GBRAID", a.gbraid],
    ["WBRAID", a.wbraid],
    ["MS Click ID", a.msclkid],
    ["UTM Source", a.utm_source],
    ["UTM Medium", a.utm_medium],
    ["UTM Campaign", a.utm_campaign],
    ["UTM Term", a.utm_term],
    ["UTM Content", a.utm_content],
    ["Matched Keyword", a.ad_keyword],
    ["Match Type", a.ad_matchtype],
    ["Network", a.ad_network],
    ["Campaign ID", a.ad_campaign_id],
    ["Ad Group ID", a.ad_group_id],
    ["Device", a.device_type],
    ["Landing Page", a.landing_page],
    ["Referrer", a.referrer],
    ["IP Address", a.ip_address],
    ["Location", [a.geo_city, a.geo_region, a.geo_country].filter(Boolean).join(", ")],
  ].filter(([, value]) => value);

  if (!rows.length) return "";

  return [
    "--- Marketing Attribution ---",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
};

// HubSpot contact property name/value pairs. The property internal names below
// must exist on your HubSpot contact object (create them as single-line text
// properties) before enabling this in a form's field list.
export const getAttributionForHubspot = () => {
  const a = getAttributionForDataLayer();
  const map = {
    // Standard HubSpot click-ID properties (already exist on the contact).
    hs_google_click_id: a.gclid,
    hs_facebook_click_id: a.fbclid,
    // The properties below are custom — create them only if you want them
    // stored on the contact (see the property list).
    gbraid: a.gbraid,
    wbraid: a.wbraid,
    google_ads_keyword: a.ad_keyword,
    google_ads_matchtype: a.ad_matchtype,
    google_ads_device: a.device_type,
    google_ads_campaign_id: a.ad_campaign_id,
    google_ads_adgroup_id: a.ad_group_id,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_term: a.utm_term,
    utm_content: a.utm_content,
    landing_page_url: a.landing_page,
    client_ip_address: a.ip_address,
  };

  return Object.entries(map)
    .filter(([, value]) => value)
    .map(([name, value]) => ({ name, value }));
};
