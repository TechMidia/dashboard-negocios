"use client"

import { CheckCircle2, MessageSquare, Target, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    type: "task",
    title: "Tarefa concluida",
    description: "Revisao do documento de requisitos",
    time: "ha 5 min",
    icon: CheckCircle2,
    color: "text-primary",
  },
  {
    id: 2,
    type: "message",
    title: "Nova mensagem",
    description: "Lucas enviou um comentario no projeto",
    time: "ha 15 min",
    icon: MessageSquare,
    color: "text-accent",
  },
  {
    id: 3,
    type: "meeting",
    title: "Reuniao agendada",
    description: "Daily standup com o time",
    time: "ha 30 min",
    icon: Calendar,
    color: "text-chart-3",
  },
  {
    id: 4,
    type: "goal",
    title: "Meta atualizada",
    description: "Sprint Q1 - 75% concluido",
    time: "ha 1h",
    icon: Target,
    color: "text-chart-4",
  },
  {
    id: 5,
    type: "team",
    title: "Novo membro",
    description: "Marina entrou no squad Frontend",
    time: "ha 2h",
    icon: Users,
    color: "text-chart-5",
  },
]

export function RecentActivity() {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-white/5">
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Ultimas atualizacoes do seu workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarFallback className="bg-muted">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
