import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Mail, MapPin, Phone, Instagram, Linkedin, Github, X } from "lucide-react";
import portrait from "@/assets/rakesh-portrait.jpg";
import work1 from "@/assets/work-origincerti.jpg";
import award1 from "@/assets/event-techzite.jpg.asset.json";
import award2 from "@/assets/event-aura.jpg.asset.json";
import award3 from "@/assets/event-freshers.png.asset.json";
import award4 from "@/assets/event-arohana.png.asset.json";
import rLogo from "@/assets/r-logo.png";
import logoJnv from "@/assets/logo-jnv.png";
import logoAurora from "@/assets/logo-aurora.png";
import logoStudentTribe from "@/assets/logo-studenttribe.png";
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rakesh Gajre — UI/UX Designer & CS Engineer" },
      { name: "description", content: "Portfolio of Rakesh Gajre — UI/UX designer crafting intuitive digital experiences that bridge user needs and technology." },
      { property: "og:title", content: "Rakesh Gajre — UI/UX Designer" },
      { property: "og:description", content: "Designing intuitive digital experiences that bridge user needs and technology." },
    ],
    links: [
      { rel: "preload", as: "image", href: portrait, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

const clients = ["Figma", "Adobe XD", "Canva", "Notion", "GitHub", "Vercel"];

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

const openExternalLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault();

  const externalWindow = window.open("about:blank", "_blank");
  if (externalWindow) {
    externalWindow.opener = null;
    try {
      externalWindow.location.replace(href);
      return;
    } catch {
      // Cross-origin restriction in iframe — fall through to direct open.
    }
  }

  window.open(href, "_blank", "noopener,noreferrer");
};

function Index() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  return (
    <main className="noise-overlay min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl">
          <img
            src={portrait}
            alt="Rakesh Gajre portrait"
            className="h-[78vh] w-full object-cover object-center md:h-[88vh]"
            width={1206}
            height={877}
            fetchPriority="high"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/50" />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 text-[11px] font-medium tracking-[0.18em] text-foreground/90 md:px-8">
            <button className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition hover:bg-white/20 hover:text-accent">MENU</button>
            <img src={rLogo} alt="R." className="h-9 w-9 md:h-11 md:w-11 drop-shadow-[0_0_12px_rgba(255,80,80,0.35)]" />
            <a href="#contact" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition hover:bg-white/20 hover:text-accent">CONTACT ME</a>
          </div>

          {/* Headline */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-24 md:px-10 md:pb-28">
            <div className="ml-auto max-w-2xl text-right">
              <h1 className="font-display text-[14vw] leading-[0.88] tracking-tight text-foreground md:text-[7.5vw]">
                DESIGNING<br />POTENTIAL
              </h1>
              <p className="mt-5 ml-auto max-w-xs text-right text-xs uppercase tracking-[0.18em] text-foreground/75">
                Crafting intuitive digital experiences that bridge user needs and technology.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground hover:text-accent"
              >
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-foreground/15 bg-background/30 px-5 py-4 text-[11px] font-medium tracking-[0.2em] text-foreground/85 backdrop-blur md:px-8">
            <span>UI / UX DESIGNER</span>
            <div className="hidden items-center gap-4 md:flex">
              {socials.map((s, i) => (
                <span key={s.label} className="flex items-center gap-4">
                  {i > 0 && <span className="text-foreground/30">/</span>}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} profile`} onClick={(event) => openExternalLink(event, s.href)} className="hover:opacity-80 transition-opacity">
                    <s.Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </span>
              ))}
            </div>
            <span>SCROLL FOR MORE</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            About Me
          </div>
          <h2 className="font-display text-[9vw] leading-[0.95] tracking-tight md:text-[4.5vw]">
            <span className="block">LET'S WORK TOGETHER</span>
            <span className="block">TO RECOGNIZE YOUR</span>
            <span className="block pl-[20%] text-accent">POTENTIAL</span>
            <span className="block pl-[10%]">AND SHAPE</span>
            <span className="block pl-[5%]">A FUTURE</span>
            <span className="block pl-[30%]">WHERE</span>
            <span className="block pl-[20%]">DESIGN SHINES</span>
          </h2>
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

      {/* PROJECTS */}
      <section id="work" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 flex items-end justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Our Project
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            06 / Selected
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
                <span className="font-mono text-xs text-muted-foreground transition-colors group-hover/item:text-accent md:text-sm">{p.id}</span>
                <span className="font-display text-2xl uppercase tracking-tight transition-colors group-hover/item:text-accent md:text-4xl">
                  {p.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground md:text-sm">{p.year}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-accent transition-all duration-500 -rotate-45 group-hover/item:rotate-0 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-accent-foreground group-hover/item:scale-110">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 pb-4 md:px-10">
        <h2 className="font-display text-[12vw] font-bold uppercase leading-none tracking-tight text-foreground md:text-[8vw]">
          PROJECTS
        </h2>
      </div>

      {/* FEATURED CASE STUDY */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative bg-background">
              <img
                src={work1}
                alt="OriginCerti dashboard preview"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={896}
              />
            </div>
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Featured Case Study
                </div>
                <h3 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
                  Origin<span className="text-accent">Certi</span>
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  A blockchain-based credentialing platform that lets institutions issue
                  tamper-proof certificates and gives recipients a single source of truth.
                  Full UI design, user flows, prototype, and design system — built from zero.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-y-6 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Role</dt>
                  <dd className="mt-1">UI/UX Designer</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Year</dt>
                  <dd className="mt-1">2025</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Tools</dt>
                  <dd className="mt-1">Figma, Adobe XD</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Live</dt>
                  <dd className="mt-1">
                    <a
                      href="https://origincerti.lovable.app"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline"
                    >
                      origincerti.app ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
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
              <img src={p.src} alt={`${p.caption} event poster`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
            <figcaption className="mt-3 text-center text-sm uppercase tracking-[0.22em] text-white/80">{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}

      {/* SKILLS + EXPERIENCE */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Toolkit
            </div>
            <h3 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              What I <span className="text-accent">work with</span>
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
              Path so <span className="text-accent">far</span>
            </h3>
            <ol className="mt-8 space-y-6 border-l border-border/70 pl-6">
              {[
                {
                  when: "May 2026 — Present",
                  what: "UI/UX Design Intern",
                  where: "Student Tribe",
                  logo: logoStudentTribe,
                  href: "https://studenttribe.in/",
                  note: "User research, journey mapping, prototyping & shipping product UI.",
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

      {/* CERTIFICATIONS */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Certifications
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Generative AI Foundations", issuer: "UpGrad × Microsoft", href: "https://certificates.upgrad.com/840ccdbb-9cf8-4562-a3c0-146af56e1caf-Gen-AI-jTMvFhyg8IYH4Qco.jpeg" },
            { title: "Prompt to Prototype", issuer: "Google Startup School", href: "https://drive.google.com/file/d/1ylFu9i7k0kzFECX0TtYvdRjq4-5BH4sg/view?usp=sharing" },
            { title: "Cybersecurity Certification", issuer: "Tech Mahindra", href: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/e87d68c3b2dd4f0a870513d22dc72661" },
            { title: "Foundation Course in Finance", issuer: "Reliance Foundation", href: "https://drive.google.com/file/d/1J3G8AoqD0jBBmKXF_Xq1RSvQ_F_iLDI7/view" },
            { title: "Branch Banking Executive", issuer: "NSDC", href: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/c3840e379d104884b60013902352e937" },
            { title: "Microsoft Excel", issuer: "Coursera", href: "https://www.coursera.org/account/accomplishments/certificate/NQW69DUGMRGD" },
            { title: "Fundamentals of Digital Marketing", issuer: "Google", href: "https://drive.google.com/file/d/1ClSCnYvReDnCZsgj7L_2OjDjRPtNDYAd/view" },
            { title: "Logo Design with Canva", issuer: "Coursera", href: "https://www.coursera.org/account/accomplishments/verify/GPHT69EUFNEB" },
          ].map((cert) => {
            const el = (
              <div className="group flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-surface p-5 transition-colors hover:border-accent">
                <div>
                  <div className="font-display text-lg uppercase leading-tight tracking-tight">{cert.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{cert.issuer}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
            );
            return cert.href ? (
              <a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternalLink(e, cert.href!)}
                className="block cursor-pointer"
              >
                {el}
              </a>
            ) : (
              <div key={cert.title}>{el}</div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-surface px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Let's get started
        </div>
        <h2 className="font-display text-[10vw] leading-[0.92] tracking-tight md:text-[6vw]">
          <span className="block">LET'S TAKE YOUR PRODUCT</span>
          <span className="block pl-[15%]">TO THE NEXT LEVEL —</span>
          <span className="block">WHETHER YOU'RE</span>
          <span className="block pl-[20%]">LAUNCHING SOMETHING NEW</span>
          <span className="block">OR REIMAGINING</span>
          <span className="block pl-[10%] text-accent">AN EXPERIENCE THAT MATTERS</span>
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
          <a
            href="mailto:rakeshgajre.work@gmail.com"
            className="inline-flex items-center gap-3 rounded-full border border-foreground/80 px-7 py-4 font-display text-lg uppercase tracking-tight transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground"
          >
            Get in touch <ArrowUpRight className="h-5 w-5" />
          </a>
          <a
            href={resumeAsset.url}
            download="RAKESH_GAJRE_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-display text-lg uppercase tracking-tight text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-5 w-5" /> Resume
          </a>
        </div>
      </section>

      {/* FOOTER WORDMARK */}
      <footer className="overflow-hidden border-t border-border/70 px-5 pt-12 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Rakesh Gajre</span>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} profile`}
                onClick={(event) => openExternalLink(event, s.href)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <s.Icon className="h-5 w-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
          <a href="#" className="hover:text-accent">Back to top ↑</a>
        </div>
        <div className="-mb-6 select-none text-center">
          <span className="font-display text-[26vw] leading-none tracking-tight text-foreground/95">
            RAKESH
          </span>
          <span className="font-display text-[26vw] leading-none tracking-tight text-red-500">
            {" "}GAJRE
          </span>
        </div>
        <div className="h-1 bg-accent" />
      </footer>
    </main>
  );
}
