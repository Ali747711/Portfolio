import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MinimalistHeroProps {
  left: ReactNode
  right: ReactNode
  imageSrc: string
  imageAlt: string
  footer?: ReactNode
  className?: string
}

export function MinimalistHero({
  left,
  right,
  imageSrc,
  imageAlt,
  footer,
  className,
}: MinimalistHeroProps) {
  return (
    <div className={cn("relative flex flex-col items-center justify-between", className)}>
      {/* Main 3-col grid */}
      <div className="relative w-full flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-8 md:gap-0">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="z-20 order-2 md:order-1 flex flex-col justify-end pb-10 md:pb-20 px-6 md:px-0"
        >
          {left}
        </motion.div>

        {/* Center — amber circle + image */}
        <div className="relative order-1 md:order-2 flex justify-center items-end self-end">
          {/* Amber circle */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute bottom-0 z-0 rounded-full"
            style={{
              width: "clamp(260px, 28vw, 440px)",
              height: "clamp(260px, 28vw, 440px)",
              background: "var(--brand)",
              boxShadow: "0 0 80px var(--brand-glow), 0 0 160px oklch(0.75 0.18 65 / 12%)",
            }}
          />
          {/* Person image */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative z-10 object-contain object-bottom select-none"
            style={{
              width: "clamp(220px, 24vw, 380px)",
              height: "clamp(320px, 48vh, 600px)",
            }}
          />
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="z-20 order-3 flex flex-col justify-end pb-10 md:pb-20 px-6 md:px-0"
        >
          {right}
        </motion.div>
      </div>

      {/* Footer row */}
      {footer && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="z-30 w-full"
        >
          {footer}
        </motion.div>
      )}
    </div>
  )
}
