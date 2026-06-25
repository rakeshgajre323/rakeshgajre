// Server-only helpers for parsing user agents and looking up geo data.

export function parseUserAgent(ua: string): {
  device_type: string;
  os: string;
  browser: string;
} {
  const s = ua.toLowerCase();
  let device_type = "Desktop";
  if (/tablet|ipad/.test(s)) device_type = "Tablet";
  else if (/mobi|android|iphone|ipod/.test(s)) device_type = "Mobile";

  let os = "Unknown";
  if (/windows nt/.test(s)) os = "Windows";
  else if (/mac os x|macintosh/.test(s)) os = /mobile/.test(s) ? "iOS" : "macOS";
  else if (/iphone|ipad|ipod/.test(s)) os = "iOS";
  else if (/android/.test(s)) os = "Android";
  else if (/linux/.test(s)) os = "Linux";

  let browser = "Other";
  if (/edg\//.test(s)) browser = "Edge";
  else if (/chrome\//.test(s) && !/edg\//.test(s)) browser = "Chrome";
  else if (/firefox\//.test(s)) browser = "Firefox";
  else if (/safari\//.test(s) && !/chrome\//.test(s)) browser = "Safari";

  return { device_type, os, browser };
}

export function classifyReferrer(referrer: string | null): {
  source: string;
  url: string | null;
} {
  if (!referrer) return { source: "Direct", url: null };
  try {
    const u = new URL(referrer);
    const host = u.hostname.toLowerCase();
    if (/google\./.test(host)) return { source: "Google Search", url: referrer };
    if (/bing\.|duckduckgo\.|yahoo\./.test(host)) return { source: "Search", url: referrer };
    if (/(facebook|instagram|twitter|x\.com|linkedin|t\.co|youtube|tiktok|reddit)\./.test(host))
      return { source: "Social Media", url: referrer };
    return { source: "Referral", url: referrer };
  } catch {
    return { source: "Direct", url: null };
  }
}

export async function lookupGeo(ip: string | null): Promise<{
  country: string | null;
  region: string | null;
  city: string | null;
}> {
  if (!ip || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip === "::1") {
    return { country: null, region: null, city: null };
  }
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      headers: { "User-Agent": "rakesh-portfolio-analytics" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return { country: null, region: null, city: null };
    const j = (await res.json()) as { country_name?: string; region?: string; city?: string };
    return {
      country: j.country_name ?? null,
      region: j.region ?? null,
      city: j.city ?? null,
    };
  } catch {
    return { country: null, region: null, city: null };
  }
}
