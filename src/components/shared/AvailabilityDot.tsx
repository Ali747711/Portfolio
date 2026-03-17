import { cn } from "@/lib/utils"

interface AvailabilityDotProps {
  label?: string
  className?: string
}

export function AvailabilityDot({
  label = "Available for work",
  className,
}: AvailabilityDotProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5",
        "rounded-full border border-border bg-card/60 backdrop-blur-sm",
        "text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <span className="availability-dot" />
      {label}
    </div>
  )
}
