import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/constants"

interface ProjectCardProps {
  project: Project
  className?: string
  index?: number
}

export function ProjectCard({ project, className, index }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("group h-full", className)}
    >
      <div
        className={cn(
          "relative h-full rounded-xl border border-border/50",
          "bg-card overflow-hidden",
          "transition-all duration-300",
          "hover:border-brand/40 hover:shadow-[0_0_30px_var(--brand-glow)]",
        )}
      >
        {/* Gradient top accent line */}
        <div className={cn("h-px w-full bg-linear-to-r", project.gradient)} />

        {/* Card content */}
        <div className="flex flex-col h-full p-6 gap-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-brand transition-colors">
              {project.title}
            </h3>
            {index !== undefined && (
              <span className="font-mono text-[10px] text-muted-foreground/30 shrink-0 pt-1">
                0{index + 1}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-xs font-medium px-4 py-2 rounded-lg",
                  "border border-border bg-secondary/60",
                  "text-muted-foreground hover:text-foreground hover:border-brand/50",
                  "transition-colors duration-150",
                )}
              >
                GitHub →
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-xs font-medium px-4 py-2 rounded-lg",
                  "bg-brand/10 border border-brand/30 text-brand",
                  "hover:bg-brand/20 hover:border-brand/60",
                  "transition-colors duration-150",
                )}
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
