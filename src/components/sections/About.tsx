import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { NumberTicker } from "@/components/ui/number-ticker"
import {
  Widget, WidgetHeader, WidgetTitle, WidgetContent,
} from "@/components/ui/widget"
import { ScrollSection } from "@/components/shared/ScrollSection"
import { Globe, Code2, Lightbulb, Zap } from "lucide-react"
import {
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs,
  SiNestjs, SiMongodb, SiDocker, SiOpenai, SiGraphql,
  SiSpringboot, SiPostgresql,
} from "react-icons/si"

/* ── data ──────────────────────────────────────────────────── */

const STATS = [
  { value: 3,  suffix: "+", label: "Years exp" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 10, suffix: "+", label: "AI builds" },
]

const TECH: { icon: React.ReactNode; label: string; color: string }[] = [
  { icon: <SiReact />,       label: "React",       color: "#61DAFB" },
  { icon: <SiTypescript />,  label: "TypeScript",  color: "#3178C6" },
  { icon: <SiNextdotjs />,   label: "Next.js",     color: "currentColor" },
  { icon: <SiNodedotjs />,   label: "Node.js",     color: "#6DA55F" },
  { icon: <SiNestjs />,      label: "NestJS",      color: "#E0234E" },
  { icon: <SiMongodb />,     label: "MongoDB",     color: "#4EA94B" },
  { icon: <SiPostgresql />,  label: "PostgreSQL",  color: "#336791" },
  { icon: <SiDocker />,      label: "Docker",      color: "#0DB7ED" },
  { icon: <SiOpenai />,      label: "OpenAI",      color: "#74AA9C" },
  { icon: <SiGraphql />,     label: "GraphQL",     color: "#E535AB" },
  { icon: <SiSpringboot />,  label: "Spring Boot", color: "#6DB33F" },
  // No SI icon for Java or n8n — use styled text glyphs
  { icon: <span style={{ fontWeight: 900, fontSize: 11 }}>☕</span>, label: "Java",  color: "#ED8B00" },
  { icon: <span style={{ fontWeight: 800, fontSize: 10, letterSpacing: "-0.04em" }}>n8n</span>, label: "n8n", color: "#EA4B71" },
]

const LANGUAGES = [
  { lang: "Uzbek",   level: "Native" },
  { lang: "Russian", level: "Fluent" },
  { lang: "English", level: "Professional" },
  { lang: "Korean",  level: "Fluent" },
]

const LEARNING = [
  { label: "System Design",   icon: <Zap size={11} /> },
  { label: "LLM Fine-tuning", icon: <Lightbulb size={11} /> },
  { label: "Rust",            icon: <Code2 size={11} /> },
]

const INTERESTS = ["Open Source", "AI Systems", "Performance", "Remote Work", "Automation"]

/* ── helpers ───────────────────────────────────────────────── */

function Divider() {
  return <div className="h-px w-full bg-border/30" />
}

/* ── section ───────────────────────────────────────────────── */

export function About() {
  return (
    <ScrollSection id="about" className="py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── top label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-6 bg-brand" />
          <span className="font-mono text-[10px] text-brand/70 uppercase tracking-[0.22em]">
            02 ─── About
          </span>
        </motion.div>

        {/* ── main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">

          {/* ──────────── LEFT: all text content ──────────── */}
          <div className="space-y-10">

            {/* Name + role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              <h2
                className="font-black tracking-tight leading-none gradient-text mb-2"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)" }}
              >
                Azamat Nabiev
              </h2>
              <p className="font-mono text-sm text-muted-foreground/60 tracking-wide">
                Full Stack Engineer · AI Developer · Busan, Korea
              </p>
            </motion.div>

            {/* Statement */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }}
              className="font-black leading-[1.1] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Building AI-powered products{" "}
              <span className="gradient-text">that actually ship.</span>
            </motion.h3>

            <Divider />

            {/* Stats — three big numbers inline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" as const }}
              className="flex items-start gap-10"
            >
              {STATS.map((s, i) => (
                <div key={s.label}>
                  <p
                    className="font-black tabular-nums leading-none"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--brand)" }}
                  >
                    <NumberTicker value={s.value} delay={0.1 * i} className="text-brand" />
                    {s.suffix}
                  </p>
                  <p className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/45">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <Divider />

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" as const }}
              className="space-y-4 max-w-xl"
            >
              <p className="text-foreground/85 leading-relaxed text-[1.05rem]">
                I'm a Full Stack Engineer working at the intersection of frontend craft
                and backend architecture — from pixel-perfect React interfaces to
                robust NestJS APIs and cloud deployments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've shipped production systems across real-time collaboration, AI automation
                ecosystems (OpenAI, Gemini, n8n), and data-heavy dashboards. I care about
                code quality, DX, and building things that solve real problems.
              </p>
            </motion.div>

            <Divider />

            {/* Tech stack chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/35 mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH.map(({ icon, label, color }, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.03 * i, duration: 0.25, ease: "easeOut" as const }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-card/60 text-[11px] font-mono text-foreground/70 hover:border-brand/40 hover:text-foreground transition-colors cursor-default"
                  >
                    <span style={{ color, fontSize: 13, lineHeight: 1 }}>{icon}</span>
                    {label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <Divider />

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/35 mb-3">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="font-mono text-[11px] cursor-default hover:border-brand/50 hover:text-brand transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ──────────── RIGHT: portrait + 2 widgets ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" as const }}
            className="flex flex-col gap-3 lg:sticky lg:top-24"
          >
            {/* Portrait */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-0 h-2/3 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 100%, var(--brand-glow) 0%, transparent 65%)",
                  filter: "blur(28px)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden border border-brand/20"
                style={{ boxShadow: "0 0 48px var(--brand-glow)" }}
              >
                <img
                  src="/portfolio-no-background.png"
                  alt="Azamat Nabiev"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "3 / 4" }}
                  loading="lazy"
                />
              </div>
              {/* Availability dot */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-border/40 rounded-full px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Available</span>
              </div>
            </motion.div>

            {/* Two sm widgets side by side */}
            <div className="flex gap-3">
              {/* Languages */}
              <Widget size="sm" className="flex-1 border-border/40 bg-card/60 overflow-hidden min-w-0">
                <WidgetHeader>
                  <WidgetTitle className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.18em] font-normal flex items-center gap-1">
                    <Globe size={10} /> Lang
                  </WidgetTitle>
                </WidgetHeader>
                <WidgetContent className="flex-col items-start justify-center gap-2.5 px-0 pt-1">
                  {LANGUAGES.map(({ lang, level }) => (
                    <div key={lang} className="w-full">
                      <p className="text-[11px] font-semibold text-foreground/80 leading-none">{lang}</p>
                      <p className="text-[9px] font-mono text-muted-foreground/40 mt-0.5">{level}</p>
                    </div>
                  ))}
                </WidgetContent>
              </Widget>

              {/* Learning */}
              <Widget size="sm" className="flex-1 border-border/40 bg-card/60 overflow-hidden min-w-0">
                <WidgetHeader>
                  <WidgetTitle className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.18em] font-normal">
                    Learning
                  </WidgetTitle>
                  <span className="size-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
                </WidgetHeader>
                <WidgetContent className="flex-col items-start justify-center gap-2 px-0 pt-1">
                  {LEARNING.map(({ label, icon }) => (
                    <div key={label} className="flex items-center gap-1.5 w-full">
                      <span className="text-brand/60 shrink-0">{icon}</span>
                      <span className="text-[10px] font-mono text-foreground/65 truncate">{label}</span>
                    </div>
                  ))}
                </WidgetContent>
              </Widget>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  )
}
