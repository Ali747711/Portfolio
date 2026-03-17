// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  category: "frontend" | "fullstack" | "ai"
  github?: string
  live?: string
  featured?: boolean
  gradient: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface SocialLink {
  label: string
  href: string
  icon: string // hugeicon name
}

export interface NavSection {
  id: string
  label: string
}

export interface Stat {
  value: string
  label: string
}

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

export const NAV_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

// ─────────────────────────────────────────────
// Projects
// Replace placeholder data with your real projects
// ─────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "ai-platform",
    title: "AI-Powered SaaS Platform",
    description:
      "A full-stack SaaS platform with OpenAI integration, real-time collaboration, and subscription billing.",
    longDescription:
      "Built a production-ready SaaS platform from zero to launch. Includes multi-tenant auth, OpenAI-powered features, Stripe payments, real-time updates via Socket.io, and a full DevOps pipeline with Docker and GitHub Actions.",
    tags: ["React", "NestJS", "MongoDB", "OpenAI", "Socket.io", "Docker"],
    category: "ai",
    github: "https://github.com/azamat",
    live: "#",
    featured: true,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: "devops-dashboard",
    title: "DevOps Monitoring Dashboard",
    description:
      "Real-time server monitoring dashboard with Docker container management and CI/CD pipeline visualization.",
    tags: ["React", "Node.js", "Docker", "AWS EC2", "GraphQL"],
    category: "fullstack",
    github: "https://github.com/azamat",
    live: "#",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "telegram-bot",
    title: "AI Telegram Bot Ecosystem",
    description:
      "Suite of AI-powered Telegram bots using Gemini API with n8n automation workflows and NestJS backend.",
    tags: ["NestJS", "Gemini API", "n8n", "Telegram Bot API", "MongoDB"],
    category: "ai",
    github: "https://github.com/azamat",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "ecommerce",
    title: "Full-Stack E-Commerce Platform",
    description:
      "Scalable e-commerce platform with Next.js, JWT auth, Stripe payments, and AWS S3 media storage.",
    tags: ["Next.js", "TypeScript", "MongoDB", "AWS S3", "Stripe"],
    category: "fullstack",
    github: "https://github.com/azamat",
    live: "#",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
]

// ─────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Material UI",
      "Redux",
      "Zustand",
      "HTML / CSS",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "JWT Auth",
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      "Docker",
      "Nginx",
      "PM2",
      "GitHub Actions",
      "AWS EC2",
      "AWS S3",
      "Vercel",
      "Linux",
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      "OpenAI API",
      "Gemini API",
      "n8n Automation",
      "AI Agents",
      "Telegram Bots",
      "AI Workflows",
    ],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Figma", "Postman", "VSCode", "Docker Compose"],
  },
]

// ─────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────

export const STATS: Stat[] = [
  { value: "3+", label: "Years experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "10+", label: "AI integrations" },
]

// ─────────────────────────────────────────────
// Social links — update hrefs with your real URLs
// ─────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Ali747711",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nabiev-azamat-292903259/",
    icon: "linkedin-01",
  },
  {
    label: "Telegram",
    href: "https://t.me/nabiev0727",
    icon: "telegram",
  },
]

// ─────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────

export const CONTACT = {
  email: "alexnabiyev5@gmail.com",
  location: "Busan, Korea · Remote-first",
}

// ─────────────────────────────────────────────
// Tech strip (hero bottom row)
// ─────────────────────────────────────────────

export const TECH_STRIP = [
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "MongoDB",
  "Docker",
  "OpenAI",
  "AWS",
]
