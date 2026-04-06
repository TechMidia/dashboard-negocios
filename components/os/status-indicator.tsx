import { cn } from "@/lib/utils"
import { Circle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export type SystemStatus = "online" | "offline" | "warning" | "loading"

interface StatusIndicatorProps {
  status: SystemStatus
  label?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const statusConfig: Record<
  SystemStatus,
  { icon: typeof Circle; color: string; label: string; animate?: boolean }
> = {
  online: {
    icon: CheckCircle2,
    color: "text-primary",
    label: "Online",
  },
  offline: {
    icon: Circle,
    color: "text-muted-foreground",
    label: "Offline",
  },
  warning: {
    icon: AlertCircle,
    color: "text-alert-important",
    label: "Atencao",
  },
  loading: {
    icon: Loader2,
    color: "text-accent",
    label: "Carregando",
    animate: true,
  },
}

const sizeConfig = {
  sm: { icon: "h-3 w-3", text: "text-xs" },
  md: { icon: "h-4 w-4", text: "text-sm" },
  lg: { icon: "h-5 w-5", text: "text-base" },
}

export function StatusIndicator({
  status,
  label,
  showLabel = true,
  size = "md",
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const sizes = sizeConfig[size]
  const Icon = config.icon

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Icon
        className={cn(
          sizes.icon,
          config.color,
          config.animate && "animate-spin"
        )}
      />
      {showLabel && (
        <span className={cn(sizes.text, config.color)}>
          {label || config.label}
        </span>
      )}
    </div>
  )
}
