"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TaskStatus = "todo" | "in-progress" | "done"

interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: "alta" | "media" | "baixa"
  assignee: string
  dueDate: string
  tags: string[]
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Revisar documentacao da API",
    description: "Atualizar endpoints e exemplos de uso",
    status: "todo",
    priority: "alta",
    assignee: "LS",
    dueDate: "Hoje",
    tags: ["documentacao", "api"],
  },
  {
    id: 2,
    title: "Implementar autenticacao OAuth",
    description: "Integrar login com Google e GitHub",
    status: "in-progress",
    priority: "alta",
    assignee: "MC",
    dueDate: "Amanha",
    tags: ["backend", "seguranca"],
  },
  {
    id: 3,
    title: "Criar componentes do design system",
    description: "Desenvolver botoes, inputs e cards",
    status: "in-progress",
    priority: "media",
    assignee: "PS",
    dueDate: "Esta semana",
    tags: ["frontend", "design"],
  },
  {
    id: 4,
    title: "Configurar CI/CD",
    description: "Setup do pipeline de deploy automatizado",
    status: "todo",
    priority: "media",
    assignee: "AO",
    dueDate: "Proxima semana",
    tags: ["devops", "infra"],
  },
  {
    id: 5,
    title: "Testes de integracao",
    description: "Escrever testes para os principais fluxos",
    status: "done",
    priority: "baixa",
    assignee: "CM",
    dueDate: "Concluido",
    tags: ["testes", "qa"],
  },
  {
    id: 6,
    title: "Otimizar queries do banco",
    description: "Melhorar performance das consultas principais",
    status: "done",
    priority: "media",
    assignee: "LS",
    dueDate: "Concluido",
    tags: ["backend", "performance"],
  },
]

const priorityConfig = {
  alta: {
    color: "bg-destructive/20 text-destructive border-destructive/30",
    icon: AlertCircle,
  },
  media: {
    color: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    icon: Clock,
  },
  baixa: {
    color: "bg-muted text-muted-foreground border-border",
    icon: Circle,
  },
}

const statusConfig = {
  todo: { label: "A Fazer", icon: Circle, color: "text-muted-foreground" },
  "in-progress": { label: "Em Progresso", icon: Clock, color: "text-chart-3" },
  done: { label: "Concluido", icon: CheckCircle2, color: "text-primary" },
}

function TaskCard({ task }: { task: Task }) {
  const [checked, setChecked] = useState(task.status === "done")
  const StatusIcon = statusConfig[task.status].icon

  return (
    <div
      className={`p-4 rounded-lg bg-muted/30 border border-white/5 hover:border-white/10 transition-all ${
        checked ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(!!value)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-medium ${
                checked ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>Mover para...</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge
              variant="outline"
              className={priorityConfig[task.priority].color}
            >
              {task.priority}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <StatusIcon
                className={`h-3 w-3 ${statusConfig[task.status].color}`}
              />
              <span>{task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Avatar className="h-6 w-6 border border-white/10">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {task.assignee}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TarefasPage() {
  const [tasks] = useState(initialTasks)

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe suas tarefas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-8 bg-muted/50 border-white/5"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 border border-white/5">
          <TabsTrigger value="all">Todas ({tasks.length})</TabsTrigger>
          <TabsTrigger value="todo">A Fazer ({todoTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">
            Em Progresso ({inProgressTasks.length})
          </TabsTrigger>
          <TabsTrigger value="done">Concluidas ({doneTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">A Fazer</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {todoTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {todoTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-chart-3" />
                  <CardTitle className="text-base">Em Progresso</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {inProgressTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Concluidas</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {doneTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {doneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="todo" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-xl border-white/5">
            <CardHeader>
              <CardTitle>Tarefas a Fazer</CardTitle>
              <CardDescription>
                {todoTasks.length} tarefas aguardando inicio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-xl border-white/5">
            <CardHeader>
              <CardTitle>Tarefas em Progresso</CardTitle>
              <CardDescription>
                {inProgressTasks.length} tarefas em andamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="done" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-xl border-white/5">
            <CardHeader>
              <CardTitle>Tarefas Concluidas</CardTitle>
              <CardDescription>
                {doneTasks.length} tarefas finalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {doneTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
