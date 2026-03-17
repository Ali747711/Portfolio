import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ScrollSection } from "@/components/shared/ScrollSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import {
  SiReact, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiMui, SiRedux,
  SiHtml5, SiNodedotjs, SiNestjs, SiExpress, SiMongodb, SiGraphql, SiSocketdotio,
  SiDocker, SiNginx, SiPm2, SiGithubactions, SiVercel, SiLinux,
  SiOpenai, SiTelegram, SiGit, SiGithub, SiFigma, SiPostman,
  SiPostgresql, SiRedis, SiSpringboot,
} from "react-icons/si"
import { cn } from "@/lib/utils"

/* ── icon map ─────────────────────────────────────────────────────
   Skills not in SI get a colored square with their initials.       */
const ICON_MAP: Record<string, { icon: ReactNode; color: string }> = {
  // Frontend
  "React":         { icon: <SiReact />,        color: "#61DAFB" },
  "Next.js":       { icon: <SiNextdotjs />,    color: "#FFFFFF" },
  "TypeScript":    { icon: <SiTypescript />,   color: "#3178C6" },
  "JavaScript":    { icon: <SiJavascript />,   color: "#F7DF1E" },
  "Tailwind CSS":  { icon: <SiTailwindcss />,  color: "#38BDF8" },
  "Material UI":   { icon: <SiMui />,          color: "#007FFF" },
  "Redux":         { icon: <SiRedux />,        color: "#764ABC" },
  "HTML / CSS":    { icon: <SiHtml5 />,        color: "#E34F26" },
  "Shadcn/UI":     { icon: <SiReact />,        color: "#8B8B8B" },
  "Zustand":       { icon: null,               color: "#E4813B" },
  // Backend
  "Node.js":       { icon: <SiNodedotjs />,   color: "#6DA55F" },
  "NestJS":        { icon: <SiNestjs />,      color: "#E0234E" },
  "Express.js":    { icon: <SiExpress />,     color: "#FFFFFF" },
  "MongoDB":       { icon: <SiMongodb />,     color: "#4EA94B" },
  "PostgreSQL":    { icon: <SiPostgresql />,  color: "#336791" },
  "Redis":         { icon: <SiRedis />,       color: "#FF4438" },
  "GraphQL":       { icon: <SiGraphql />,     color: "#E535AB" },
  "Socket.io":     { icon: <SiSocketdotio />, color: "#FFFFFF" },
  "REST APIs":     { icon: null,              color: "#6EE7B7" },
  "JWT Auth":      { icon: null,              color: "#F59E0B" },
  "Spring Boot":   { icon: <SiSpringboot />,  color: "#6DB33F" },
  // DevOps
  "Docker":        { icon: <SiDocker />,         color: "#0DB7ED" },
  "Nginx":         { icon: <SiNginx />,          color: "#009639" },
  "PM2":           { icon: <SiPm2 />,            color: "#2B037A" },
  "GitHub Actions":{ icon: <SiGithubactions />,  color: "#2088FF" },
  "AWS EC2":       { icon: null,                 color: "#FF9900" },
  "AWS S3":        { icon: null,                 color: "#FF9900" },
  "Vercel":        { icon: <SiVercel />,         color: "#FFFFFF" },
  "Linux":         { icon: <SiLinux />,          color: "#FCC624" },
  // AI & Automation
  "OpenAI API":    { icon: <SiOpenai />,    color: "#74AA9C" },
  "Gemini API":    { icon: null,            color: "#4285F4" },
  "n8n Automation":{ icon: null,            color: "#EA4B71" },
  "AI Agents":     { icon: null,            color: "#A78BFA" },
  "Telegram Bots": { icon: <SiTelegram />, color: "#26A5E4" },
  "AI Workflows":  { icon: null,            color: "#F472B6" },
  // Tools
  "Git":           { icon: <SiGit />,     color: "#F05032" },
  "GitHub":        { icon: <SiGithub />,  color: "#FFFFFF" },
  "Figma":         { icon: <SiFigma />,   color: "#F24E1E" },
  "Postman":       { icon: <SiPostman />, color: "#FF6C37" },
  "VSCode":        { icon: null,          color: "#007ACC" },
  "Docker Compose":{ icon: <SiDocker />, color: "#0DB7ED" },
}

/* ── per-category accent colors ───────────────────────────── */
const CATEGORY_ACCENT: Record<string, string> = {
  "Frontend":        "#61DAFB",
  "Backend":         "#6DA55F",
  "DevOps & Cloud":  "#0DB7ED",
  "AI & Automation": "#A78BFA",
  "Tools":           "#F59E0B",
}

/* ── skill chip ───────────────────────────────────────────── */
function SkillChip({ label }: { label: string }) {
  const meta = ICON_MAP[label]
  const color  = meta?.color  ?? "#888"
  const icon   = meta?.icon   ?? null

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-xl",
      "border border-border/40 bg-background/60",
      "hover:border-brand/35 hover:bg-card transition-colors duration-200 cursor-default",
    )}>
      {/* Icon or colored initial square */}
      <span
        className="shrink-0 flex items-center justify-center"
        style={{ color, fontSize: 15, lineHeight: 1, width: 16, height: 16 }}
      >
        {icon ?? (
          <span
            className="flex items-center justify-center rounded text-[8px] font-black text-background"
            style={{ width: 14, height: 14, background: color, borderRadius: 3 }}
          >
            {label[0]}
          </span>
        )}
      </span>
      <span className="text-[11px] font-mono text-foreground/70 whitespace-nowrap">{label}</span>
    </div>
  )
}

/* ── category card ────────────────────────────────────────── */
const BENTO: Record<number, string> = {
  0: "lg:col-span-2",
  1: "lg:col-span-1",
  2: "lg:col-span-1",
  3: "lg:col-span-2",
  4: "lg:col-span-3",
}

interface SkillGroup { category: string; skills: string[] }

function CategoryCard({ group, index }: { group: SkillGroup; index: number }) {
  const accent = CATEGORY_ACCENT[group.category] ?? "var(--brand)"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" as const }}
      className={cn(
        "relative rounded-2xl border border-border/40 bg-card p-6 overflow-hidden",
        "hover:border-brand/25 transition-colors duration-300",
        BENTO[index] ?? "lg:col-span-1",
      )}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${accent}80, ${accent}20, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            {group.category}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/25">
          {group.skills.length}
        </span>
      </div>

      {/* Chips */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        className="flex flex-wrap gap-2"
      >
        {group.skills.map((skill) => (
          <motion.div
            key={skill}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show:   { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
            }}
          >
            <SkillChip label={skill} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── section ──────────────────────────────────────────────── */

const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI", "Material UI", "Redux", "Zustand", "HTML / CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "NestJS", "Express.js", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "Socket.io", "REST APIs", "JWT Auth", "Spring Boot"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Nginx", "PM2", "GitHub Actions", "AWS EC2", "AWS S3", "Vercel", "Linux"],
  },
  {
    category: "AI & Automation",
    skills: ["OpenAI API", "Gemini API", "n8n Automation", "AI Agents", "Telegram Bots", "AI Workflows"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Figma", "Postman", "VSCode", "Docker Compose"],
  },
]

export function Skills() {
  return (
    <ScrollSection id="skills" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="04"
          title="Tech Stack"
          subtitle="Technologies and tools I reach for every day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group, i) => (
            <CategoryCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </ScrollSection>
  )
}
