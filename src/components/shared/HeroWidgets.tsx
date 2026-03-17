/**
 * Hero right-column widgets:
 *  1. LiveClock  — ticking clock in your local timezone
 *  2. AvailabilityCalendar — mini calendar with open days
 *  3. GitHubActivity — recent push events from GitHub API
 */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, GitCommit, ExternalLink } from "lucide-react"

import useSWR from "swr"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => { if (!r.ok) throw new Error("not found"); return r.json() })

const GITHUB_USER = "azamat-nabiev" // ← update to real username
const TIMEZONE = "Asia/Seoul"        // KST UTC+9

// ── tiny card shell ─────────────────────────────────────────────
function Widget({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/80 p-4",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
      {children}
    </span>
  )
}

// ── 1. Live clock ────────────────────────────────────────────────
export function LiveClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(time)

  const h = parts.find((p) => p.type === "hour")?.value ?? "00"
  const m = parts.find((p) => p.type === "minute")?.value ?? "00"
  const s = parts.find((p) => p.type === "second")?.value ?? "00"

  const dateStr = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(time)

  return (
    <Widget>
      <div className="flex items-center justify-between mb-3">
        <Label>Local time</Label>
        <div className="flex items-center gap-1 text-muted-foreground/40">
          <MapPin className="size-2.5" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">Busan · UTC+9</span>
        </div>
      </div>

      {/* Big clock */}
      <div className="flex items-end gap-0.5 leading-none font-mono font-black tracking-tighter">
        <span
          className="gradient-text"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)" }}
        >
          {h}:{m}
        </span>
        <span
          className="text-muted-foreground/40 pb-0.5"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
        >
          :{s}
        </span>
      </div>

      <p className="mt-1 text-[10px] text-muted-foreground/40 font-mono">Busan · UTC+9 · {dateStr}</p>
    </Widget>
  )
}

// ── 2. Availability calendar ─────────────────────────────────────
const AVAILABLE_DAYS = [3, 5, 6, 10, 12, 13, 17, 19, 20, 24, 26, 27]

export function AvailabilityCalendar() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()

  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(now)
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  return (
    <Widget>
      <div className="flex items-center justify-between mb-3">
        <Label>Availability</Label>
        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400/70">
          <span className="size-1.5 rounded-full bg-emerald-400/70 animate-pulse inline-block" />
          Open to work
        </span>
      </div>

      <p className="text-[10px] font-mono text-muted-foreground/50 mb-2">{monthName} {year}</p>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-px mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[8px] text-muted-foreground/30 font-mono">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const isToday = day === today
          const isAvailable = AVAILABLE_DAYS.includes(day)
          const isPast = day < today

          return (
            <div
              key={day}
              className={cn(
                "aspect-square flex items-center justify-center rounded-md text-[9px] font-mono relative",
                isPast && "opacity-25",
                isToday && "ring-1 ring-brand/60 text-brand font-bold",
                !isPast && isAvailable && "text-emerald-400/80",
                !isPast && !isAvailable && !isToday && "text-muted-foreground/30",
              )}
            >
              {day}
              {!isPast && isAvailable && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-0.5 rounded-full bg-emerald-400/70" />
              )}
            </div>
          )
        })}
      </div>
    </Widget>
  )
}

// ── 3. GitHub activity ───────────────────────────────────────────
interface GitEvent {
  id: string
  type: string
  repo: { name: string }
  payload: { commits?: { message: string }[] }
  created_at: string
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

export function GitHubActivity() {
  const { data, error, isLoading } = useSWR<GitEvent[]>(
    `https://api.github.com/users/${GITHUB_USER}/events?per_page=20`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300_000 } // cache 5 min
  )
  const events = data?.filter((e) => e.type === "PushEvent").slice(0, 4) ?? []
  const loading = isLoading

  // Fallback static data when API fails or user not found
  const fallback = [
    { id: "1", repo: "morning-cup-app",     msg: "feat: add AI recipe suggestions",     time: "2h" },
    { id: "2", repo: "avicenna-platform",   msg: "fix: optimize query performance",      time: "1d" },
    { id: "3", repo: "busa-speaking-club",  msg: "chore: update dependencies",           time: "3d" },
    { id: "4", repo: "livit-app",           msg: "feat: implement user onboarding flow", time: "5d" },
  ]

  return (
    <Widget className="col-span-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Label>GitHub activity</Label>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground/30 hover:text-brand/60 transition-colors"
        >
          @{GITHUB_USER}
          <ExternalLink className="size-2.5 ml-0.5" />
        </a>
      </div>

      <div className="space-y-2.5">
        {loading && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-2 items-start animate-pulse">
              <div className="size-1.5 mt-1.5 rounded-full bg-muted-foreground/10 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-3/4 bg-muted-foreground/10 rounded" />
                <div className="h-2 w-1/2 bg-muted-foreground/10 rounded" />
              </div>
            </div>
          ))
        )}

        {!loading && (error ? fallback.map((item) => (
          <div key={item.id} className="flex gap-2 items-start group">
            <GitCommit className="size-3 mt-0.5 text-brand/40 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-foreground/70 font-mono truncate">{item.msg}</p>
              <p className="text-[9px] text-muted-foreground/35 font-mono mt-0.5">
                {item.repo} · {item.time} ago
              </p>
            </div>
          </div>
        )) : events.map((ev) => {
          const msg = ev.payload.commits?.[0]?.message?.split("\n")[0] ?? "Pushed changes"
          const repo = ev.repo.name.split("/")[1]
          return (
            <div key={ev.id} className="flex gap-2 items-start">
              <GitCommit className="size-3 mt-0.5 text-brand/40 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground/70 font-mono truncate">{msg}</p>
                <p className="text-[9px] text-muted-foreground/35 font-mono mt-0.5">
                  {repo} · {timeAgo(ev.created_at)} ago
                </p>
              </div>
            </div>
          )
        }))}
      </div>

      {/* Mini contribution strip */}
      <div className="mt-4 pt-3 border-t border-border/20">
        <div className="flex items-center justify-between mb-1.5">
          <Label>Contributions</Label>
          <span className="text-[9px] font-mono text-muted-foreground/30">last 30 days</span>
        </div>
        <ContributionStrip />
      </div>
    </Widget>
  )
}

// Mini 7×5 contribution heatmap (simulated — GitHub's real graph requires GraphQL)
function ContributionStrip() {
  const seed = [3, 0, 1, 4, 2, 0, 5, 1, 3, 2, 4, 0, 1, 3, 5, 2, 4, 1, 0, 3, 2, 5, 1, 4, 3, 0, 2, 1, 4, 3]

  return (
    <div className="grid grid-cols-[repeat(30,1fr)] gap-px">
      {seed.map((count, i) => (
        <div
          key={i}
          className={cn(
            "aspect-square rounded-[1px]",
            count === 0 && "bg-muted-foreground/8",
            count === 1 && "bg-brand/20",
            count === 2 && "bg-brand/35",
            count === 3 && "bg-brand/55",
            count === 4 && "bg-brand/75",
            count === 5 && "bg-brand",
          )}
        />
      ))}
    </div>
  )
}

// ── Combined widget bento ────────────────────────────────────────
export function HeroWidgets() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
      className="grid grid-cols-2 gap-3"
    >
      <LiveClock />
      <AvailabilityCalendar />
      <GitHubActivity />
    </motion.div>
  )
}
