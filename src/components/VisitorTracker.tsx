import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

const TOKEN_KEY = "rg_v_token";
const SESSION_ID_KEY = "rg_v_sid";
const CONSENT_KEY = "rg_v_consent";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function postJSON(url: string, body: unknown) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "same-origin",
      keepalive: true,
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function VisitorTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sessionIdRef = useRef<string | null>(null);
  const pageviewIdRef = useRef<string | null>(null);
  const pageStartRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string | null>(null);
  const initedRef = useRef(false);

  // Init session once consent is granted (or already granted)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (initedRef.current) return;

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== "granted") return;

    initedRef.current = true;

    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      token = uuid();
      localStorage.setItem(TOKEN_KEY, token);
    }
    const referrer = document.referrer || null;

    postJSON("/api/public/track/session", {
      session_token: token,
      referrer,
    }).then((res) => {
      if (res?.session_id && typeof res.session_id === "string") {
        sessionIdRef.current = res.session_id;
        sessionStorage.setItem(SESSION_ID_KEY, res.session_id);
        recordPageview(window.location.pathname);
      }
    });

    const sendDuration = () => {
      if (!pageviewIdRef.current) return;
      const secs = Math.round((Date.now() - pageStartRef.current) / 1000);
      navigator.sendBeacon?.(
        "/api/public/track/pageview",
        new Blob(
          [JSON.stringify({ update_id: pageviewIdRef.current, time_on_page_seconds: secs })],
          { type: "application/json" },
        ),
      );
    };
    window.addEventListener("beforeunload", sendDuration);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendDuration();
    });

    return () => {
      window.removeEventListener("beforeunload", sendDuration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for consent grants made during the visit
  useEffect(() => {
    const onConsent = () => {
      if (!initedRef.current) {
        // trigger re-init
        initedRef.current = false;
        // Force re-run effect by reloading session bootstrap
        const evt = new Event("rg-tracker-bootstrap");
        window.dispatchEvent(evt);
      }
    };
    window.addEventListener("rg-consent-granted", onConsent);
    return () => window.removeEventListener("rg-consent-granted", onConsent);
  }, []);

  // Track route changes
  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    // finalize previous pageview duration
    if (pageviewIdRef.current) {
      const secs = Math.round((Date.now() - pageStartRef.current) / 1000);
      void postJSON("/api/public/track/pageview", {
        update_id: pageviewIdRef.current,
        time_on_page_seconds: secs,
      });
    }
    lastPathRef.current = pathname;
    pageStartRef.current = Date.now();
    if (sessionIdRef.current) recordPageview(pathname);
  }, [pathname]);

  async function recordPageview(path: string) {
    if (!sessionIdRef.current) return;
    const res = await postJSON("/api/public/track/pageview", {
      session_id: sessionIdRef.current,
      path,
      referrer: document.referrer || null,
    });
    if (res?.pageview_id && typeof res.pageview_id === "string") {
      pageviewIdRef.current = res.pageview_id;
      pageStartRef.current = Date.now();
    }
  }

  return null;
}

export function ConsentBanner() {
  const acceptedRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent) {
      acceptedRef.current = true;
      const banner = document.getElementById("rg-consent-banner");
      if (banner) banner.style.display = "none";
    }
  }, []);

  const onAccept = () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    const banner = document.getElementById("rg-consent-banner");
    if (banner) banner.style.display = "none";
    window.dispatchEvent(new Event("rg-consent-granted"));
    // Reload to bootstrap tracker cleanly
    setTimeout(() => window.location.reload(), 50);
  };
  const onDecline = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    const banner = document.getElementById("rg-consent-banner");
    if (banner) banner.style.display = "none";
  };

  return (
    <div
      id="rg-consent-banner"
      className="fixed bottom-4 left-1/2 z-[100] w-[min(640px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/85 p-4 text-sm text-white/85 shadow-2xl backdrop-blur-xl"
      role="dialog"
      aria-label="Privacy consent"
    >
      <p className="leading-relaxed">
        This site uses privacy-friendly analytics to understand traffic. Allow anonymous tracking?
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={onDecline}
          className="rounded-md border border-white/15 px-3 py-1.5 text-xs uppercase tracking-wider text-white/70 hover:bg-white/5"
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          className="rounded-md bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-black hover:bg-white/90"
        >
          Allow
        </button>
      </div>
    </div>
  );
}
