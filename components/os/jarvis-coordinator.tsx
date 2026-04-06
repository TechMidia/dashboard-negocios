"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface JarvisCoordinatorProps {
  status?: "online" | "thinking" | "coordinating"
  pendingDecisions?: number
  coordinating?: string[]
}

export function JarvisCoordinator({
  status = "online",
  pendingDecisions = 3,
  coordinating = ["TechMidia", "Don Carmo"],
}: JarvisCoordinatorProps) {
  const statusConfig = {
    online: {
      icon: Activity,
      label: "Online",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    thinking: {
      icon: Brain,
      label: "Pensando",
      color: "text-alert-important",
      bgColor: "bg-alert-important/10",
    },
    coordinating: {
      icon: Zap,
      label: "Coordenando",
      color: "text-alert-info",
      bgColor: "bg-alert-info/10",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-full p-2", config.bgColor)}>
              <Icon className={cn("h-5 w-5", config.color)} />
            </div>
            <div>
              <CardTitle className="text-lg">Jarvis Central</CardTitle>
              <p className="text-sm text-muted-foreground">Coordenador do Sistema</p>
            </div>
          </div>
          <Badge className={cn("bg-primary/20 text-primary", config.bgColor)}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-card/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Decisões</span>
              <Badge variant="outline">{pendingDecisions}</Badge>
            </div>
            <p className="mt-1 text-2xl font-bold">{pendingDecisions}</p>
            <p className="text-xs text-alert-important">Pendentes</p>
          </div>

          <div className="rounded-lg bg-card/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Coordenando</span>
              <span className="text-xs font-medium">{coordinating.length}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{coordinating.length}</p>
            <p className="text-xs text-primary">Domínios</p>
          </div>
        </div>

        {/* Coordinating Domains */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Coordenando</h4>
          <div className="space-y-2">
            {coordinating.map((domain) => (
              <div
                key={domain}
                className="flex items-center justify-between rounded-lg bg-card/50 px-3 py-2"
              >
                <span className="text-sm">{domain}</span>
                <Activity className="h-4 w-4 text-primary animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-primary/5 text-primary hover:bg-primary/10"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Ver Decisões
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
          >
            <Clock className="mr-2 h-4 w-4" />
            Timeline
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
