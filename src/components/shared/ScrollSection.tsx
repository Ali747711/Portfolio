import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ScrollSectionProps {
  id: string
  children: ReactNode
  className?: string
}

export function ScrollSection({ id, children, className }: ScrollSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4 }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  )
}
