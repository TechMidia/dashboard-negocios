"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CEOCard } from "@/components/os/ceo-card"
import { AlertBadge } from "@/components/os/alert-badge"
import { MetricCard } from "@/components/os/metric-card"
import { TimelineItem } from "@/components/os/timeline-item"
import { StatusIndicator } from "@/components/os/status-indicator"
import { JarvisCoordinator } from "@/components/os/jarvis-coordinator"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
  MessageSquare,
  FileText,
} from "lucide-react"
import Link from "next/link"

// Mock data - in production, this would come from API/database
const ceosData = [
  {
    name: "TechMidia",
    status: "operational" as const,
    colorClass: "bg-ceo-techmidia",
    metrics: [
      { label: "Tarefas", value: 8, trend: "neutral" as const },
      { label: "Completas", value: 5, trend: "up" as const },
      { label: "Receita", value: "R$12.5k", trend: "up" as const },
    ],
    lastAction: "Enviou proposta para cliente X",
    lastActionTime: "Hoje, 14:32",
  },
  {
    name: "Don Carmo",
    status: "setup" as const,
    colorClass: "bg-ceo-doncarmo",
    metrics: [
      { label: "Tarefas", value: 12, trend: "neutral" as const },
      { label: "Completas", value: 3, trend: "up" as const },
      { label: "Setup", value: "45%", trend: "up" as const },
    ],
    lastAction: "Configurando fluxo de cadastro",
    lastActionTime: "Hoje, 13:15",
  },
  {
    name: "Vida Pessoal",
    status: "active" as const,
    colorClass: "bg-ceo-vida",
    metrics: [
      { label: "Saude", value: "Bom", trend: "neutral" as const },
      { label: "Estudos", value: "2h", trend: "up" as const },
      { label: "Saldo", value: "R$5k", trend: "neutral" as const },
    ],
    lastAction: "Completou sessao de estudos",
    lastActionTime: "Hoje, 11:00",
  },
]

const criticalAlerts = [
  {
    id: 1,
    level: "critical" as const,
    title: "Fatura vencendo amanha",
    description: "Cliente ABC - R$3.500,00",
    action: "Ver detalhes",
    href: "/financeiro",
  },
  {
    id: 2,
    level: "important" as const,
    title: "Reuniao em 2 horas",
    description: "Review semanal com equipe TechMidia",
    action: "Ver agenda",
    href: "/operacao",
  },
]

const todayTimeline = [
  {
    time: "08:00",
    title: "Sistema iniciado",
    description: "Todos os CEOs online",
    ceo: "jarvis" as const,
    completed: true,
  },
  {
    time: "09:30",
    title: "Proposta enviada para cliente X",
    ceo: "techmidia" as const,
    completed: true,
  },
  {
    time: "11:00",
    title: "Sessao de estudos completada",
    description: "2 horas de foco",
    ceo: "vida" as const,
    completed: true,
  },
  {
    time: "13:15",
    title: "Configuracao de fluxo iniciada",
    ceo: "doncarmo" as const,
    completed: true,
  },
  {
    time: "15:00",
    title: "Review semanal agendado",
    description: "Pendente",
    ceo: "techmidia" as const,
    completed: false,
  },
]

export default function CentroComandoPage() {
  return (
    <div className="space-y-8">
      {/* Header com status do sistema */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Bem-vindo, Operador
          </h1>
          <p className="text-muted-foreground">
            Visao geral do seu sistema operacional pessoal.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          Ultima sync: agora
        </span>
      </div>

      {/* Jarvis Coordinator - Centro Nevralgico */}
      <section>
        <JarvisCoordinator
          status="coordinating"
          pendingDecisions={3}
          coordinating={["TechMidia", "Don Carmo", "Vida Pessoal"]}
        />
      </section>

      {/* Cards dos CEOs */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Status dos CEOs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ceosData.map((ceo) => (
            <CEOCard key={ceo.name} {...ceo} />
          ))}
        </div>
      </section>

      {/* O que exige atencao agora */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Exige Atencao Agora
          </h2>
          <Link href="/alertas">
            <Button variant="ghost" size="sm" className="gap-1">
              Ver todos <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {criticalAlerts.map((alert) => (
            <Card
              key={alert.id}
              className="border-white/5 bg-card/50 backdrop-blur-xl"
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertBadge level={alert.level} />
                  </div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
                <Link href={alert.href}>
                  <Button size="sm" variant="secondary">
                    {alert.action}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Financeiro Consolidado + Timeline do Dia */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Financeiro Consolidado */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Financeiro Consolidado
            </h2>
            <Link href="/financeiro">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver detalhes <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Receita Mes"
              value="R$18.5k"
              icon={TrendingUp}
              trend="up"
              trendValue="+12%"
              colorClass="text-primary"
            />
            <MetricCard
              label="Despesa Mes"
              value="R$7.2k"
              icon={TrendingDown}
              trend="down"
              trendValue="-5%"
              colorClass="text-alert-critical"
            />
            <MetricCard
              label="Saldo Total"
              value="R$24.3k"
              icon={DollarSign}
              trend="up"
              trendValue="+8%"
              colorClass="text-primary"
            />
          </div>
        </section>

        {/* Timeline do Dia */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Timeline do Dia
            </h2>
            <Link href="/operacao">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver operacao <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
            <CardContent className="p-4">
              {todayTimeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  {...item}
                  isLast={index === todayTimeline.length - 1}
                />
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Acoes Rapidas */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Acoes Rapidas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Link href="/operacao">
            <Button
              variant="secondary"
              className="h-auto w-full justify-start gap-3 bg-card/50 p-4 backdrop-blur-xl hover:bg-card"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Nova Tarefa</p>
                <p className="text-xs text-muted-foreground">
                  Adicionar ao sistema
                </p>
              </div>
            </Button>
          </Link>
          <Link href="/inbox">
            <Button
              variant="secondary"
              className="h-auto w-full justify-start gap-3 bg-card/50 p-4 backdrop-blur-xl hover:bg-card"
            >
              <div className="rounded-lg bg-accent/10 p-2">
                <MessageSquare className="h-4 w-4 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium">Ver Inbox</p>
                <p className="text-xs text-muted-foreground">
                  5 mensagens novas
                </p>
              </div>
            </Button>
          </Link>
          <Link href="/memoria">
            <Button
              variant="secondary"
              className="h-auto w-full justify-start gap-3 bg-card/50 p-4 backdrop-blur-xl hover:bg-card"
            >
              <div className="rounded-lg bg-ceo-techmidia/10 p-2">
                <FileText className="h-4 w-4 text-ceo-techmidia" />
              </div>
              <div className="text-left">
                <p className="font-medium">Memoria</p>
                <p className="text-xs text-muted-foreground">
                  Acessar arquivos
                </p>
              </div>
            </Button>
          </Link>
          <Link href="/agentes">
            <Button
              variant="secondary"
              className="h-auto w-full justify-start gap-3 bg-card/50 p-4 backdrop-blur-xl hover:bg-card"
            >
              <div className="rounded-lg bg-ceo-vida/10 p-2">
                <DollarSign className="h-4 w-4 text-ceo-vida" />
              </div>
              <div className="text-left">
                <p className="font-medium">Agentes</p>
                <p className="text-xs text-muted-foreground">
                  Gerenciar CEOs
                </p>
              </div>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
