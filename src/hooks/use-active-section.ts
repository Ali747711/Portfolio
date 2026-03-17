import { useEffect, useState } from "react"
import { NAV_SECTIONS } from "@/lib/constants"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("hero")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return { activeSection, scrollTo }
}
