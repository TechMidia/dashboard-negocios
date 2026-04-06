"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertBadge } from "@/components/os/alert-badge"
import {
  Circle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Filter,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TaskStatus = "novo" | "em-andamento" | "aguardando" | "bloqueado" | "concluido"
type TaskPriority = "critica" | "alta" | "media" | "baixa"
type CEODomain = "techmidia" | "doncarmo" | "vida"

interface Task {
  id: number
  titulo: string
  descricao?: string
  status: TaskStatus
  prioridade: TaskPriority
  prazo?: string
  tags?: string[]
  completed?: boolean
}

interface DomainTasks {
  domain: CEODomain
  name: string
  color: string
  tasks: Task[]
}

const ceoConfig = {
  techmidia: { name: "TechMidia", color: "bg-ceo-techmidia", textColor: "text-ceo-techmidia" },
  doncarmo: { name: "Don Carmo", color: "bg-ceo-doncarmo", textColor: "text-ceo-doncarmo" },
  vida: { name: "Vida Pessoal", color: "bg-ceo-vida", textColor: "text-ceo-vida" },
}

const statusConfig = {
  novo: { icon: Circle, color: "text-muted-foreground", label: "Novo", bgColor: "bg-muted/10" },
  "em-andamento": { icon: Clock, color: "text-alert-info", label: "Em Andamento", bgColor: "bg-alert-info/10" },
  aguardando: { icon: AlertTriangle, color: "text-alert-important", label: "Aguardando", bgColor: "bg-alert-important/10" },
  bloqueado: { icon: AlertTriangle, color: "text-alert-critical", label: "Bloqueado", bgColor: "bg-alert-critical/10" },
  concluido: { icon: CheckCircle2, color: "text-primary", label: "Concluído", bgColor: "bg-primary/10" },
}

const priorityConfig = {
  critica: { color: "bg-alert-critical/10 text-alert-critical border-alert-critical/20" },
  alta: { color: "bg-alert-important/10 text-alert-important border-alert-important/20" },
  media: { color: "bg-alert-info/10 text-alert-info border-alert-info/20" },
  baixa: { color: "bg-muted text-muted-foreground border-muted" },
}

// Mock data por domínio
const domainTasks: DomainTasks[] = [
  {
    domain: "techmidia",
    name: "TechMidia",
    color: "bg-ceo-techmidia",
    tasks: [
      {
        id: 1,
        titulo: "Proposta para Cliente X",
        descricao: "Preparar apresentacao completa",
        status: "concluido",
        prioridade: "alta",
        prazo: "Hoje",
        completed: true,
      },
      {
        id: 2,
        titulo: "Review de codigo - Backend API",
        descricao: "Validar integracao com pagamento",
        status: "em-andamento",
        prioridade: "alta",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 3,
        titulo: "Reuniao com stakeholders",
        descricao: "Alinhamento de requisitos Q2",
        status: "aguardando",
        prioridade: "media",
        prazo: "Amanha",
        completed: false,
      },
      {
        id: 4,
        titulo: "Bloqueio: Aguardando feedback cliente",
        descricao: "Em espera de retorno email enviado",
        status: "bloqueado",
        prioridade: "critica",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 5,
        titulo: "Atualizar documentacao",
        descricao: "APIs e fluxos de autenticacao",
        status: "novo",
        prioridade: "media",
        prazo: "Proxima semana",
        completed: false,
      },
    ],
  },
  {
    domain: "doncarmo",
    name: "Don Carmo",
    color: "bg-ceo-doncarmo",
    tasks: [
      {
        id: 6,
        titulo: "Estruturar fluxo de cadastro",
        descricao: "Definir campos e validacoes",
        status: "em-andamento",
        prioridade: "critica",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 7,
        titulo: "Pesquisa de mercado",
        descricao: "Analisar competidores principais",
        status: "novo",
        prioridade: "alta",
        prazo: "Esta semana",
        completed: false,
      },
      {
        id: 8,
        titulo: "Contato com fornecedor",
        descricao: "Negociar termos de parceria",
        status: "bloqueado",
        prioridade: "alta",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 9,
        titulo: "Planejamento financeiro",
        descricao: "Projecao de fluxo caixa",
        status: "aguardando",
        prioridade: "media",
        prazo: "Esta semana",
        completed: false,
      },
    ],
  },
  {
    domain: "vida",
    name: "Vida Pessoal",
    color: "bg-ceo-vida",
    tasks: [
      {
        id: 10,
        titulo: "Sessao de estudos",
        descricao: "Completar capitulos 5-7",
        status: "concluido",
        prioridade: "media",
        prazo: "Hoje",
        completed: true,
      },
      {
        id: 11,
        titulo: "Treino de manha",
        descricao: "30min cardio + 20min forca",
        status: "em-andamento",
        prioridade: "media",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 12,
        titulo: "Leitura diaria",
        descricao: "Ler 30 paginas do livro",
        status: "novo",
        prioridade: "baixa",
        prazo: "Hoje",
        completed: false,
      },
      {
        id: 13,
        titulo: "Consulta medica",
        descricao: "Check-up anual agendado",
        status: "aguardando",
        prioridade: "critica",
        prazo: "Proxima semana",
        completed: false,
      },
    ],
  },
]

function TaskCard({
  task,
  domainColor,
}: {
  task: Task
  domainColor: string
}) {
  const statusInfo = statusConfig[task.status]
  const StatusIcon = statusInfo.icon
  const priorityInfo = priorityConfig[task.prioridade]

  return (
    <div
      className={cn(
        "group rounded-lg border border-white/5 bg-card/50 p-3 backdrop-blur-xl transition-all hover:bg-card/70",
        statusInfo.bgColor
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn("font-medium leading-tight", task.completed && "line-through opacity-60")}>
              {task.titulo}
            </h4>
            <StatusIcon className={cn("h-4 w-4 flex-shrink-0", statusInfo.color)} />
          </div>
          {task.descricao && (
            <p className="mt-1 text-xs text-muted-foreground">{task.descricao}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={priorityInfo}>
              {task.prioridade}
            </Badge>
            {task.prazo && (
              <Badge variant="secondary" className="text-xs">
                {task.prazo}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DomainColumn({
  domain,
  name,
  color,
  tasks,
  status,
}: {
  domain: CEODomain
  name: string
  color: string
  tasks: Task[]
  status: TaskStatus
}) {
  const statusInfo = statusConfig[status]
  const StatusIcon = statusInfo.icon
  const statusTasks = tasks.filter((t) => t.status === status)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 rounded-lg bg-card/50 px-3 py-2 backdrop-blur-xl">
        <StatusIcon className={cn("h-4 w-4", statusInfo.color)} />
        <span className="text-sm font-medium">{statusInfo.label}</span>
        <Badge variant="outline" className="ml-auto text-xs">
          {statusTasks.length}
        </Badge>
      </div>
      <div className="space-y-2 min-h-12">
        {statusTasks.map((task) => (
          <TaskCard key={task.id} task={task} domainColor={color} />
        ))}
      </div>
    </div>
  )
}

export default function OperacaoPage() {
  const [selectedDomain, setSelectedDomain] = useState<CEODomain | "all">("all")
  const domainsToShow = selectedDomain === "all" ? domainTasks : domainTasks.filter((d) => d.domain === selectedDomain)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Operacao do Dia
          </h1>
          <p className="text-muted-foreground">
            Visualize tarefas separadas por dominio e status.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filtros por Dominio */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedDomain === "all" ? "default" : "outline"}
          onClick={() => setSelectedDomain("all")}
          size="sm"
        >
          Todos os Dominios
        </Button>
        {domainTasks.map((domain) => (
          <Button
            key={domain.domain}
            variant={selectedDomain === domain.domain ? "default" : "outline"}
            onClick={() => setSelectedDomain(domain.domain)}
            size="sm"
            className={selectedDomain === domain.domain ? domain.color : ""}
          >
            {domain.name}
          </Button>
        ))}
      </div>

      {/* Operacao por Dominio */}
      {domainsToShow.map((domain) => (
        <section key={domain.domain} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn("h-3 w-3 rounded-full", domain.color)}></div>
            <h2 className="text-lg font-semibold tracking-tight">
              {domain.name}
            </h2>
            <Badge variant="secondary" className="ml-auto">
              {domain.tasks.length} tarefas
            </Badge>
          </div>

          {/* Kanban por Status */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {(Object.keys(statusConfig) as TaskStatus[]).map((status) => (
              <DomainColumn
                key={`${domain.domain}-${status}`}
                domain={domain.domain}
                name={domain.name}
                color={domain.color}
                tasks={domain.tasks}
                status={status}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Resumo Total */}
      <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Resumo da Operacao</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {(Object.entries(statusConfig) as [TaskStatus, typeof statusConfig[TaskStatus]][]).map(
              ([status, config]) => {
                const total = domainTasks.reduce(
                  (acc, d) => acc + d.tasks.filter((t) => t.status === status).length,
                  0
                )
                return (
                  <div key={status} className="rounded-lg bg-card/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{config.label}</span>
                      <config.icon className={cn("h-4 w-4", config.color)} />
                    </div>
                    <p className="mt-2 text-2xl font-bold">{total}</p>
                  </div>
                )
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
