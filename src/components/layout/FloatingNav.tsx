import { motion } from "framer-motion"
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle"
import { useActiveSection } from "@/hooks/use-active-section"
import { NAV_SECTIONS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"

export function FloatingNav() {
  const { activeSection, scrollTo } = useActiveSection()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-3 px-4 py-2.5",
        "rounded-full border border-border/60",
        "bg-background/70 backdrop-blur-md",
        "shadow-lg shadow-black/10",
      )}
      aria-label="Main navigation"
    >
      {/* Desktop: section dots */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={`Go to ${section.label}`}
            title={section.label}
            className="relative p-1.5 group"
          >
            <motion.div
              className={cn(
                "rounded-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-brand"
                  : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60",
              )}
              animate={{
                width: activeSection === section.id ? 20 : 8,
                height: 8,
              }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            />
          </button>
        ))}
      </div>

      {/* Desktop separator */}
      <div className="hidden md:block w-px h-4 bg-border/60" />

      {/* Animated theme toggle */}
      <AnimatedThemeToggle className="border-none shadow-none bg-transparent hover:bg-secondary/60 size-8 px-0" />

      {/* Mobile: hamburger */}
      <div className="md:hidden">
        <MobileMenu activeSection={activeSection} scrollTo={scrollTo} />
      </div>
    </motion.nav>
  )
}
