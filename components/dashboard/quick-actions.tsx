"use client"

import { Plus, FileText, Calendar, Users, MessageSquare, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const actions = [
  {
    title: "Nova Tarefa",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Criar Nota",
    icon: FileText,
    variant: "secondary" as const,
  },
  {
    title: "Agendar",
    icon: Calendar,
    variant: "secondary" as const,
  },
  {
    title: "Mensagem",
    icon: MessageSquare,
    variant: "secondary" as const,
  },
  {
    title: "Nova Meta",
    icon: Target,
    variant: "secondary" as const,
  },
  {
    title: "Add Membro",
    icon: Users,
    variant: "secondary" as const,
  },
]

export function QuickActions() {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-white/5">
      <CardHeader>
        <CardTitle>Acoes Rapidas</CardTitle>
        <CardDescription>Atalhos para operacoes frequentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto flex-col gap-2 py-4"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
