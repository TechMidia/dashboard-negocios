import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  colorClass?: string
  className?: string
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  colorClass,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "border-white/5 bg-card/50 backdrop-blur-xl",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={cn("text-2xl font-bold tracking-tight", colorClass)}>
              {value}
            </p>
          </div>
          {Icon && (
            <div className={cn("rounded-lg bg-white/5 p-2", colorClass)}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            {trend === "up" && (
              <TrendingUp className="h-3 w-3 text-primary" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-3 w-3 text-alert-critical" />
            )}
            {trend === "neutral" && (
              <Minus className="h-3 w-3 text-muted-foreground" />
            )}
            {trendValue && (
              <span
                className={cn(
                  "text-xs",
                  trend === "up" && "text-primary",
                  trend === "down" && "text-alert-critical",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trendValue}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
