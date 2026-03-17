import { FloatingNav } from "@/components/layout/FloatingNav"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"
import { ScrollToTopProgress } from "@/components/ui/scroll-to-top"
import { TooltipProvider } from "@/components/ui/tooltip"

export function App() {
  return (
    <TooltipProvider>
    <div className="relative min-h-svh bg-background">
      <FloatingNav />
      <ScrollToTopProgress
        threshold={400}
        progressColor="var(--brand)"
        progressBgColor="rgba(255,255,255,0.06)"
        strokeWidth={2.5}
      />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
    </TooltipProvider>
  )
}

export default App
