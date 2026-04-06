"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Circle, TrendingUp, TrendingDown } from "lucide-react"

export type CEOStatus = "operational" | "setup" | "active" | "paused" | "error"

export interface CEOCardProps {
  name: string
  status: CEOStatus
  colorClass: string
  metrics: {
    label: string
    value: string | number
    trend?: "up" | "down" | "neutral"
  }[]
  lastAction?: string
  lastActionTime?: string
}

const statusLabels: Record<CEOStatus, string> = {
  operational: "Operacional",
  setup: "Em Setup",
  active: "Ativo",
  paused: "Pausado",
  error: "Erro",
}

const statusColors: Record<CEOStatus, string> = {
  operational: "text-primary",
  setup: "text-alert-important",
  active: "text-primary",
  paused: "text-muted-foreground",
  error: "text-alert-critical",
}

export function CEOCard({
  name,
  status,
  colorClass,
  metrics,
  lastAction,
  lastActionTime,
}: CEOCardProps) {
  return (
    <Card className="relative overflow-hidden border-white/5 bg-card/50 backdrop-blur-xl">
      <div className={cn("absolute inset-x-0 top-0 h-1", colorClass)} />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        <div className="flex items-center gap-1.5">
          <Circle
            className={cn(
              "h-2 w-2 fill-current",
              statusColors[status]
            )}
          />
          <span className={cn("text-xs font-medium", statusColors[status])}>
            {statusLabels[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight">
                  {metric.value}
                </span>
                {metric.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-primary" />
                )}
                {metric.trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-alert-critical" />
                )}
              </div>
            </div>
          ))}
        </div>
        {lastAction && (
          <div className="border-t border-white/5 pt-3">
            <p className="text-xs text-muted-foreground">Ultima acao</p>
            <p className="mt-1 text-sm">{lastAction}</p>
            {lastActionTime && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {lastActionTime}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
