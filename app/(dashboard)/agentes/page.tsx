"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatusIndicator, SystemStatus } from "@/components/os/status-indicator"
import {
  Bot,
  Cpu,
  Activity,
  Zap,
  Settings,
  Power,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CEO {
  id: string
  name: string
  status: SystemStatus
  color: string
  description: string
  metrics: {
    tasksCompleted: number
    tasksTotal: number
    uptime: string
    lastAction: string
    lastActionTime: string
  }
  subagents: Subagent[]
}

interface Subagent {
  id: string
  name: string
  status: SystemStatus
  type: string
  lastActive: string
}

// Mock data
const jarvis = {
  status: "online" as SystemStatus,
  uptime: "7 dias, 14h",
  version: "2.4.1",
  lastSync: "Agora",
  syncCount: 1247,
}

const ceos: CEO[] = [
  {
    id: "techmidia",
    name: "TechMidia CEO",
    status: "online",
    color: "bg-ceo-techmidia",
    description: "Gerencia operacoes de desenvolvimento e vendas de servicos de tecnologia.",
    metrics: {
      tasksCompleted: 5,
      tasksTotal: 8,
      uptime: "7 dias",
      lastAction: "Enviou proposta para Cliente X",
      lastActionTime: "Hoje, 14:32",
    },
    subagents: [
      { id: "t1", name: "Sales Agent", status: "online", type: "Vendas", lastActive: "Agora" },
      { id: "t2", name: "Dev Agent", status: "online", type: "Desenvolvimento", lastActive: "5min atras" },
      { id: "t3", name: "Support Agent", status: "offline", type: "Suporte", lastActive: "2h atras" },
    ],
  },
  {
    id: "doncarmo",
    name: "Don Carmo CEO",
    status: "warning",
    color: "bg-ceo-doncarmo",
    description: "Gerencia a criacao e operacao do novo empreendimento Don Carmo.",
    metrics: {
      tasksCompleted: 3,
      tasksTotal: 12,
      uptime: "3 dias",
      lastAction: "Configurando fluxo de cadastro",
      lastActionTime: "Hoje, 13:15",
    },
    subagents: [
      { id: "d1", name: "Setup Agent", status: "online", type: "Configuracao", lastActive: "Agora" },
      { id: "d2", name: "Marketing Agent", status: "loading", type: "Marketing", lastActive: "Inicializando" },
    ],
  },
  {
    id: "vida",
    name: "Vida Pessoal CEO",
    status: "online",
    color: "bg-ceo-vida",
    description: "Gerencia saude, estudos, financas pessoais e bem-estar.",
    metrics: {
      tasksCompleted: 4,
      tasksTotal: 6,
      uptime: "7 dias",
      lastAction: "Completou sessao de estudos",
      lastActionTime: "Hoje, 11:00",
    },
    subagents: [
      { id: "v1", name: "Health Agent", status: "online", type: "Saude", lastActive: "Agora" },
      { id: "v2", name: "Study Agent", status: "online", type: "Estudos", lastActive: "Agora" },
      { id: "v3", name: "Finance Agent", status: "online", type: "Financas", lastActive: "10min atras" },
    ],
  },
]

const activityLog = [
  { time: "14:32", agent: "TechMidia CEO", action: "Enviou proposta para Cliente X", type: "task" },
  { time: "13:15", agent: "Don Carmo CEO", action: "Configuracao de fluxo iniciada", type: "task" },
  { time: "11:00", agent: "Vida Pessoal CEO", action: "Sessao de estudos completada", type: "task" },
  { time: "10:45", agent: "Jarvis", action: "Sync entre CEOs realizado", type: "system" },
  { time: "09:30", agent: "TechMidia Sales", action: "Lead qualificado adicionado", type: "subagent" },
  { time: "08:00", agent: "Jarvis", action: "Sistema iniciado - Todos CEOs online", type: "system" },
]

export default function AgentesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Agentes
          </h1>
          <p className="text-muted-foreground">
            Gerencie CEOs, subagentes e monitore o sistema Jarvis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Todos
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Jarvis Status */}
      <Card className="relative overflow-hidden border-accent/20 bg-accent/5 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Bot className="h-5 w-5 text-accent" />
            </div>
            <div>
              <span className="text-foreground">Jarvis</span>
              <p className="text-sm font-normal text-muted-foreground">
                Coordenador Central do Sistema
              </p>
            </div>
            <StatusIndicator status={jarvis.status} className="ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Uptime</p>
              <p className="text-lg font-semibold">{jarvis.uptime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Versao</p>
              <p className="text-lg font-semibold">{jarvis.version}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Ultimo Sync</p>
              <p className="text-lg font-semibold">{jarvis.lastSync}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Syncs</p>
              <p className="text-lg font-semibold">{jarvis.syncCount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CEOs Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">CEOs</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {ceos.map((ceo) => (
            <Card
              key={ceo.id}
              className="relative overflow-hidden border-white/5 bg-card/50 backdrop-blur-xl"
            >
              <div className={cn("absolute inset-x-0 top-0 h-1", ceo.color)} />
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Cpu className={cn("h-5 w-5", `text-${ceo.id === 'techmidia' ? 'ceo-techmidia' : ceo.id === 'doncarmo' ? 'ceo-doncarmo' : 'ceo-vida'}`)} />
                    {ceo.name}
                  </div>
                  <StatusIndicator status={ceo.status} showLabel={false} />
                </CardTitle>
                <p className="text-xs text-muted-foreground">{ceo.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Tarefas Completas</span>
                    <span className="font-medium">
                      {ceo.metrics.tasksCompleted}/{ceo.metrics.tasksTotal}
                    </span>
                  </div>
                  <Progress
                    value={(ceo.metrics.tasksCompleted / ceo.metrics.tasksTotal) * 100}
                    className="h-2"
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">Uptime</p>
                    <p className="text-sm font-medium">{ceo.metrics.uptime}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">Subagentes</p>
                    <p className="text-sm font-medium">{ceo.subagents.length} ativos</p>
                  </div>
                </div>

                {/* Last Action */}
                <div className="border-t border-white/5 pt-3">
                  <p className="text-xs text-muted-foreground">Ultima Acao</p>
                  <p className="mt-1 text-sm">{ceo.metrics.lastAction}</p>
                  <p className="text-xs text-muted-foreground">
                    {ceo.metrics.lastActionTime}
                  </p>
                </div>

                {/* Subagents */}
                <div className="border-t border-white/5 pt-3">
                  <p className="mb-2 text-xs text-muted-foreground">Subagentes</p>
                  <div className="space-y-2">
                    {ceo.subagents.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between rounded-md bg-black/20 px-2 py-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <StatusIndicator
                            status={sub.status}
                            showLabel={false}
                            size="sm"
                          />
                          <span className="text-xs font-medium">{sub.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {sub.lastActive}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1 gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Comandar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activity Log */}
      <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4" />
            Log de Atividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLog.map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-md border border-white/5 bg-black/20 p-3"
              >
                <div className="flex-shrink-0">
                  {log.type === "system" ? (
                    <Bot className="h-4 w-4 text-accent" />
                  ) : log.type === "task" ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Zap className="h-4 w-4 text-alert-info" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{log.agent}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {log.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.action}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-muted-foreground">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CEOs Ativos</p>
                <p className="text-xl font-bold">3/3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-alert-info/10 p-2">
                <Zap className="h-4 w-4 text-alert-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Subagentes</p>
                <p className="text-xl font-bold">7/8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tarefas Hoje</p>
                <p className="text-xl font-bold">12/26</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-alert-important/10 p-2">
                <AlertTriangle className="h-4 w-4 text-alert-important" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Alertas</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
