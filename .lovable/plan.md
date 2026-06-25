
## Overview

Make the logo a link to `/admin/login`. Build a hardcoded-credential admin login (RAKESHGAJRE / Rakesh@323, stored server-side as a hashed secret — never in client code). After login, redirect to `/admin/dashboard` showing visitor analytics. Track visitors with a custom tracker (anonymous after consent) plus GA4 script. Allow visitors to optionally identify themselves via Google Sign-In, surfaced in an "Identified Visitors" section.

## Backend (Lovable Cloud)

Enable Lovable Cloud for database + auth (Google Sign-In for visitor identification only).

Tables:
- `visitor_sessions` — id, session_token, first_seen, last_seen, country, region, city, device_type (mobile/tablet/desktop), os, browser, referrer_source (direct/google/social/referral), referrer_url, user_id (nullable, FK to auth.users)
- `page_views` — id, session_id, path, viewed_at, time_on_page_seconds, referrer
- `identified_visitors` — view joining `auth.users` + Google profile (name, email, avatar) + aggregated session stats

RLS: visitors can insert their own session/pageview rows (anon allowed for inserts only). SELECT restricted to admin role via `has_role()` security-definer function + `user_roles` table. The single admin user gets the 'admin' role seeded by migration tied to the hardcoded username.

### Admin auth (hardcoded credentials)

Credentials are NOT a Supabase user. Approach:
- Store `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` (bcrypt of `Rakesh@323`) as server secrets, plus `SESSION_SECRET`.
- `POST /admin/login` → server function compares with `timingSafeEqual`, sets encrypted `useSession` cookie (`{ isAdmin: true }`, 7-day maxAge, httpOnly+secure+sameSite).
- All admin server fns + the `/admin/dashboard` loader call `requireAdminSession()` which throws redirect to `/admin/login` if unset.
- No signup, no password reset, no recovery — just the two fields + button.

## Frontend

Routes:
- `/admin/login` — username/password form only. No other UI elements.
- `/admin/dashboard` — protected, fetches analytics via server fn.
- Logo in header/footer becomes `<Link to="/admin/login">`.

### Tracking

- `<VisitorTracker />` mounted in `__root.tsx`:
  - Reads consent cookie. If not set, shows consent banner.
  - On consent accept: generates `session_token` (localStorage), POSTs session create to public server route `/api/public/track/session` with UA → parsed server-side for OS/device/browser; IP → geo lookup via free ipapi.co (server-side, IP truncated to /24 if user prefers privacy mode).
  - Tracks pageview on route change with time-on-previous-page.
  - Loads GA4 `gtag.js` with `VITE_GA4_MEASUREMENT_ID` only after consent.
- Consent banner copy: "We use analytics cookies to understand how visitors use this site. Accept to continue with analytics enabled."
- Separate "Sign in with Google to share your name and email" CTA (optional, not part of consent flow). Uses `lovable.auth.signInWithOAuth("google")`.

### Dashboard UI

Recharts-based, dark theme matching site:
- KPI cards: Total visitors, Today, This week, This month, Avg session duration, Bounce rate.
- Line chart: Daily traffic (last 30 days).
- Donut: Device breakdown (Mobile/Desktop/Tablet) and OS (Android/iOS/Windows/macOS/Linux).
- Bar: Top referrer sources (Direct/Google/Social/Referral).
- World/table: Visitors by country → state → city.
- Table: Recent visits (timestamp, path, country, device, referrer).
- Section "Identified Visitors": cards with avatar, name, email, first/last seen, total sessions, last city/country, recent pages.
- Embedded GA4 link-out (cannot embed GA4 dashboards directly without OAuth; provide an "Open in GA4" button using the measurement ID).
- Real-time-ish: React Query refetch every 30s + Supabase realtime subscription on `visitor_sessions` for live counter.
- Logout button → clears session cookie.

## Files

New:
- `src/routes/admin.login.tsx`, `src/routes/admin.dashboard.tsx`
- `src/lib/admin-auth.functions.ts`, `src/lib/admin-auth.server.ts` (session helpers)
- `src/lib/analytics.functions.ts` (admin queries), `src/routes/api/public/track/session.ts`, `src/routes/api/public/track/pageview.ts`
- `src/components/VisitorTracker.tsx`, `src/components/ConsentBanner.tsx`
- `src/components/admin/*` (KPICards, TrafficChart, DeviceChart, GeoTable, IdentifiedVisitorsList, etc.)
- Migration for tables, RLS, GRANTs, `app_role` enum, `user_roles`, `has_role()`.

Edited:
- `src/routes/index.tsx` — logo `<a>`/`<img>` wrapped in `<Link to="/admin/login">`.
- `src/routes/__root.tsx` — mount `<VisitorTracker />` + `<ConsentBanner />`, conditional GA4 script.

## Secrets

- `ADMIN_USERNAME` = `RAKESHGAJRE`
- `ADMIN_PASSWORD_HASH` = bcrypt(`Rakesh@323`) — generated server-side, never logged
- `SESSION_SECRET` = generated 64-char random
- `VITE_GA4_MEASUREMENT_ID` — you'll need to paste your GA4 Measurement ID (format `G-XXXXXXX`); I'll prompt for it after the build.

## Security notes

- The hardcoded password approach is a single-admin gate, not multi-user auth. It cannot be revoked per-user. Acceptable for your case but worth knowing.
- I'll never display the password or hash in chat or commit it. The plaintext you gave me is used once to compute the hash, then discarded.
- Visitor IPs are used only for geo lookup, then stored as country/region/city — raw IP is not persisted.
- Google Sign-In requires you to enable the Google provider in Lovable Cloud → Users → Providers; I'll trigger that configuration.

## Scope check

This is ~15 new files plus a migration. Confirm and I'll build it in one pass.
