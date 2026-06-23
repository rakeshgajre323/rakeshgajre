import { useMemo, useState, useEffect, useRef, type MouseEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Github,
  X,
  ChevronDown,
  Search,
  Compass,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Menu as MenuIcon,
  Loader,
  RefreshCw,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { GlowCard } from "@/components/ui/spotlight-card";
import portrait from "@/assets/rakesh-portrait.jpg";
import work1 from "@/assets/work-origincerti.jpg";
import award1 from "@/assets/event-techzite.jpg.asset.json";
import award2 from "@/assets/event-aura.jpg.asset.json";
import award3 from "@/assets/event-freshers.png.asset.json";
import award4 from "@/assets/event-arohana.png.asset.json";
import logoSeven from "@/assets/logo-seven.png.asset.json";
import logoJnv from "@/assets/logo-jnv.png";
import logoAurora from "@/assets/logo-aurora.png";
import logoStudentTribe from "@/assets/logo-studenttribe.png";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import upgradLogo from "@/assets/upgrad-logo.png.asset.json";
import googleStartupsLogo from "@/assets/google-startups-logo.png.asset.json";
import techMahindraLogo from "@/assets/techmahindra-logo.png.asset.json";
import relianceFoundationLogo from "@/assets/reliance-foundation-logo.png.asset.json";
import nsdcLogo from "@/assets/nsdc-logo.png.asset.json";
import courseraLogo from "@/assets/coursera-logo.png.asset.json";
import googleLogo from "@/assets/google-logo.png.asset.json";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import DotPattern from "@/components/ui/dot-pattern-1";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rakesh Gajre — UI/UX Designer & CS Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Rakesh Gajre — UI/UX designer and CS engineer designing intuitive digital experiences through research, interaction design, and user-centered thinking.",
      },
      { property: "og:title", content: "Rakesh Gajre — UI/UX Designer & CS Engineer" },
      {
        property: "og:description",
        content:
          "Designing intuitive digital experiences through user research, interaction design, and user-centered thinking.",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: portrait, fetchPriority: "high" },
    ],
  }),
  component: Index,
});

const clients = ["Figma", "Adobe XD", "Canva", "Notion", "GitHub", "Vercel", "Lovable"];

const projects = [
  { id: "01", name: "OriginCerti — Blockchain Credentials", year: "2025", href: "https://origincerti.lovable.app" },
  { id: "02", name: "Student Tribe Internship Work", year: "2026", href: "#" },
  { id: "03", name: "Campus Dashboard Concept", year: "2025", href: "#" },
  { id: "04", name: "Wellness Mobile App", year: "2024", href: "#" },
  { id: "05", name: "Design System — Atlas UI", year: "2024", href: "#" },
  { id: "06", name: "Logo Marks & Identity Studies", year: "2023", href: "#" },
];

const socials = [
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/rakesh_gajre" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/rakesh-gajre-1bba71257/" },
  { label: "GitHub", Icon: Github, href: "https://github.com/rakeshgajre323" },
];

type CertCategory = "All" | "UI/UX" | "Technology" | "AI" | "BANKING" | "Marketing";

const certifications: {
  title: string;
  issuer: string;
  date: string;
  category: Exclude<CertCategory, "All">;
  href?: string;
  logo?: string;
}[] = [
  { title: "Generative AI Foundations", issuer: "UpGrad × Microsoft", date: "2024", category: "AI", href: "https://certificates.upgrad.com/840ccdbb-9cf8-4562-a3c0-146af56e1caf-Gen-AI-jTMvFhyg8IYH4Qco.jpeg", logo: upgradLogo.url },
  { title: "Prompt to Prototype", issuer: "Google Startup School", date: "2024", category: "AI", href: "https://drive.google.com/file/d/1ylFu9i7k0kzFECX0TtYvdRjq4-5BH4sg/view?usp=sharing", logo: googleStartupsLogo.url },
  { title: "Cybersecurity Certification", issuer: "Tech Mahindra", date: "2024", category: "Technology", href: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/e87d68c3b2dd4f0a870513d22dc72661", logo: techMahindraLogo.url },
  { title: "Foundation Course in Finance", issuer: "Reliance Foundation", date: "2023", category: "BANKING", href: "https://drive.google.com/file/d/1J3G8AoqD0jBBmKXF_Xq1RSvQ_F_iLDI7/view", logo: relianceFoundationLogo.url },
  { title: "Branch Banking Executive", issuer: "NSDC", date: "2023", category: "BANKING", href: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/c3840e379d104884b60013902352e937", logo: nsdcLogo.url },
  { title: "Microsoft Excel", issuer: "Coursera", date: "2023", category: "Technology", href: "https://www.coursera.org/account/accomplishments/certificate/NQW69DUGMRGD", logo: courseraLogo.url },
  { title: "Fundamentals of Digital Marketing", issuer: "Google", date: "2023", category: "Marketing", href: "https://drive.google.com/file/d/1ClSCnYvReDnCZsgj7L_2OjDjRPtNDYAd/view", logo: googleLogo.url },
  { title: "Logo Design with Canva", issuer: "Coursera", date: "2023", category: "UI/UX", href: "https://www.coursera.org/account/accomplishments/verify/GPHT69EUFNEB", logo: courseraLogo.url },
];

const certCategories: CertCategory[] = ["All", "UI/UX", "Technology", "AI", "BANKING", "Marketing"];

const openExternalLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  // Let the browser handle modifier-clicks (cmd/ctrl/shift/middle-click) natively
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return;
  }
  // Try to open in a new tab. If the popup is blocked (e.g. sandboxed preview iframe),
  // fall through and let the native <a target="_blank"> navigation happen.
  const externalWindow = window.open(href, "_blank", "noopener,noreferrer");
  if (externalWindow) {
    event.preventDefault();
    externalWindow.opener = null;
  }
};


const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Index() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [certPreview, setCertPreview] = useState<{ src: string; title: string; isImage?: boolean } | null>(null);
  const [certLoadState, setCertLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCertImageRef = useRef<string | null>(null);

  useEffect(() => {
    if (certPreview) setCertLoadState('loading');
  }, [certPreview]);

  const [certRetryKey, setCertRetryKey] = useState(0);

  const openCert = (href: string, title: string, opts?: { scroll?: boolean }) => {
    const isImage = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(href);
    setCertPreview({ src: href, title, isImage });
    if (opts?.scroll && typeof window !== "undefined") {
      // Smooth-scroll to the certifications section and align the inline preview
      requestAnimationFrame(() => {
        const el = document.getElementById("certifications");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const handleCertHoverStart = (href: string, title: string) => {
    // Desktop hover-to-preview: only when device supports hover (skip touch)
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => openCert(href, title), 1000);
  };

  const handleCertHoverEnd = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const [certFilter, setCertFilter] = useState<CertCategory>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  const filteredCerts = useMemo(
    () => (certFilter === "All" ? certifications : certifications.filter((c) => c.category === certFilter)),
    [certFilter],
  );

  const navItems: { label: string; id: string }[] = [
    { label: "At a Glance", id: "glance" },
    { label: "Case Study", id: "featured" },
    { label: "Selected Work", id: "work" },
    { label: "Contact", id: "contact" },
  ];

  const goToSection = (id: string) => {
    setMenuOpen(false);
    // Wait for sheet close animation so scroll lands accurately
    setTimeout(() => scrollToId(id), 200);
  };

  // Scroll reveal + hero parallax. Both respect prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const main = document.querySelector("main");
    if (!main) return;

    // --- Reveal on scroll ---
    const sections = Array.from(main.querySelectorAll("section"));
    const targets: HTMLElement[] = [];

    sections.forEach((section, sIdx) => {
      if (sIdx === 0) return; // skip hero
      const el = section as HTMLElement;
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
        targets.push(el);
      }
      const children = Array.from(el.querySelectorAll<HTMLElement>(
        ":scope > div > *, :scope > div > div > *",
      )).slice(0, 24);
      children.forEach((child, i) => {
        if (child.hasAttribute("data-reveal")) return;
        child.setAttribute("data-reveal", "");
        // Mobile: snappier, smaller stagger; desktop: more cinematic stagger
        child.style.setProperty("--reveal-delay-mobile", `${Math.min(i * 25, 250)}ms`);
        child.style.setProperty("--reveal-delay", `${Math.min(i * 90, 900)}ms`);
        targets.push(child);
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    // --- Hero parallax ---
    const parallaxEls = Array.from(
      main.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let rafId = 0;
    let lastY = window.scrollY;
    const update = () => {
      rafId = 0;
      const y = lastY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    const onScroll = () => {
      lastY = window.scrollY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);




  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl">
          <img
            src={portrait}
            alt="Rakesh Gajre portrait"
            className="h-[88vh] w-full object-cover object-right md:h-[94vh] lg:h-[96vh]"
            width={1206}
            height={877}
            fetchPriority="high"
            decoding="async"
            data-parallax="0.18"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/40"
            data-parallax="0.08"
            aria-hidden="true"
          />


          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 px-4 py-4 text-[11px] font-medium tracking-[0.18em] text-foreground/90 sm:px-5 sm:py-5 md:px-8">
            <LiquidButton
              size="default"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-4 w-4" strokeWidth={2} />
              <span className="tracking-[0.18em] text-[11px] font-medium">MENU</span>
            </LiquidButton>
            <img
              src={logoSeven.url}
              alt="7."
              className="h-9 w-9 md:h-11 md:w-11 drop-shadow-[0_0_12px_rgba(255,80,80,0.35)]"
            />
            <LiquidButton size="default" type="button" onClick={() => navigate({ to: "/hire" })}>
              <span className="hidden xs:inline tracking-[0.18em] text-[11px] font-medium">CONTACT&nbsp;ME</span>
              <span className="xs:hidden tracking-[0.18em] text-[11px] font-medium">CONTACT</span>
            </LiquidButton>
          </div>

          {/* Headline */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-28 sm:pb-32 md:px-10 md:pb-32">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
                <span className="truncate">Currently — UI/UX Design Intern at Student Tribe</span>
              </div>
              <h1 className="font-display text-[11vw] leading-[0.92] tracking-tight text-foreground sm:text-[10vw] md:text-[5.5vw]">
                UI/UX DESIGNER<br />
                <span className="text-foreground/85">&amp; CS ENGINEER</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/80 md:text-base">
                Designing intuitive digital experiences through user research, interaction
                design, and user-centered thinking.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToId("featured")}
                  className="group/cta inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View Case Studies
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                </button>
                <LiquidButton asChild size="lg" className="text-xs font-semibold uppercase tracking-[0.18em]">
                  <a
                    href={resumeAsset.url}
                    download="RAKESH_GAJRE_RESUME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </LiquidButton>
              </div>

              <div className="mt-6 max-w-xl text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                Open to — UI/UX internships · Junior product designer · Junior UI/UX designer
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-foreground/15 bg-background/40 px-4 py-3 text-[10px] font-medium tracking-[0.18em] text-foreground/85 backdrop-blur sm:px-5 sm:py-4 sm:text-[11px] sm:tracking-[0.2em] md:px-8">
            <span className="min-w-0 truncate">RAKESH GAJRE — PORTFOLIO 2026</span>
            <div className="hidden items-center gap-4 md:flex">
              {socials.map((s, i) => (
                <span key={s.label} className="flex items-center gap-4">
                  {i > 0 && <span className="text-foreground/30">/</span>}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} profile`}
                    onClick={(event) => openExternalLink(event, s.href)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                  >
                    <s.Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </span>
              ))}
            </div>
            <button
              onClick={() => scrollToId("glance")}
              aria-label="Scroll for more"
              className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full px-2 py-2 transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <span className="hidden xs:inline">SCROLL FOR MORE</span>
              <span className="xs:hidden">SCROLL</span>
              <ChevronDown className="h-3.5 w-3.5 scroll-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE / GLOBAL NAV SHEET */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-[88vw] max-w-sm border-r border-border/70 bg-background p-0 text-foreground"
        >
          <SheetHeader className="border-b border-border/70 px-6 py-5 text-left">
            <SheetTitle className="font-display text-2xl uppercase tracking-tight">
              Navigate
            </SheetTitle>
            <SheetDescription className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Rakesh Gajre — Portfolio 2026
            </SheetDescription>
          </SheetHeader>

          <nav className="flex flex-col px-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className="group flex min-h-14 items-center justify-between rounded-xl px-4 py-3 text-left font-display text-2xl uppercase tracking-tight text-foreground transition-colors hover:bg-surface hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </button>
            ))}
            <Link
              to="/hire"
              onClick={() => setMenuOpen(false)}
              className="group mt-2 flex min-h-14 items-center justify-between rounded-xl bg-accent px-4 py-3 font-display text-2xl uppercase tracking-tight text-accent-foreground transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </nav>

          <div className="border-t border-border/70 px-6 py-5">
            <a
              href={resumeAsset.url}
              download="RAKESH_GAJRE_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-foreground/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <div className="mt-5 flex items-center justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} profile`}
                  onClick={(event) => openExternalLink(event, s.href)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <s.Icon className="h-5 w-5" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>


      {/* ANIMATED TEXT CYCLE — promise statement */}
      <section
        id="promise"
        className="relative overflow-hidden px-5 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28"
      >
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,80,80,0.10),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            The promise
          </span>
          <h2 className="mt-6 font-display text-[10vw] leading-[0.95] tracking-tight text-foreground/80 sm:text-[8vw] md:text-[5.2vw]">
            Your{" "}
            <AnimatedTextCycle
              words={["team", "workflow", "product", "audience", "story"]}
              interval={2600}
              className="text-foreground"
            />{" "}
            deserves better tools.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/70 md:text-base">
            Interfaces that move with intent — calm, fast, and shaped by research,
            not guesswork.
          </p>
        </div>
      </section>

      {/* AT A GLANCE — metrics */}

      <section id="glance" className="px-5 pt-20 md:px-10 md:pt-28">
        <div className="mb-8 flex items-end justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            At a glance
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Snapshot
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-3 lg:grid-cols-6">
          {[
            { k: "1", l: "Live product designed" },
            { k: "8+", l: "Professional certifications" },
            { k: "1", l: "UI/UX internship" },
            { k: "4+", l: "Design tools" },
            { k: "4", l: "Languages" },
            { k: "B.Tech", l: "Computer science student" },
          ].map((m) => (
            <div
              key={m.l}
              className="group bg-background p-6 transition-colors duration-500 hover:bg-surface md:p-8"
            >
              <div className="font-display text-4xl tracking-tight md:text-5xl">
                {m.k}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-accent">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              01 — Approach
            </div>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
              My design <br />
              <span className="text-accent">philosophy</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
            <p>
              I believe great design happens when user needs, BANKING goals, and technology
              align. My approach focuses on understanding problems deeply before designing
              solutions.
            </p>
            <p>
              Through research, prototyping, testing, and iteration, I create experiences
              that are intuitive, accessible, and impactful — not just visually polished.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Research",
              copy: "Understand users and identify pain points through interviews, journey mapping, and competitive analysis.",
            },
            {
              icon: Compass,
              title: "Design",
              copy: "Transform insights into intuitive interfaces with thoughtful flows, hierarchy, and interaction patterns.",
            },
            {
              icon: CheckCircle2,
              title: "Validate",
              copy: "Test, iterate, and improve continuously based on real user feedback and measurable outcomes.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <GlowCard
              key={title}
              glowColor="red"
              customSize
              className="w-full h-auto p-8 md:p-10 [--border-spot-opacity:0] [--border-light-opacity:0] [--bg-spot-opacity:0] hover:[--border-spot-opacity:1] hover:[--border-light-opacity:1] hover:[--bg-spot-opacity:0.1]"
            >
              <div className="relative z-10">
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-2xl uppercase tracking-tight md:text-3xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden bg-accent py-6 text-accent-foreground">
        <div className="marquee-track gap-16">
          {[...clients, ...clients, ...clients].map((c, i) => (
            <span
              key={i}
              className="font-display text-3xl tracking-tight md:text-5xl whitespace-nowrap"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED CASE STUDY — OriginCerti */}
      {/* BELIEF QUOTE */}
      <section id="belief" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <div className="absolute inset-0 bg-background" />
        <DotPattern className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-accent">
            I believe
          </p>
          <blockquote className="text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.1] tracking-tight text-foreground">
            “Design should be easy to understand{" "}
            <span className="font-semibold">because</span>{" "}
            simple ideas{" "}
            <span className="font-semibold">are quicker to</span>{" "}
            grasp…”
          </blockquote>
        </div>
      </section>

      <section id="featured" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Featured case study
            </div>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
              Origin<span className="text-accent">Certi</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Blockchain-based digital credentialing platform — designed end to end from
              problem definition to a working live product.
            </p>
          </div>
          <LiquidButton asChild size="default" className="hidden md:inline-flex text-[11px] font-medium uppercase tracking-[0.18em]">
            <a
              href="https://origincerti.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalLink(e, "https://origincerti.lovable.app")}
            >
              Visit live site <ArrowUpRight className="h-4 w-4" />
            </a>
          </LiquidButton>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface">
          <div className="relative">
            <img
              src={work1}
              alt="OriginCerti dashboard preview"
              className="h-[40vh] w-full object-cover md:h-[60vh]"
              loading="lazy"
              width={1280}
              height={896}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
          </div>

          <div className="grid gap-px bg-border/70 md:grid-cols-4">
            {[
              { k: "My role", v: "Lead UI/UX Designer" },
              { k: "Duration", v: "8 weeks · 2025" },
              { k: "Tools", v: "Figma, Adobe XD" },
              { k: "Status", v: "Live product" },
            ].map((m) => (
              <div key={m.k} className="bg-surface p-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{m.k}</div>
                <div className="mt-2 text-sm">{m.v}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <CaseBlock
              label="Problem"
              body="Paper and PDF certificates are easy to forge, hard to verify, and impossible for issuers to revoke. Recruiters and institutions waste hours validating credentials manually."
            />
            <CaseBlock
              label="Solution"
              body="A blockchain-anchored credentialing platform where institutions issue tamper-proof certificates, recipients hold a single verified wallet, and verifiers confirm authenticity in one click."
            />
            <CaseBlock
              label="Research"
              body="Interviewed 8 students, 3 faculty members, and 2 hiring managers. Mapped current verification journeys and identified three recurring failure points around trust, time, and access."
            />
            <CaseBlock
              label="User flow"
              body="Three parallel flows — issuer onboarding and bulk issuance, recipient claim and share, and verifier scan and confirm — designed to converge around a single source of truth."
            />
            <CaseBlock
              label="Design system"
              body="Built a compact design system from scratch — type scale, color tokens, elevation, and a 24-component library — to keep dashboards, public verification, and emails visually consistent."
            />
            <CaseBlock
              label="Key learnings"
              body="Trust is a design problem before it is a technical one. Visual cues, microcopy, and progressive disclosure carried more weight than the underlying blockchain in user testing."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Prototype — live product
            </div>
            <a
              href="https://origincerti.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalLink(e, "https://origincerti.lovable.app")}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground hover:opacity-90"
            >
              Open OriginCerti <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="px-5 pb-10 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Selected work
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            06 / Projects
          </span>
        </div>

        <ul className="divide-y divide-border/70 border-y border-border/70">
          {projects.map((p) => (
            <li key={p.id} className="group/item relative overflow-hidden">
              <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent/5 transition-transform duration-500 group-hover/item:scale-x-100" />
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 py-6 transition-all duration-500 group-hover/item:translate-x-4 md:py-8"
              >
                <span className="font-mono text-xs text-muted-foreground transition-colors group-hover/item:text-accent md:text-sm">
                  {p.id}
                </span>
                <span className="font-display text-2xl uppercase tracking-tight transition-colors group-hover/item:text-accent md:text-4xl">
                  {p.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground md:text-sm">{p.year}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground transition-all duration-500 -rotate-45 group-hover/item:rotate-0 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-accent-foreground group-hover/item:scale-110">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>


      {/* WHY WORK WITH ME */}
      <section className="bg-surface px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Trust &amp; credibility
            </div>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
              Why work <span className="text-accent">with me</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "UI/UX Design Intern at Student Tribe", c: "Shipping product UI inside a live design team — research, prototyping, and handoff." },
            { t: "Computer science engineering background", c: "B.Tech CSE — comfortable speaking the language of both designers and engineers." },
            { t: "Strong user-centered thinking", c: "Decisions backed by user interviews, journey mapping, and usability testing." },
            { t: "Front-end technical knowledge", c: "HTML, CSS, JavaScript, and React — designs that respect implementation reality." },
            { t: "Blockchain product design experience", c: "Designed OriginCerti end to end — a live credentialing product on blockchain rails." },
            { t: "Continuous learning", c: "8+ professional certifications across UI/UX, AI, technology, business, and marketing." },
          ].map((b) => (
            <div key={b.t} className="bg-background p-7 transition-colors duration-500 hover:bg-surface md:p-8">
              <CheckCircle2 className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <div className="mt-4 font-display text-lg uppercase leading-tight tracking-tight md:text-xl">
                {b.t}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN PROCESS — replaces FAQ */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            How I think
          </div>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
            My design <span className="text-accent">process</span>
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-7">
          {[
            { t: "Research", c: "Interviews, surveys, and competitive scans to understand the real problem." },
            { t: "Define", c: "Translate findings into sharp problem statements, personas, and goals." },
            { t: "Ideate", c: "Explore many directions quickly — sketches, flows, and reference studies." },
            { t: "Wireframe", c: "Lock structure, hierarchy, and interaction patterns before visuals." },
            { t: "Prototype", c: "Build interactive prototypes in Figma to feel the experience early." },
            { t: "Test", c: "Run usability sessions with target users to surface friction and gaps." },
            { t: "Iterate", c: "Refine continuously — small, measurable improvements every cycle." },
          ].map((step, i) => (
            <li key={step.t} className="group bg-background p-6 transition-colors duration-500 hover:bg-surface md:p-7">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-accent">
                <span className="font-mono">0{i + 1}</span>
                <Lightbulb className="h-3 w-3 opacity-60" />
              </div>
              <div className="mt-3 font-display text-xl uppercase tracking-tight md:text-2xl">
                {step.t}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.c}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* AWARDS / GALLERY */}
      <section className="px-5 pb-10 md:px-10">
        <div className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Recognition
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { src: award1.url, caption: "Techzite" },
            { src: award3.url, caption: "Freshers Day" },
            { src: award2.url, caption: "Aura — The Vibe" },
            { src: award4.url, caption: "Arohana" },
          ].map((p) => (
            <button
              key={p.caption}
              type="button"
              onClick={() => setLightbox(p)}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={p.src}
                alt={`${p.caption} event poster`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left text-sm font-medium uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {p.caption}
              </span>
            </button>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[90vh] max-w-[90vw] animate-scale-in">
            <img src={lightbox.src} alt={lightbox.caption} className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl" />
            <figcaption className="mt-3 text-center text-sm uppercase tracking-[0.22em] text-white/80">
              {lightbox.caption}
            </figcaption>
          </figure>
        </div>
      )}




      {/* SKILLS + TIMELINE */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Toolkit
            </div>
            <h3 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              What I work with
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "User Research", "Personas", "Information Architecture",
                "Prototyping", "User Flows", "Design Systems",
                "Interaction Design", "Mobile Apps", "Web Design",
                "Usability Testing", "Accessibility", "Figma",
                "Adobe XD", "Photoshop", "Illustrator",
                "HTML", "CSS", "JavaScript", "React", "Git",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border/80 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/85 hover:border-accent hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Timeline
            </div>
            <h3 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              Path so far
            </h3>
            <ol className="mt-8 space-y-6 border-l border-border/70 pl-6">
              {[
                {
                  when: "May 2026 — Present",
                  what: "UI/UX Design Intern",
                  where: "Student Tribe",
                  logo: logoStudentTribe,
                  href: "https://studenttribe.in/",
                  note: "User research, journey mapping, prototyping, and shipping product UI.",
                },
                {
                  when: "Nov 2022 — May 2026",
                  what: "B.Tech, Computer Science Engineering",
                  where: "Aurora Scientific & Technological Institute",
                  logo: logoAurora,
                  href: "https://asti.edu.in/",
                  note: "Engineering foundation paired with self-directed design practice.",
                },
                {
                  when: "Aug 2020 — May 2022",
                  what: "Intermediate, MPC",
                  where: "Impulse Educational Institution",
                },
                {
                  when: "Jun 2015 — Mar 2020",
                  what: "Secondary Education",
                  where: "Jawahar Navodaya Vidyalaya",
                  logo: logoJnv,
                  href: "https://navodaya.gov.in/nvs/nvs-school/MEDAK/en/about_us/About-JNV/",
                },
              ].map((e: any, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{e.when}</div>
                  <div className="mt-1 font-display text-xl uppercase tracking-tight md:text-2xl">{e.what}</div>
                  {e.href ? (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-accent"
                    >
                      <img src={e.logo} alt="" className="h-5 w-5 object-contain" />
                      <span>{e.where}</span>
                    </a>
                  ) : (
                    <div className="text-sm text-foreground/80">{e.where}</div>
                  )}
                  {e.note && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{e.note}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS — filterable */}
      <section id="certifications" className="px-5 pb-24 md:px-10 md:pb-32 scroll-mt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Verified credentials
            </div>
            <h3 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              Certifications
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {certCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCertFilter(c)}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  certFilter === c
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border/70 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {certPreview && (
          <div
            role="dialog"
            aria-label={`${certPreview.title} certificate preview`}
            className="mb-8 overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-xl animate-scale-in"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-background/60 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate font-display text-xs uppercase tracking-[0.18em] text-foreground">
                  {certPreview.title}
                </div>
                <div className="truncate text-[10px] text-muted-foreground">{certPreview.src}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={certPreview.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:border-accent hover:text-accent"
                >
                  Open <ArrowUpRight className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setCertPreview(null)}
                  aria-label="Close certificate preview"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:border-accent hover:text-accent"
                >
                  <X className="h-3.5 w-3.5" /> Close
                </button>
              </div>
            </div>
            <div className="relative flex max-h-[60vh] w-full items-start justify-center overflow-auto bg-neutral-100 p-3">
              {certLoadState !== 'error' && (
                <img
                  key={`${certPreview.src}-${certRetryKey}`}
                  src={certPreview.isImage
                    ? `${certPreview.src}${certRetryKey ? (certPreview.src.includes('?') ? '&' : '?') + 'r=' + certRetryKey : ''}`
                    : `https://image.thum.io/get/width/1200/noanimate/wait/4/${certPreview.src}?r=${certRetryKey}`}
                  alt={`${certPreview.title} certificate preview`}
                  className={`h-auto w-full max-w-3xl rounded-md bg-white shadow-md transition-opacity duration-500 ${certLoadState === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => {
                    lastCertImageRef.current = (e.currentTarget as HTMLImageElement).src;
                    setCertLoadState('loaded');
                  }}
                  onError={() => setCertLoadState('error')}
                />
              )}
              {certLoadState === 'loading' && lastCertImageRef.current && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={lastCertImageRef.current}
                    alt=""
                    className="h-auto w-full max-w-3xl rounded-md bg-white shadow-md blur-sm brightness-75"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20 backdrop-blur-[2px]">
                    <Loader className="h-6 w-6 animate-spin text-white/90" />
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/90">Loading…</p>
                  </div>
                </div>
              )}
              {certLoadState === 'loading' && !lastCertImageRef.current && (
                <div className="flex min-h-[340px] flex-col items-center justify-center gap-4 py-10">
                  <div className="relative w-full max-w-3xl">
                    <div className="aspect-[1.4/1] w-full animate-pulse rounded-md bg-muted/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Loader className="h-7 w-7 animate-spin text-foreground/70" />
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/70">Loading preview…</p>
                    </div>
                  </div>
                </div>
              )}
              {certLoadState === 'error' && (
                <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Preview unavailable — the screenshot couldn't be captured.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCertLoadState('loading');
                        setCertRetryKey((k) => k + 1);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 bg-accent/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:bg-accent hover:text-accent-foreground"
                    >
                      <RefreshCw className="h-3 w-3" /> Retry
                    </button>
                    <a
                      href={certPreview.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:border-accent hover:text-accent"
                    >
                      Open Official Link <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCerts.map((cert) => {
            const inner = (
              <div className="group relative h-full overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] p-[1px] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
                {/* glass sheen layers */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-1/2 left-0 right-0 h-1/2 rounded-xl bg-gradient-to-b from-white/25 to-transparent blur-2xl"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
                <div className="relative flex h-full flex-col justify-between gap-6 rounded-[11px] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                      {cert.logo ? (
                        <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-full w-full object-cover" />
                      ) : (
                        cert.category.slice(0, 2)
                      )}
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-lg uppercase leading-tight tracking-tight">{cert.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{cert.issuer}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      <span>Issued {cert.date}</span>
                      {cert.href && (
                        <span className="inline-flex items-center gap-1 text-foreground/80 transition-colors group-hover:text-accent">
                          Verify <ArrowUpRight className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            return cert.href ? (
              <a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handleCertHoverStart(cert.href!, cert.title)}
                onMouseLeave={handleCertHoverEnd}
                onFocus={() => handleCertHoverStart(cert.href!, cert.title)}
                onBlur={handleCertHoverEnd}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  handleCertHoverEnd();
                  openCert(cert.href!, cert.title, { scroll: true });
                }}
                className="block cursor-pointer"
              >
                {inner}
              </a>

            ) : (
              <div key={cert.title}>{inner}</div>
            );

          })}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-surface px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Let's get started
        </div>
        <h2 className="font-display text-[8.5vw] leading-[0.95] tracking-tight md:text-[6vw] md:leading-[0.92] break-words">
          <span className="block">LET'S TAKE YOUR PRODUCT</span>
          <span className="block md:pl-[15%]">TO THE NEXT LEVEL —</span>
          <span className="block">WHETHER YOU'RE</span>
          <span className="block md:pl-[20%]">LAUNCHING SOMETHING NEW</span>
          <span className="block">OR REIMAGINING</span>
          <span className="block md:pl-[10%] text-accent">AN EXPERIENCE THAT MATTERS</span>
        </h2>

        <div className="mt-16 grid gap-8 border-t border-border/70 pt-10 md:grid-cols-3">
          <a href="mailto:rakeshgajre.work@gmail.com" className="flex items-start gap-3 hover:text-accent">
            <Mail className="mt-1 h-4 w-4 text-accent" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</div>
              <div className="mt-1 text-sm">rakeshgajre.work@gmail.com</div>
            </div>
          </a>
          <a href="tel:+917989975435" className="flex items-start gap-3 hover:text-accent">
            <Phone className="mt-1 h-4 w-4 text-accent" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Phone</div>
              <div className="mt-1 text-sm">+91 79899 75435</div>
            </div>
          </a>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-4 w-4 text-accent" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Based in</div>
              <div className="mt-1 text-sm">Hyderabad, India</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/hire"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-display text-lg uppercase tracking-tight text-accent-foreground transition-opacity hover:opacity-90"
          >
            Get in touch <ArrowUpRight className="h-5 w-5" />
          </Link>
          <LiquidButton asChild size="xl" className="font-display text-lg uppercase tracking-tight">
            <a
              href={resumeAsset.url}
              download="RAKESH_GAJRE_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-5 w-5" /> Resume
            </a>
          </LiquidButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="overflow-hidden border-t border-border/70 px-5 pt-16 md:px-10">
        <div className="grid gap-12 pb-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <img src={logoSeven.url} alt="7." className="h-10 w-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              UI/UX designer and CS engineer designing intuitive digital experiences through
              research, interaction design, and user-centered thinking.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Quick links
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => scrollToId("featured")} className="hover:text-accent">Case studies</button></li>
              <li><button onClick={() => scrollToId("work")} className="hover:text-accent">Projects</button></li>
              <li><button onClick={() => scrollToId("glance")} className="hover:text-accent">At a glance</button></li>
              <li><Link to="/hire" className="hover:text-accent">Hire me</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Resources
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={resumeAsset.url}
                  download="RAKESH_GAJRE_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent"
                >
                  <Download className="h-3.5 w-3.5" /> Download resume
                </a>
              </li>
              <li><a href="mailto:rakeshgajre.work@gmail.com" className="hover:text-accent">Email me</a></li>
              <li><a href="tel:+917989975435" className="hover:text-accent">+91 79899 75435</a></li>
              <li>Hyderabad, India</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Social
            </div>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((s) => (
                <LiquidButton
                  key={s.label}
                  asChild
                  size="sm"
                  className="h-10 w-10 !p-0 rounded-full"
                  aria-label={`${s.label} profile`}
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => openExternalLink(event, s.href)}
                  >
                    <s.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </LiquidButton>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 py-6 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Rakesh Gajre — All rights reserved</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-accent">
            Back to top ↑
          </button>
        </div>

        <h2 className="group/word -mb-4 select-none cursor-default flex flex-col items-center leading-none">
          <span
            className="font-display text-[18vw] leading-[0.78] tracking-tight text-foreground/90 transition-all duration-700 group-hover/word:tracking-tighter"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            RAKESH
          </span>
          <span
            className="font-display text-[18vw] leading-[0.78] tracking-tight text-accent -mt-[5vw] transition-all duration-700 group-hover/word:text-foreground"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            GAJRE
          </span>
        </h2>
        <div className="h-1 bg-accent" />
      </footer>
    </main>
  );
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
        {label}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">{body}</p>
    </div>
  );
}
