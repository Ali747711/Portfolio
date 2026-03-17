import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeButtonsProps {
  className?: string
  size?: "sm" | "md"
}

export function ResumeButtons({ className, size = "md" }: ResumeButtonsProps) {
  const base = cn(
    "inline-flex items-center gap-2 rounded-full border border-border/60",
    "text-foreground/70 hover:border-brand/60 hover:text-brand",
    "bg-transparent transition-colors duration-200 font-semibold",
    size === "md" ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs",
  )

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        href="/resumes/resume-en.pdf"
        download="Azamat_Nabiev_Resume_EN.pdf"
        className={base}
      >
        <Download className={size === "md" ? "size-4" : "size-3.5"} />
        Resume EN
      </a>
      <a
        href="/resumes/resume-kr.pdf"
        download="Azamat_Nabiev_Resume_KR.pdf"
        className={base}
      >
        <Download className={size === "md" ? "size-4" : "size-3.5"} />
        Resume KR
      </a>
    </div>
  )
}
