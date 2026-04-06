import { cn } from "@/lib/utils"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

export type AlertLevel = "critical" | "important" | "info"

interface AlertBadgeProps {
  level: AlertLevel
  children?: React.ReactNode
  className?: string
}

const levelConfig = {
  critical: {
    icon: AlertTriangle,
    bg: "bg-alert-critical/10",
    text: "text-alert-critical",
    border: "border-alert-critical/20",
    label: "Critico",
  },
  important: {
    icon: AlertCircle,
    bg: "bg-alert-important/10",
    text: "text-alert-important",
    border: "border-alert-important/20",
    label: "Importante",
  },
  info: {
    icon: Info,
    bg: "bg-alert-info/10",
    text: "text-alert-info",
    border: "border-alert-info/20",
    label: "Info",
  },
}

export function AlertBadge({ level, children, className }: AlertBadgeProps) {
  const config = levelConfig[level]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {children || config.label}
    </span>
  )
}
