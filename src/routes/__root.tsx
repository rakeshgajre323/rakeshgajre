import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import NotFound1 from "@/components/ui/8bit-not-found1";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <NotFound1 />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rakesh Gajre — UI/UX Designer" },
      { name: "description", content: "Portfolio of Rakesh Gajre — UI/UX designer and CS engineer designing intuitive digital experiences." },
      { name: "author", content: "Rakesh Gajre" },
      { property: "og:title", content: "Rakesh Gajre — UI/UX Designer" },
      { property: "og:description", content: "Portfolio of Rakesh Gajre — UI/UX designer and CS engineer designing intuitive digital experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rakesh Gajre — UI/UX Designer" },
      { name: "twitter:description", content: "Portfolio of Rakesh Gajre — UI/UX designer and CS engineer designing intuitive digital experiences." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/adb680e6-a36f-4b42-906b-284e0b3fd468" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/adb680e6-a36f-4b42-906b-284e0b3fd468" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&family=JetBrains+Mono&family=Press+Start+2P&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Cursor-velocity-aware motion: speeds animations up when the user moves quickly
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let lastX = 0, lastY = 0, lastT = 0;
    let smoothed = 0; // px/ms, exponentially smoothed
    let currentLevel = ""; // "", "fast", "turbo"
    let idleTimer: number | undefined;

    const setLevel = (lvl: string) => {
      if (lvl === currentLevel) return;
      currentLevel = lvl;
      if (lvl) root.setAttribute("data-cursor-speed", lvl);
      else root.removeAttribute("data-cursor-speed");
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastT) {
        const dt = Math.max(1, now - lastT);
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const v = Math.hypot(dx, dy) / dt; // px/ms
        smoothed = smoothed * 0.6 + v * 0.4;
        if (smoothed > 2.2) setLevel("turbo");
        else if (smoothed > 1.0) setLevel("fast");
        else setLevel("");
      }
      lastX = e.clientX; lastY = e.clientY; lastT = now;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { smoothed = 0; setLevel(""); }, 220);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(idleTimer);
      setLevel("");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* key on pathname so each route mount replays the enter animation */}
      <div key={pathname} className="route-transition">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}


