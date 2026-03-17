import { Badge } from "@/components/ui/badge"
import { Safari } from "@/components/ui/safari"
import { Timeline } from "@/components/ui/timeline"
import { ScrollSection } from "@/components/shared/ScrollSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { cn } from "@/lib/utils"

/* ─── Image card helper ─── */
function ProjectImage({ src, url }: { src: string; alt?: string; url?: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-[0_0_32px_rgba(0,0,0,0.5)]">
      <Safari imageSrc={src} url={url ?? "localhost:5173"} className="w-full" />
    </div>
  )
}

/* ─── Feature list helper ─── */
function Feature({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="mt-0.5 shrink-0 text-brand">▸</span>
      <span>{children}</span>
    </div>
  )
}

/* ─── Link pill helper ─── */
function LinkPill({
  href,
  children,
  primary,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-150",
        primary
          ? "bg-brand text-background hover:opacity-90"
          : "border border-border/60 text-muted-foreground hover:border-brand/50 hover:text-foreground"
      )}
    >
      {children}
    </a>
  )
}

/* ─── Project card wrapper ─── */
function ProjectCard({
  category,
  description,
  features,
  tags,
  image,
  imageAlt,
  github,
  live,
}: {
  category: string
  description: string
  features: string[]
  tags: string[]
  image: string
  imageAlt: string
  github?: string
  live?: string
}) {
  return (
    <div className="mb-4 space-y-6 rounded-2xl border border-border/40 bg-card p-6 md:p-8">
      {/* Category + links */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-brand/70 uppercase">
          {category}
        </span>
        <div className="flex gap-2">
          {github && <LinkPill href={github}>GitHub →</LinkPill>}
          {live && (
            <LinkPill href={live} primary>
              Live Demo →
            </LinkPill>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="leading-relaxed text-muted-foreground">{description}</p>

      {/* Features */}
      <div className="space-y-2">
        {features.map((f, i) => (
          <Feature key={i}>{f}</Feature>
        ))}
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Screenshot */}
      <ProjectImage src={image} alt={imageAlt} />
    </div>
  )
}

/* ─── Timeline data ─── */
const timelineData = [
  {
    title: "Morning Cup",
    content: (
      <ProjectCard
        category="Full Stack · E-Commerce"
        description="Production-ready coffee ordering platform with a customer storefront, real-time order tracking via Socket.io, a loyalty points system, and a server-side rendered admin dashboard — containerised with Docker and deployed to a Linux VPS."
        features={[
          "JWT auth with httpOnly cookies, bcrypt password hashing, Helmet security headers, and Upstash Redis rate limiting",
          "Real-time customer support chat via Socket.io — typing indicators, read receipts, per-user conversation rooms, admin resolve flow",
          "Redux Toolkit for server state, React Context for UI & session state, Axios interceptor for token injection and error handling",
          "Multi-stage Docker build: Node.js compile → Nginx for static asset serving in production",
          "Cloudinary image upload pipeline (Multer stream) for products and user avatars",
        ]}
        tags={[
          "React",
          "TypeScript",
          "Node.js",
          "Express",
          "MongoDB",
          "Socket.io",
          "Redux",
          "Docker",
          "Nginx",
          "Redis",
          "JWT",
          "Cloudinary",
        ]}
        image="/projects/morning-cup.png"
        imageAlt="Morning Cup coffee ordering platform"
        live="https://morning-cup.shop/"
      />
    ),
  },
  {
    title: "Avicenna",
    content: (
      <ProjectCard
        category="AI · Full Stack · Healthcare"
        description="AI-powered multilingual medical symptom analysis for foreigners in South Korea. Describe symptoms in English, Korean, or Uzbek — receive structured differential diagnosis, urgency assessment, and healthcare provider recommendations in seconds."
        features={[
          "Gemini 2.5 Flash with multi-model fallback chain (2.5 → 2.0 → 2.0-lite) and 25s AbortController timeout for high availability",
          "Three-strategy JSON parsing (direct parse → markdown extract → regex match) with fully localised fallback responses",
          "Firebase Auth with 30-minute inactivity session timeout, 5-minute pre-warning modal, and activity tracking across 6 event types",
          "Full i18n across UI and AI-generated content — 750+ translation keys in EN / KO / UZ with auto browser-language detection",
          "Client-side PDF export via jsPDF with colour-coded urgency levels, page breaks, and medical disclaimer footer",
        ]}
        tags={[
          "React 19",
          "TypeScript",
          "Vite",
          "Firebase",
          "Gemini API",
          "Vercel Functions",
          "Framer Motion",
          "i18next",
          "jsPDF",
          "Tailwind CSS",
        ]}
        image="/projects/avicenna.png"
        imageAlt="Avicenna AI symptom analysis app"
        live="https://avicenna-webapp.vercel.app"
      />
    ),
  },
  {
    title: "BUSA Speaking Club",
    content: (
      <ProjectCard
        category="Full Stack · Community Platform"
        description="Community management web app for the Busan Uzbek Students Association — enabling students to discover and register for English speaking sessions, mentors to manage content, and admins to control roles and site configuration without touching code."
        features={[
          "Three-tier RBAC (member / mentor / admin) with Firebase Auth email+password and Google OAuth, enforced at both route and component level",
          "Full-CRUD admin dashboard: sessions, events, photo gallery (Firebase Storage), success stories, user roles, and a live CMS for site config",
          "Interactive calendar (react-calendar) showing sessions by date with in-app registration modal writing to Firestore atomically",
          "Firestore database in asia-northeast3 (Seoul) region — deliberately chosen for lowest latency to the Korean target user base",
          "Vite manualChunks code splitting: separate vendor bundles for React, Firebase, and UI libraries with 1-year immutable cache headers",
        ]}
        tags={[
          "React 19",
          "Firebase Auth",
          "Firestore",
          "Firebase Storage",
          "React Router v7",
          "Tailwind CSS",
          "Vercel",
          "RBAC",
        ]}
        image="/projects/busa-speaking-club.png"
        imageAlt="BUSA Speaking Club community platform"
        live="https://busa-speaking-club.vercel.app"
      />
    ),
  },
  {
    title: "Livit — Real Estate Platform",
    content: (
      <ProjectCard
        category="Full Stack · Real Estate · GraphQL"
        description="Editorial-luxury real estate marketplace connecting property seekers, sellers, agents, and admins — with real-time WebSocket messaging, a community article board, and a full-featured admin moderation panel across 21 route pages and 70+ components."
        features={[
          "Apollo Client consuming a NestJS GraphQL API — full type-safe queries, mutations, and subscriptions across property, user, and messaging domains",
          "Real-time private messaging and push notifications over WebSocket subscriptions with unread count tracking",
          "Role-aware platform: guests browse, authenticated users save favourites and write articles, agents list properties, admins moderate everything",
          "Next.js 16 App Router with Tailwind CSS v4 — editorial layout, image-forward property cards, and responsive design across all breakpoints",
          "Docker + docker-compose setup for containerised local and cloud deployment with environment-based config",
        ]}
        tags={[
          "Next.js",
          "React 18",
          "TypeScript",
          "GraphQL",
          "Apollo Client",
          "NestJS",
          "Tailwind CSS v4",
          "Docker",
          "WebSocket",
        ]}
        image="/projects/livit.png"
        imageAlt="Livit real estate marketplace"
        github="https://github.com"
      />
    ),
  },
]

/* ─── Section ─── */
export function Projects() {
  return (
    <ScrollSection id="projects" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="03"
          title="Projects"
          subtitle="A selection of things I've built — from AI systems to full-stack platforms."
        />
        <Timeline data={timelineData} />
      </div>
    </ScrollSection>
  )
}
