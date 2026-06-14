import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  Rocket,
  MessageCircle,
  Clock,
  Wallet,
  Globe2,
} from "lucide-react";
import logoSeven from "@/assets/logo-seven.png.asset.json";
import { SlideButton } from "@/components/ui/slide-button";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire Me — Rakesh Gajre" },
      {
        name: "description",
        content:
          "Tell me about your project or company and let's create something remarkable together.",
      },
      { property: "og:title", content: "Hire Rakesh Gajre — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "Available for design partnerships, product work, and freelance collaborations.",
      },
    ],
  }),
  component: HirePage,
});

const FORM_ENDPOINT = "https://formsubmit.co/ajax/rakeshgajre.work@gmail.com";

// ---------- Motion presets ----------
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <motion.section
    id={id}
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={className}
  >
    {children}
  </motion.section>
);

// ---------- Page ----------
function HirePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      role: String(fd.get("role") || ""),
      budget: String(fd.get("budget") || ""),
      timeline: String(fd.get("timeline") || ""),
      project_type: String(fd.get("project_type") || ""),
      message: String(fd.get("message") || ""),
      _subject: `New Hire Inquiry from ${fd.get("name") || "Website"}`,
      _template: "table",
      _captcha: "false",
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <main className="noise-overlay min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center justify-between px-5 py-5 text-[11px] font-medium tracking-[0.18em] text-foreground/90 md:px-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-md transition hover:bg-foreground/[0.08] hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK
        </Link>
        <img
          src={logoSeven.url}
          alt="7."
          className="h-9 w-9 md:h-11 md:w-11 drop-shadow-[0_0_12px_rgba(255,80,80,0.35)]"
        />
        <a
          href="mailto:rakeshgajre.work@gmail.com"
          className="rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-md transition hover:bg-foreground/[0.08] hover:text-accent"
        >
          EMAIL DIRECT
        </a>
      </motion.div>

      {/* Hero heading */}
      <Section className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <motion.div
            variants={fadeUp}
            className="flex items-start gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available · Q3 2026
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-[12vw] leading-[0.9] tracking-tight md:text-[6vw]"
          >
            <span className="block">LET'S BUILD</span>
            <span className="block pl-[10%] text-accent">SOMETHING</span>
            <span className="block pl-[5%]">REMARKABLE</span>
          </motion.h1>
        </div>
      </Section>

      {/* Marquee meta strip */}
      <Section className="border-y border-border/60 px-5 py-5 md:px-10">
        <motion.div
          variants={stagger}
          className="flex flex-wrap items-center justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {[
            { icon: Clock, label: "Reply within 24h" },
            { icon: Globe2, label: "Working worldwide" },
            { icon: Wallet, label: "Project & retainer" },
            { icon: MessageCircle, label: "Async-friendly" },
          ].map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="inline-flex items-center gap-2"
            >
              <Icon className="h-3.5 w-3.5 text-accent" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* What I Offer */}
      <Section className="px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <motion.div
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            01 — What I Offer
          </motion.div>
          <div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl"
            >
              Design partnerships built around <span className="text-accent">outcomes</span>,
              not deliverables.
            </motion.h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {[
                {
                  icon: Compass,
                  title: "Product & UX Design",
                  body: "End-to-end product flows, dashboards, onboarding, and design systems for early-stage teams.",
                },
                {
                  icon: Layers,
                  title: "Web & Marketing Sites",
                  body: "High-craft landing pages and brand sites that move metrics and feel premium on every breakpoint.",
                },
                {
                  icon: Sparkles,
                  title: "Brand & Visual Identity",
                  body: "Logo systems, type, motion language, and the design tokens that hold it all together.",
                },
                {
                  icon: Rocket,
                  title: "Design Retainers",
                  body: "Ongoing partnership for product squads who need consistent senior design firepower.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 backdrop-blur-md"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-lg uppercase tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="border-t border-border/60 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <motion.div
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            02 — Process
          </motion.div>
          <div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl"
            >
              How we'll <span className="text-accent">work together</span>.
            </motion.h2>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                { k: "01", t: "Discover", d: "Intro call, goals, audience, success metrics." },
                { k: "02", t: "Define", d: "Scope, timeline, design principles, and roadmap." },
                { k: "03", t: "Design", d: "Iterative wireframes, prototypes, and tight feedback loops." },
                { k: "04", t: "Deliver", d: "Polished UI, motion, handoff, and post-launch support." },
              ].map((s) => (
                <motion.div
                  key={s.k}
                  variants={fadeUp}
                  className="relative rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 backdrop-blur-md"
                >
                  <div className="font-display text-3xl text-accent">{s.k}</div>
                  <div className="mt-4 font-display text-lg uppercase tracking-tight">
                    {s.t}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Form section */}
      <Section id="form" className="px-5 pb-24 md:px-10 md:pb-32 pt-10">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Sidebar info */}
          <motion.aside variants={fadeUp} className="space-y-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              03 — Reach Out
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Share a few details about you or your company and the project you have in mind.
              I'll get back within 24 hours.
            </p>

            <div className="space-y-5 border-t border-border/70 pt-8">
              <a
                href="mailto:rakeshgajre.work@gmail.com"
                className="flex items-start gap-3 hover:text-accent"
              >
                <Mail className="mt-1 h-4 w-4 text-accent" />
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-1 text-sm">rakeshgajre.work@gmail.com</div>
                </div>
              </a>
              <a href="tel:+917989975435" className="flex items-start gap-3 hover:text-accent">
                <Phone className="mt-1 h-4 w-4 text-accent" />
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Phone
                  </div>
                  <div className="mt-1 text-sm">+91 79899 75435</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-accent" />
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Based in
                  </div>
                  <div className="mt-1 text-sm">Hyderabad, India</div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface p-6 md:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent"
            />
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease }}
                className="relative flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-accent" />
                <h2 className="mt-6 font-display text-3xl uppercase tracking-tight md:text-5xl">
                  Message <span className="text-accent">sent</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out. Your details have been emailed and I'll get back to
                  you shortly.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-foreground/80 px-7 py-3 font-display text-base uppercase tracking-tight transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground"
                >
                  Back to portfolio <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Your Name *" name="name" required placeholder="Jane Doe" />
                  <Field
                    label="Email *"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                  />
                  <Field label="Company / Organization" name="company" placeholder="Acme Inc." />
                  <Field label="Your Role" name="role" placeholder="Founder, PM, etc." />
                  <SelectField
                    label="Project Type"
                    name="project_type"
                    options={[
                      "UI/UX Design",
                      "Web Design",
                      "Mobile App",
                      "Design System",
                      "Branding",
                      "Other",
                    ]}
                  />
                  <SelectField
                    label="Timeline"
                    name="timeline"
                    options={["ASAP", "1–2 weeks", "1 month", "1–3 months", "Flexible"]}
                  />
                  <SelectField
                    label="Budget (USD)"
                    name="budget"
                    options={["< $2k", "$2k – $5k", "$5k – $10k", "$10k – $25k", "$25k+"]}
                  />
                </div>

                <Field
                  label="Tell me about the project *"
                  name="message"
                  required
                  textarea
                  placeholder="What are you building, your goals, and anything I should know…"
                />

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                  >
                    Couldn't send — {errorMsg}. Try emailing directly at
                    rakeshgajre.work@gmail.com.
                  </motion.p>
                )}

                <div className="flex flex-col items-center gap-3 pt-2">
                  <SlideButton
                    status={
                      status === "sending"
                        ? "loading"
                        : status === "error"
                          ? "error"
                          : "idle"
                    }
                    onComplete={() => {
                      formRef.current?.requestSubmit();
                    }}
                  />
                </div>
                <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Your details are sent straight to my inbox.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border/60 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <motion.div
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            04 — FAQ
          </motion.div>
          <div className="divide-y divide-border/60 border-y border-border/60">
            {[
              {
                q: "What does a typical engagement look like?",
                a: "Most projects run 3–8 weeks with weekly milestones, async updates, and 1–2 live calls per week. Retainers are scoped monthly.",
              },
              {
                q: "Do you work with early-stage startups?",
                a: "Yes — a large portion of my work is with founders going from 0→1. I help shape the product, not just decorate it.",
              },
              {
                q: "Can you also handle development?",
                a: "I ship production-ready React / Tailwind / TanStack interfaces, and partner with engineering teams for backend-heavy work.",
              },
              {
                q: "How do you price work?",
                a: "Fixed-scope sprints for product launches, weekly retainers for ongoing work. I'll suggest the right shape after our intro call.",
              },
            ].map((f, i) => (
              <motion.details
                key={f.q}
                variants={fadeUp}
                className="group py-6"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-display text-xl uppercase tracking-tight md:text-2xl">
                    {f.q}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/60 text-accent transition-transform group-open:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA strip */}
      <Section className="px-5 pb-24 md:px-10 md:pb-32">
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-foreground/[0.05] via-foreground/[0.02] to-transparent p-10 backdrop-blur-md md:p-16"
        >
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
              Prefer email? <br />
              <span className="text-accent">Let's just talk.</span>
            </h3>
            <a
              href="mailto:rakeshgajre.work@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/80 px-7 py-3 font-display text-base uppercase tracking-tight transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground"
            >
              rakeshgajre.work@gmail.com <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Section>

      <div className="h-1 bg-accent" />
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-lg border border-border/70 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className={base}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-lg border border-border/70 bg-background/60 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
