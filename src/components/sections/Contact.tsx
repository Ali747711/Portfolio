import { useRef, useState, type MutableRefObject } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import VariableProximity from "@/components/ui/variable-proximity"
import Magnet from "@/components/ui/magnet"
import { ScrollSection } from "@/components/shared/ScrollSection"
import { Github, Linkedin, Send, MapPin, Clock, CheckCircle2, Briefcase, Cpu, Globe } from "lucide-react"
import { LiveClock } from "@/components/shared/HeroWidgets"
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ResumeButtons } from "@/components/shared/ResumeButtons"

const socialIconMap: Record<string, React.ReactNode> = {
  GitHub:   <Github className="size-4" />,
  LinkedIn: <Linkedin className="size-4" />,
  Telegram: <Send className="size-4" />,
}

/* ── tiny card shell ───────────────────────────────────────── */
function Widget({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "rounded-2xl border border-border/40 bg-card/80 p-5",
      "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
      className,
    )}>
      {children}
    </div>
  )
}

function WLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
      {children}
    </span>
  )
}

/* ── 1. Status widget ──────────────────────────────────────── */
const OPEN_FOR = [
  { icon: <Briefcase className="size-3" />, label: "Full-time roles" },
  { icon: <Cpu className="size-3" />,       label: "AI integrations" },
  { icon: <Globe className="size-3" />,     label: "Freelance projects" },
]

function StatusWidget() {
  return (
    <Widget>
      <div className="flex items-center justify-between mb-4">
        <WLabel>Current status</WLabel>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Available
        </span>
      </div>

      <p className="text-sm font-semibold text-foreground/90 mb-3">Open to new opportunities</p>

      <div className="space-y-2">
        {OPEN_FOR.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="text-brand/60">{icon}</span>
            {label}
          </div>
        ))}
      </div>

      {/* Capacity bar */}
      <div className="mt-4 pt-3 border-t border-border/20">
        <div className="flex items-center justify-between mb-1.5">
          <WLabel>Bandwidth</WLabel>
          <span className="font-mono text-[9px] text-emerald-400/60">~80% free</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted-foreground/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand/70 to-emerald-400/70"
            initial={{ width: 0 }}
            whileInView={{ width: "80%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          />
        </div>
      </div>
    </Widget>
  )
}

/* ── 2. Timezone widget (reuses LiveClock) ─────────────────── */
function TimezoneWidget() {
  const BEST_START = 9   // 9 AM
  const BEST_END   = 21  // 9 PM
  const nowHour = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  ).getHours()
  const isActive = nowHour >= BEST_START && nowHour < BEST_END

  return (
    <Widget>
      <div className="flex items-center justify-between mb-3">
        <WLabel>Timezone</WLabel>
        <span className={cn(
          "text-[9px] font-mono",
          isActive ? "text-emerald-400/70" : "text-muted-foreground/30",
        )}>
          {isActive ? "● Online window" : "○ Outside hours"}
        </span>
      </div>

      {/* Embed the same clock from HeroWidgets */}
      <LiveClock />

      {/* 24-hr activity bar */}
      <div className="mt-3 pt-3 border-t border-border/20">
        <WLabel>Best hours · 9 AM – 9 PM</WLabel>
        <div className="mt-1.5 flex gap-0.5">
          {Array.from({ length: 24 }, (_, h) => {
            const inWindow = h >= BEST_START && h < BEST_END
            const isCurrent = h === nowHour
            return (
              <div
                key={h}
                className={cn(
                  "flex-1 h-3 rounded-[2px]",
                  isCurrent && "ring-1 ring-brand",
                  inWindow  ? "bg-brand/40" : "bg-muted-foreground/8",
                )}
              />
            )
          })}
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="text-[8px] font-mono text-muted-foreground/25">12 AM</span>
          <span className="text-[8px] font-mono text-muted-foreground/25">12 PM</span>
          <span className="text-[8px] font-mono text-muted-foreground/25">11 PM</span>
        </div>
      </div>
    </Widget>
  )
}

/* ── 3. Quick message widget ───────────────────────────────── */
function QuickMessageWidget() {
  const [name, setName]       = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent]       = useState(false)

  function handleSend() {
    if (!message.trim()) return
    const subject = name ? `Hey from ${name}` : "Portfolio contact"
    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
      "_blank",
    )
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputCls = cn(
    "w-full bg-background/50 border border-border/30 rounded-xl px-3 py-2.5",
    "text-sm text-foreground placeholder:text-muted-foreground/30",
    "focus:outline-none focus:border-brand/50 transition-colors",
    "font-mono text-xs",
  )

  return (
    <Widget>
      <div className="flex items-center justify-between mb-4">
        <WLabel>Quick message</WLabel>
        <MapPin className="size-3 text-muted-foreground/30" />
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-2 py-6 text-center"
          >
            <CheckCircle2 className="size-7 text-emerald-400" />
            <p className="text-sm text-foreground/70 font-mono">Opening your email&hellip;</p>
          </motion.div>
        ) : (
          <motion.div key="form" className="space-y-2.5">
            <input
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
            <textarea
              placeholder="Say hi, ask about availability…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={cn(inputCls, "resize-none")}
            />
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "w-full py-2.5 rounded-xl text-xs font-mono font-semibold",
                "bg-brand text-background transition-opacity",
                "disabled:opacity-30 disabled:cursor-not-allowed",
              )}
            >
              Send via Email →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Widget>
  )
}

/* ── Main Contact section ──────────────────────────────────── */
export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollSection
      id="contact"
      className={cn("py-32 px-6 md:px-12 lg:px-24", "relative overflow-hidden")}
    >
      {/* Stage light */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, var(--brand-glow) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start max-w-6xl mx-auto">

        {/* ── LEFT column ── */}
        <div ref={containerRef}>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-6 bg-brand" />
            <span className="font-mono text-[10px] text-brand/70 uppercase tracking-[0.22em]">
              05 ─── Contact
            </span>
          </motion.div>

          {/* Large gradient heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-extrabold leading-tight mb-6 gradient-text"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <VariableProximity
              label="Let's build something together."
              containerRef={containerRef as MutableRefObject<HTMLElement | null>}
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={200}
              falloff="gaussian"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg"
          >
            Open to full-time roles, freelance projects, and AI integrations.
            Currently{" "}
            <span className="text-foreground font-medium">remote</span> — open to relocate.
          </motion.p>

          {/* CTA rows */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Send className="size-4" />
              Send Email
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.find((s) => s.label === "LinkedIn")?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 rounded-full",
                "border border-border/60 text-foreground font-semibold text-sm",
                "hover:border-brand/60 hover:text-brand transition-colors",
              )}
            >
              <Linkedin className="size-4" />
              LinkedIn
            </motion.a>
          </motion.div>

          {/* Resume downloads */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="mb-10"
          >
            <ResumeButtons />
          </motion.div>

          {/* Info rows */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: <Send className="size-3.5" />,   label: "Email",    value: CONTACT.email },
              { icon: <MapPin className="size-3.5" />, label: "Location", value: CONTACT.location },
              { icon: <Clock className="size-3.5" />,  label: "Response", value: "Within 24 hours" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border/30 bg-card/50 p-4"
              >
                <div className="flex items-center gap-1.5 mb-1.5 text-brand/60">
                  {icon}
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/40">
                    {label}
                  </span>
                </div>
                <p className="text-sm text-foreground/75 font-mono truncate">{value}</p>
              </div>
            ))}
          </motion.div>

          <Separator className="my-8 opacity-20" />

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4"
          >
            {SOCIAL_LINKS.map((link) => (
              <Magnet key={link.label} padding={60} magnetStrength={3}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "size-10 rounded-xl border border-border",
                    "flex items-center justify-center",
                    "text-muted-foreground",
                    "hover:border-brand/60 hover:text-brand",
                    "bg-card/60 backdrop-blur-sm",
                    "transition-colors duration-200",
                  )}
                >
                  {socialIconMap[link.label] ?? (
                    <span className="text-xs font-mono font-bold">
                      {link.label.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </motion.a>
              </Magnet>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground/30 mt-16 font-mono"
          >
            Designed & built by Azamat · {new Date().getFullYear()}
          </motion.p>
        </div>

        {/* ── RIGHT column — widget stack ── */}
        <div className="hidden lg:flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
          >
            <StatusWidget />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" as const }}
          >
            <TimezoneWidget />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
          >
            <QuickMessageWidget />
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  )
}
