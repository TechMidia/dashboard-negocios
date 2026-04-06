"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertBadge } from "@/components/os/alert-badge"
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TaskStatus = "pendente" | "em-progresso" | "bloqueado" | "completo"
type TaskPriority = "critica" | "alta" | "media" | "baixa"
type CEO = "techmidia" | "doncarmo" | "vida" | "all"

interface Task {
  id: number
  titulo: string
  descricao?: string
  status: TaskStatus
  prioridade: TaskPriority
  ceo: "techmidia" | "doncarmo" | "vida"
  prazo?: string
  tags?: string[]
}

const ceoColors = {
  techmidia: "bg-ceo-techmidia",
  doncarmo: "bg-ceo-doncarmo",
  vida: "bg-ceo-vida",
}

const ceoLabels = {
  techmidia: "TechMidia",
  doncarmo: "Don Carmo",
  vida: "Vida",
}

const statusConfig = {
  pendente: { icon: Circle, color: "text-muted-foreground", label: "Pendente" },
  "em-progresso": { icon: Clock, color: "text-alert-info", label: "Em Progresso" },
  bloqueado: { icon: AlertTriangle, color: "text-alert-critical", label: "Bloqueado" },
  completo: { icon: CheckCircle2, color: "text-primary", label: "Completo" },
}

const priorityConfig = {
  critica: { color: "bg-alert-critical/10 text-alert-critical border-alert-critical/20" },
  alta: { color: "bg-alert-important/10 text-alert-important border-alert-important/20" },
  media: { color: "bg-alert-info/10 text-alert-info border-alert-info/20" },
  baixa: { color: "bg-muted text-muted-foreground border-muted" },
}

// Mock data
const tasks: Task[] = [
  {
    id: 1,
    titulo: "Finalizar proposta Cliente X",
    descricao: "Incluir nova pricing e escopo revisado",
    status: "em-progresso",
    prioridade: "alta",
    ceo: "techmidia",
    prazo: "Hoje, 18:00",
    tags: ["vendas", "proposta"],
  },
  {
    id: 2,
    titulo: "Configurar automacao de emails",
    status: "pendente",
    prioridade: "media",
    ceo: "techmidia",
    prazo: "Amanha",
    tags: ["automacao"],
  },
  {
    id: 3,
    titulo: "Criar landing page Don Carmo",
    descricao: "Design aprovado, iniciar desenvolvimento",
    status: "pendente",
    prioridade: "alta",
    ceo: "doncarmo",
    prazo: "Sexta-feira",
    tags: ["desenvolvimento"],
  },
  {
    id: 4,
    titulo: "Setup de CRM",
    status: "em-progresso",
    prioridade: "media",
    ceo: "doncarmo",
    prazo: "Esta semana",
    tags: ["setup", "crm"],
  },
  {
    id: 5,
    titulo: "Agendar checkup medico",
    status: "pendente",
    prioridade: "media",
    ceo: "vida",
    prazo: "Esta semana",
    tags: ["saude"],
  },
  {
    id: 6,
    titulo: "Estudar modulo 3 do curso",
    descricao: "React avancado - Server Components",
    status: "em-progresso",
    prioridade: "media",
    ceo: "vida",
    prazo: "Hoje",
    tags: ["estudos"],
  },
  {
    id: 7,
    titulo: "Revisar contrato de servico",
    status: "bloqueado",
    prioridade: "critica",
    ceo: "techmidia",
    prazo: "Ontem",
    tags: ["juridico", "urgente"],
  },
  {
    id: 8,
    titulo: "Organizar documentos pessoais",
    status: "completo",
    prioridade: "baixa",
    ceo: "vida",
    tags: ["organizacao"],
  },
]

export default function OperacaoPage() {
  const [selectedCEO, setSelectedCEO] = useState<CEO>("all")
  const [completedTasks, setCompletedTasks] = useState<number[]>([8])

  const filteredTasks = selectedCEO === "all" 
    ? tasks 
    : tasks.filter(t => t.ceo === selectedCEO)

  const tasksByStatus = {
    pendente: filteredTasks.filter(t => t.status === "pendente"),
    "em-progresso": filteredTasks.filter(t => t.status === "em-progresso"),
    bloqueado: filteredTasks.filter(t => t.status === "bloqueado"),
    completo: filteredTasks.filter(t => t.status === "completo"),
  }

  const toggleComplete = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Operacao do Dia
          </h1>
          <p className="text-muted-foreground">
            Gerencie tarefas por CEO e acompanhe o progresso
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">{tasksByStatus.pendente.length}</p>
              </div>
              <Circle className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Progresso</p>
                <p className="text-2xl font-bold">{tasksByStatus["em-progresso"].length}</p>
              </div>
              <Clock className="h-8 w-8 text-alert-info/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bloqueadas</p>
                <p className="text-2xl font-bold">{tasksByStatus.bloqueado.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-alert-critical/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completas</p>
                <p className="text-2xl font-bold">{tasksByStatus.completo.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs por CEO */}
      <Tabs value={selectedCEO} onValueChange={(v) => setSelectedCEO(v as CEO)}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-card/50">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="techmidia" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-ceo-techmidia" />
              TechMidia
            </TabsTrigger>
            <TabsTrigger value="doncarmo" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-ceo-doncarmo" />
              Don Carmo
            </TabsTrigger>
            <TabsTrigger value="vida" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-ceo-vida" />
              Vida
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <TabsContent value={selectedCEO} className="mt-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Coluna Pendente */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Pendente</h3>
                <Badge variant="secondary" className="ml-auto">
                  {tasksByStatus.pendente.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus.pendente.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isCompleted={completedTasks.includes(task.id)}
                    onToggle={() => toggleComplete(task.id)}
                  />
                ))}
              </div>
            </div>

            {/* Coluna Em Progresso */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-alert-info" />
                <h3 className="font-semibold">Em Progresso</h3>
                <Badge variant="secondary" className="ml-auto">
                  {tasksByStatus["em-progresso"].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus["em-progresso"].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isCompleted={completedTasks.includes(task.id)}
                    onToggle={() => toggleComplete(task.id)}
                  />
                ))}
              </div>
            </div>

            {/* Coluna Bloqueado */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-alert-critical" />
                <h3 className="font-semibold">Bloqueado</h3>
                <Badge variant="secondary" className="ml-auto">
                  {tasksByStatus.bloqueado.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus.bloqueado.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isCompleted={completedTasks.includes(task.id)}
                    onToggle={() => toggleComplete(task.id)}
                  />
                ))}
              </div>
            </div>

            {/* Coluna Completo */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Completo</h3>
                <Badge variant="secondary" className="ml-auto">
                  {tasksByStatus.completo.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus.completo.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isCompleted={true}
                    onToggle={() => toggleComplete(task.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TaskCard({
  task,
  isCompleted,
  onToggle,
}: {
  task: Task
  isCompleted: boolean
  onToggle: () => void
}) {
  return (
    <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={onToggle}
            className="mt-0.5"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  isCompleted && "line-through text-muted-foreground"
                )}
              >
                {task.titulo}
              </p>
              <Badge
                variant="outline"
                className={cn("text-[10px]", priorityConfig[task.prioridade].color)}
              >
                {task.prioridade}
              </Badge>
            </div>
            {task.descricao && (
              <p className="text-xs text-muted-foreground">{task.descricao}</p>
            )}
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium text-background",
                  ceoColors[task.ceo]
                )}
              >
                {ceoLabels[task.ceo]}
              </span>
              {task.prazo && (
                <span className="text-[10px] text-muted-foreground">
                  {task.prazo}
                </span>
              )}
            </div>
            {task.tags && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
