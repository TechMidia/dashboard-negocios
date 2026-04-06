"use client"

import { Plus, TrendingUp, Calendar, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Goal {
  id: number
  title: string
  description: string
  progress: number
  target: string
  deadline: string
  status: "on-track" | "at-risk" | "completed"
  milestones: { title: string; completed: boolean }[]
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Lancamento MVP",
    description: "Entregar a primeira versao do produto para usuarios beta",
    progress: 75,
    target: "100% das features core",
    deadline: "15 Abr 2024",
    status: "on-track",
    milestones: [
      { title: "Design System", completed: true },
      { title: "Autenticacao", completed: true },
      { title: "Dashboard", completed: true },
      { title: "API REST", completed: false },
      { title: "Testes E2E", completed: false },
    ],
  },
  {
    id: 2,
    title: "Aumentar Conversao",
    description: "Melhorar taxa de conversao de visitantes para usuarios",
    progress: 60,
    target: "15% de conversao",
    deadline: "30 Jun 2024",
    status: "on-track",
    milestones: [
      { title: "Analise de funil", completed: true },
      { title: "A/B Testing", completed: true },
      { title: "Otimizar onboarding", completed: false },
      { title: "Campanha de email", completed: false },
    ],
  },
  {
    id: 3,
    title: "Expansao de Time",
    description: "Contratar novos desenvolvedores para o squad",
    progress: 40,
    target: "5 novos membros",
    deadline: "31 Mai 2024",
    status: "at-risk",
    milestones: [
      { title: "Definir perfis", completed: true },
      { title: "Publicar vagas", completed: true },
      { title: "Entrevistas tech", completed: false },
      { title: "Onboarding", completed: false },
    ],
  },
  {
    id: 4,
    title: "Documentacao Completa",
    description: "Criar documentacao tecnica e guias de usuario",
    progress: 100,
    target: "100% de cobertura",
    deadline: "Concluido",
    status: "completed",
    milestones: [
      { title: "Guia de inicio", completed: true },
      { title: "API Reference", completed: true },
      { title: "Tutoriais", completed: true },
      { title: "FAQ", completed: true },
    ],
  },
]

const statusConfig = {
  "on-track": {
    label: "No Prazo",
    color: "bg-primary/20 text-primary border-primary/30",
  },
  "at-risk": {
    label: "Em Risco",
    color: "bg-destructive/20 text-destructive border-destructive/30",
  },
  completed: {
    label: "Concluido",
    color: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
}

function ProgressRing({ progress, size = 80 }: { progress: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{progress}%</span>
      </div>
    </div>
  )
}

export default function MetasPage() {
  const activeGoals = goals.filter((g) => g.status !== "completed")
  const completedGoals = goals.filter((g) => g.status === "completed")

  const overallProgress = Math.round(
    goals.reduce((acc, g) => acc + g.progress, 0) / goals.length
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Metas</h1>
          <p className="text-muted-foreground">
            Acompanhe o progresso dos seus objetivos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso Geral
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ProgressRing progress={overallProgress} />
              <div>
                <p className="text-sm text-muted-foreground">
                  {activeGoals.length} metas ativas
                </p>
                <p className="text-sm text-muted-foreground">
                  {completedGoals.length} concluidas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proximos Prazos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeGoals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="flex items-center justify-between">
                  <span className="text-sm truncate">{goal.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {goal.deadline}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Milestones Pendentes
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.reduce(
                (acc, g) => acc + g.milestones.filter((m) => !m.completed).length,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              de {goals.reduce((acc, g) => acc + g.milestones.length, 0)} total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Metas Ativas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {activeGoals.map((goal) => (
            <Card
              key={goal.id}
              className="bg-card/50 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {goal.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={statusConfig[goal.status].color}
                  >
                    {statusConfig[goal.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Meta</span>
                  <span>{goal.target}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prazo</span>
                  <span>{goal.deadline}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Milestones</span>
                  <div className="space-y-1">
                    {goal.milestones.map((milestone, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            milestone.completed
                              ? "text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                        <span
                          className={
                            milestone.completed ? "" : "text-muted-foreground"
                          }
                        >
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {completedGoals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Metas Concluidas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedGoals.map((goal) => (
              <Card
                key={goal.id}
                className="bg-card/30 backdrop-blur-xl border-white/5 opacity-75"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {goal.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={statusConfig[goal.status].color}
                    >
                      {statusConfig[goal.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Concluido em</span>
                    <span>{goal.deadline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
