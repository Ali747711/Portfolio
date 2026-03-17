import { cn } from "@/lib/utils"

interface TechBadgeProps {
  label: string
  className?: string
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-brand/10 hover:border-brand/40 hover:text-foreground",
        "transition-all duration-150 hover:scale-105",
        "cursor-default select-none",
        className,
      )}
    >
      {label}
    </span>
  )
}
