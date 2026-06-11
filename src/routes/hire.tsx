import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import rLogo from "@/assets/r-logo.png";
import { SlideButton } from "@/components/ui/slide-button";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire Me — Rakesh Gajre" },
      { name: "description", content: "Tell me about your project or company and let's create something remarkable together." },
    ],
  }),
  component: HirePage,
});

const FORM_ENDPOINT = "https://formsubmit.co/ajax/rakeshgajre.work@gmail.com";

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
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="noise-overlay min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 text-[11px] font-medium tracking-[0.18em] text-foreground/90 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-md transition hover:bg-foreground/[0.08] hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK
        </Link>
        <img src={rLogo} alt="R." className="h-9 w-9 md:h-11 md:w-11 drop-shadow-[0_0_12px_rgba(255,80,80,0.35)]" />
        <a
          href="mailto:rakeshgajre.work@gmail.com"
          className="rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-md transition hover:bg-foreground/[0.08] hover:text-accent"
        >
          EMAIL DIRECT
        </a>
      </div>

      {/* Hero heading */}
      <section className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Hire Me
          </div>
          <h1 className="font-display text-[12vw] leading-[0.9] tracking-tight md:text-[6vw]">
            <span className="block">LET'S BUILD</span>
            <span className="block pl-[10%] text-accent">SOMETHING</span>
            <span className="block pl-[5%]">REMARKABLE</span>
          </h1>
        </div>
      </section>

      {/* Form section */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Sidebar info */}
          <aside className="space-y-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Reach Out
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Share a few details about you or your company and the project you have in mind.
              I'll get back within 24 hours.
            </p>

            <div className="space-y-5 border-t border-border/70 pt-8">
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
          </aside>

          {/* Form */}
          <div className="rounded-2xl border border-border/70 bg-surface p-6 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-accent" />
                <h2 className="mt-6 font-display text-3xl uppercase tracking-tight md:text-5xl">
                  Message <span className="text-accent">sent</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out. Your details have been emailed and I'll get back to you shortly.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-foreground/80 px-7 py-3 font-display text-base uppercase tracking-tight transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground"
                >
                  Back to portfolio <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Your Name *" name="name" required placeholder="Jane Doe" />
                  <Field label="Email *" name="email" type="email" required placeholder="you@company.com" />
                  <Field label="Company / Organization" name="company" placeholder="Acme Inc." />
                  <Field label="Your Role" name="role" placeholder="Founder, PM, etc." />
                  <SelectField
                    label="Project Type"
                    name="project_type"
                    options={["UI/UX Design", "Web Design", "Mobile App", "Design System", "Branding", "Other"]}
                  />
                  <SelectField
                    label="Timeline"
                    name="timeline"
                    options={["ASAP", "1–2 weeks", "1 month", "1–3 months", "Flexible"]}
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
                  <p className="text-sm text-red-400">
                    Couldn't send — {errorMsg}. Try emailing directly at rakeshgajre.work@gmail.com.
                  </p>
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
                  <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Slide to submit
                  </p>
                </div>
                <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Your details are sent straight to my inbox.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

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
    <label className={textarea ? "block" : "block"}>
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={5} className={base} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
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
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
