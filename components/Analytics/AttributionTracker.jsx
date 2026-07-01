"use client";

// Sitewide attribution tracker. Mounted once in the root layout. On every page
// load / client-side navigation it captures URL attribution into a first-party
// cookie, and on first load enriches it with server-supplied IP/geo.

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  captureAttribution,
  mergeClientMeta,
} from "@/utlis/marketingAttribution";

export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Capture on every route change (so click IDs on any landing page are stored).
  useEffect(() => {
    captureAttribution();
  }, [pathname, searchParams]);

  // Fetch IP / geo once per session and merge into the cookie.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/client-meta")
      .then((res) => (res.ok ? res.json() : null))
      .then((meta) => {
        if (!cancelled && meta) mergeClientMeta(meta);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
