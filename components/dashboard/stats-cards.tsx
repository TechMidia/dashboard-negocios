"use client"

import { CheckSquare, Calendar, Target, Mail, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Tarefas Pendentes",
    value: "12",
    change: "+2",
    trend: "up",
    icon: CheckSquare,
    description: "desde ontem",
  },
  {
    title: "Reunioes Hoje",
    value: "4",
    change: "-1",
    trend: "down",
    icon: Calendar,
    description: "vs. media semanal",
  },
  {
    title: "Metas em Progresso",
    value: "7",
    change: "+3",
    trend: "up",
    icon: Target,
    description: "este mes",
  },
  {
    title: "Mensagens",
    value: "5",
    change: "+5",
    trend: "up",
    icon: Mail,
    description: "nao lidas",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="bg-card/50 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }
              >
                {stat.change}
              </span>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
