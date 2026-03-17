import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import ClickSpark from "@/components/ui/click-spark"
import { LogoLoop } from "@/components/ui/logo-loop"
import {
  SiReact, SiTypescript, SiNodedotjs, SiNestjs,
  SiDocker, SiOpenai, SiNextdotjs, SiGraphql,
  SiMongodb, SiVercel, SiPostgresql, SiRedis,
  SiGithub, SiTelegram,
} from "react-icons/si"
import { LinkedinIcon } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ResumeButtons } from "@/components/shared/ResumeButtons"
import CalendarWidget from "@/components/calendar-02"
import ProductivityWidget from "@/components/productivity-03"
import WeatherWidget from "@/components/weather-01"

/* ── social icon map ─────────────────────────────────────── */
type IconComp = React.ComponentType<{ className?: string }>
const SOCIAL_ICONS: Record<string, IconComp> = {
  GitHub:   SiGithub,
  LinkedIn: LinkedinIcon,
  Telegram: SiTelegram,
}

/* ── tech strip ──────────────────────────────────────────── */
const TECH_ICONS: { icon: ReactNode; label: string; color: string }[] = [
  { icon: <SiReact />,       label: "React",       color: "#61DAFB" },
  { icon: <SiTypescript />,  label: "TypeScript",  color: "#3178C6" },
  { icon: <SiNodedotjs />,   label: "Node.js",     color: "#6DA55F" },
  { icon: <SiNestjs />,      label: "NestJS",      color: "#E0234E" },
  { icon: <SiNextdotjs />,   label: "Next.js",     color: "#FFFFFF" },
  { icon: <SiMongodb />,     label: "MongoDB",     color: "#4EA94B" },
  { icon: <SiPostgresql />,  label: "PostgreSQL",  color: "#336791" },
  { icon: <SiRedis />,       label: "Redis",       color: "#FF4438" },
  { icon: <SiDocker />,      label: "Docker",      color: "#0DB7ED" },
  { icon: <SiVercel />,      label: "Vercel",      color: "#FFFFFF" },
  { icon: <SiOpenai />,      label: "OpenAI",      color: "#74AA9C" },
  { icon: <SiGraphql />,     label: "GraphQL",     color: "#E535AB" },
]

const techLogos = TECH_ICONS.map(({ icon, label, color }) => ({
  node: (
    <div className="flex items-center gap-2 px-1">
      <span style={{ color, opacity: 0.7, fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span className="text-[11px] font-mono text-muted-foreground/40 tracking-wide">{label}</span>
    </div>
  ),
}))


/* ── Hero ────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="hero" className="relative min-h-svh flex flex-col overflow-hidden bg-background">

      {/* CSS dot grid — zero GPU cost */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Amber glow — top right */}
      <div
        aria-hidden
        className="absolute -top-24 right-0 w-[42vw] h-[42vw] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 70% 25%, var(--brand-glow) 0%, transparent 62%)",
          filter: "blur(72px)",
        }}
      />

      {/* Amber glow — bottom left (subtle) */}
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 w-[28vw] h-[28vw] pointer-events-none z-0 opacity-35"
        style={{
          background: "radial-gradient(circle, var(--brand-glow) 0%, transparent 68%)",
          filter: "blur(56px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-36 min-h-svh">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* ── LEFT column ── */}
          <div className="space-y-7">

            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border border-emerald-400/20 bg-emerald-400/5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-400/70">
                  Available · KST UTC+9
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            >
              <h1
                className="font-black tracking-tight leading-none gradient-text"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                Azamat Nabiev
              </h1>
            </motion.div>

            {/* 3-line role headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
              className="select-none"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.8rem)", lineHeight: 0.92, letterSpacing: "-0.025em" }}
            >
              <div style={{ fontWeight: 900, WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent", display: "block", marginBottom: "0.06em" }}>
                FULL STACK
              </div>
              <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: "0.06em" }}>
                ENGINEER
              </div>
              <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.55)", display: "block" }}>
                &amp; AI DEV
              </div>
            </motion.div>

            {/* Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 }}
              className="text-sm text-muted-foreground leading-relaxed max-w-[380px]"
            >
              Building scalable web applications and AI-powered systems.
              React · NestJS · Docker · OpenAI — from zero to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.65 }}
            >
              <ClickSpark sparkColor="var(--brand)" sparkCount={10} sparkRadius={28} sparkSize={7} duration={450}>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    shimmerColor="var(--brand)"
                    background="var(--brand)"
                    className="font-semibold px-6 py-2.5 text-sm"
                  >
                    View My Work
                  </ShimmerButton>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-semibold",
                      "border border-border/60 bg-transparent",
                      "text-foreground hover:border-brand/60 hover:text-brand",
                      "transition-colors duration-200 cursor-pointer",
                    )}
                  >
                    Get in Touch
                  </button>
                </div>
              </ClickSpark>
            </motion.div>

            {/* Resume downloads */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.72 }}
            >
              <ResumeButtons size="sm" />
            </motion.div>

            {/* Social icons — real icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex gap-2"
            >
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.label]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={cn(
                      "size-9 rounded-xl border border-border/50 flex items-center justify-center",
                      "text-muted-foreground hover:border-brand/60 hover:text-brand",
                      "bg-card/50 transition-colors duration-200",
                    )}
                  >
                    {Icon
                      ? <Icon className="size-4" />
                      : <span className="text-[10px] font-mono font-bold">{link.label.slice(0, 2).toUpperCase()}</span>
                    }
                  </a>
                )
              })}
            </motion.div>
          </div>

          {/* ── RIGHT column — 3 widgets ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.4 }}
            className="hidden md:flex flex-col gap-3"
          >
            <CalendarWidget />
            <ProductivityWidget />
            <WeatherWidget />
          </motion.div>
        </div>
      </div>

      {/* ── Logo strip — bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-5">
        <div className="flex items-center gap-4 px-6 md:px-12 lg:px-24 mb-3">
          <div className="h-px flex-1 bg-border/25" />
          <span className="text-[9px] font-mono text-muted-foreground/25 uppercase tracking-[0.25em] shrink-0">
            Stack
          </span>
          <div className="h-px flex-1 bg-border/25" />
        </div>
        <LogoLoop
          logos={techLogos}
          speed={38}
          gap={48}
          logoHeight={14}
          fadeOut
          pauseOnHover
          className="opacity-50"
          ariaLabel="Tech stack"
        />
      </div>
    </section>
  )
}
