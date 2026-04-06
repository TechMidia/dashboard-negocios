import { cn } from "@/lib/utils"
import { Circle, CheckCircle2 } from "lucide-react"

export type TimelineCEO = "techmidia" | "doncarmo" | "vida" | "jarvis"

interface TimelineItemProps {
  time: string
  title: string
  description?: string
  ceo: TimelineCEO
  completed?: boolean
  isLast?: boolean
}

const ceoColors: Record<TimelineCEO, string> = {
  techmidia: "bg-ceo-techmidia",
  doncarmo: "bg-ceo-doncarmo",
  vida: "bg-ceo-vida",
  jarvis: "bg-accent",
}

const ceoLabels: Record<TimelineCEO, string> = {
  techmidia: "TechMidia",
  doncarmo: "Don Carmo",
  vida: "Vida",
  jarvis: "Jarvis",
}

export function TimelineItem({
  time,
  title,
  description,
  ceo,
  completed = false,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 h-full w-px bg-border" />
      )}
      
      {/* Dot */}
      <div className="relative z-10 flex-shrink-0">
        {completed ? (
          <CheckCircle2 className="h-6 w-6 text-primary" />
        ) : (
          <Circle className={cn("h-6 w-6", ceoColors[ceo], "text-transparent fill-current")} />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{time}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              ceoColors[ceo],
              "text-background"
            )}
          >
            {ceoLabels[ceo]}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium">{title}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
