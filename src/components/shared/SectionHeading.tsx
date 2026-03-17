import { motion } from "framer-motion"
import BlurText from "@/components/ui/blur-text"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  number?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  subtitle,
  number,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={cn(
        "relative mb-14 overflow-visible",
        align === "center" && "text-center",
        className,
      )}
    >
      {/* Watermark number */}
      {number && (
        <span
          aria-hidden
          className={cn(
            "absolute -top-6 pointer-events-none select-none",
            "text-[9rem] font-black leading-none text-foreground",
            align === "center" ? "left-1/2 -translate-x-1/2" : "-right-4",
          )}
          style={{ opacity: 0.035 }}
        >
          {number}
        </span>
      )}

      {/* Small mono label row */}
      <div
        className={cn(
          "flex items-center gap-2.5 mb-3",
          align === "center" && "justify-center",
        )}
      >
        <div className="h-px w-6 bg-brand shrink-0" />
        <span className="font-mono text-[10px] text-brand/70 uppercase tracking-[0.22em]">
          {number ? `${number} \u2500\u2500\u2500 ${title}` : title}
        </span>
      </div>

      {/* Main h2 */}
      <h2
        className={cn(
          "font-black tracking-tight leading-[0.9] text-foreground mt-2",
          "text-[clamp(2.75rem,5vw,4rem)]",
        )}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <BlurText
          text={subtitle}
          delay={60}
          animateBy="words"
          className="text-muted-foreground text-lg max-w-xl mt-4 leading-relaxed"
        />
      )}
    </motion.div>
  )
}
