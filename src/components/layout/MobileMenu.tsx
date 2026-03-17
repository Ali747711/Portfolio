import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_SECTIONS } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  activeSection: string
  scrollTo: (id: string) => void
}

export function MobileMenu({ activeSection, scrollTo }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleNav = (id: string) => {
    scrollTo(id)
    setOpen(false)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex flex-col gap-1.5 w-5 items-end"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
          className="block h-0.5 bg-foreground rounded-full origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: "14px" }}
          className="block h-0.5 bg-foreground rounded-full"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
          className="block h-0.5 bg-foreground rounded-full origin-center"
        />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "fixed top-16 left-1/2 -translate-x-1/2 z-50",
                "w-56 rounded-2xl border border-border",
                "bg-card/95 backdrop-blur-md",
                "shadow-xl p-3",
                "flex flex-col gap-1",
              )}
            >
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNav(section.id)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    activeSection === section.id
                      ? "bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
