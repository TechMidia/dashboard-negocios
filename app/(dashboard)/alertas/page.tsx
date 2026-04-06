"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertBadge, AlertLevel } from "@/components/os/alert-badge"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  BellOff,
  Check,
  Clock,
  ExternalLink,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Alert {
  id: number
  level: AlertLevel
  title: string
  description: string
  ceo?: "techmidia" | "doncarmo" | "vida" | "sistema"
  timestamp: string
  action?: {
    label: string
    href: string
  }
  dismissed?: boolean
}

const ceoColors = {
  techmidia: "bg-ceo-techmidia",
  doncarmo: "bg-ceo-doncarmo",
  vida: "bg-ceo-vida",
  sistema: "bg-accent",
}

const ceoLabels = {
  techmidia: "TechMidia",
  doncarmo: "Don Carmo",
  vida: "Vida",
  sistema: "Sistema",
}

// Mock alerts
const alerts: Alert[] = [
  {
    id: 1,
    level: "critical",
    title: "Fatura vencida - Cliente Y",
    description: "Fatura de R$3.500,00 venceu ha 3 dias. Necessario acao imediata.",
    ceo: "techmidia",
    timestamp: "Hoje, 08:00",
    action: { label: "Ver Financeiro", href: "/financeiro" },
  },
  {
    id: 2,
    level: "critical",
    title: "Contrato aguardando assinatura",
    description: "Contrato do Cliente X precisa ser revisado e assinado ate amanha.",
    ceo: "techmidia",
    timestamp: "Hoje, 09:15",
    action: { label: "Ver Contrato", href: "/memoria" },
  },
  {
    id: 3,
    level: "important",
    title: "Reuniao em 2 horas",
    description: "Review semanal com equipe TechMidia as 15:00.",
    ceo: "techmidia",
    timestamp: "Hoje, 13:00",
    action: { label: "Ver Operacao", href: "/operacao" },
  },
  {
    id: 4,
    level: "important",
    title: "Prazo de tarefa proximo",
    description: "Landing page Don Carmo deve ser entregue sexta-feira.",
    ceo: "doncarmo",
    timestamp: "Hoje, 10:30",
    action: { label: "Ver Tarefa", href: "/operacao" },
  },
  {
    id: 5,
    level: "important",
    title: "Backup pendente",
    description: "Backup semanal do sistema esta pendente ha 2 dias.",
    ceo: "sistema",
    timestamp: "Ontem, 20:00",
  },
  {
    id: 6,
    level: "info",
    title: "Nova mensagem no Inbox",
    description: "Voce tem 3 novas mensagens nao lidas.",
    ceo: "sistema",
    timestamp: "Hoje, 12:45",
    action: { label: "Ver Inbox", href: "/inbox" },
  },
  {
    id: 7,
    level: "info",
    title: "Meta de estudos atingida",
    description: "Parabens! Voce completou 2 horas de estudos hoje.",
    ceo: "vida",
    timestamp: "Hoje, 11:00",
  },
  {
    id: 8,
    level: "info",
    title: "Sync concluido",
    description: "Sincronizacao diaria entre CEOs concluida com sucesso.",
    ceo: "sistema",
    timestamp: "Hoje, 08:00",
  },
]

export default function AlertasPage() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])
  const [showDismissed, setShowDismissed] = useState(false)

  const activeAlerts = alerts.filter((a) => !dismissedAlerts.includes(a.id))
  const dismissed = alerts.filter((a) => dismissedAlerts.includes(a.id))

  const criticalAlerts = activeAlerts.filter((a) => a.level === "critical")
  const importantAlerts = activeAlerts.filter((a) => a.level === "important")
  const infoAlerts = activeAlerts.filter((a) => a.level === "info")

  const dismissAlert = (id: number) => {
    setDismissedAlerts((prev) => [...prev, id])
  }

  const restoreAlert = (id: number) => {
    setDismissedAlerts((prev) => prev.filter((a) => a !== id))
  }

  const dismissAll = (level: AlertLevel) => {
    const ids = activeAlerts.filter((a) => a.level === level).map((a) => a.id)
    setDismissedAlerts((prev) => [...prev, ...ids])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Alertas
          </h1>
          <p className="text-muted-foreground">
            Notificacoes e alertas do sistema organizados por prioridade
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDismissed(!showDismissed)}
            className="gap-2"
          >
            {showDismissed ? (
              <Bell className="h-4 w-4" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
            {showDismissed ? "Ver Ativos" : `Dispensados (${dismissed.length})`}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-alert-critical/20 bg-alert-critical/5 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-alert-critical">Criticos</p>
                <p className="text-3xl font-bold text-alert-critical">
                  {criticalAlerts.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-alert-critical/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-alert-important/20 bg-alert-important/5 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-alert-important">Importantes</p>
                <p className="text-3xl font-bold text-alert-important">
                  {importantAlerts.length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-alert-important/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-alert-info/20 bg-alert-info/5 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-alert-info">Informativos</p>
                <p className="text-3xl font-bold text-alert-info">
                  {infoAlerts.length}
                </p>
              </div>
              <Info className="h-8 w-8 text-alert-info/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {showDismissed ? (
        /* Dismissed Alerts */
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BellOff className="h-4 w-4" />
              Alertas Dispensados
            </CardTitle>
            {dismissed.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDismissedAlerts([])}
              >
                Restaurar Todos
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {dismissed.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nenhum alerta dispensado
              </p>
            ) : (
              dismissed.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onDismiss={() => restoreAlert(alert.id)}
                  dismissed
                />
              ))
            )}
          </CardContent>
        </Card>
      ) : (
        /* Active Alerts by Level */
        <div className="space-y-6">
          {/* Critical */}
          {criticalAlerts.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-alert-critical" />
                  <h2 className="text-lg font-semibold text-alert-critical">
                    Criticos
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-alert-critical/20 bg-alert-critical/10 text-alert-critical"
                  >
                    {criticalAlerts.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAll("critical")}
                >
                  Dispensar Todos
                </Button>
              </div>
              <div className="space-y-3">
                {criticalAlerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={() => dismissAlert(alert.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Important */}
          {importantAlerts.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-alert-important" />
                  <h2 className="text-lg font-semibold text-alert-important">
                    Importantes
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-alert-important/20 bg-alert-important/10 text-alert-important"
                  >
                    {importantAlerts.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAll("important")}
                >
                  Dispensar Todos
                </Button>
              </div>
              <div className="space-y-3">
                {importantAlerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={() => dismissAlert(alert.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Info */}
          {infoAlerts.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-alert-info" />
                  <h2 className="text-lg font-semibold text-alert-info">
                    Informativos
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-alert-info/20 bg-alert-info/10 text-alert-info"
                  >
                    {infoAlerts.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAll("info")}
                >
                  Dispensar Todos
                </Button>
              </div>
              <div className="space-y-3">
                {infoAlerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={() => dismissAlert(alert.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {activeAlerts.length === 0 && (
            <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Check className="mb-4 h-12 w-12 text-primary" />
                <p className="text-lg font-medium">Tudo em dia!</p>
                <p className="text-sm text-muted-foreground">
                  Nenhum alerta ativo no momento.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function AlertItem({
  alert,
  onDismiss,
  dismissed = false,
}: {
  alert: Alert
  onDismiss: () => void
  dismissed?: boolean
}) {
  return (
    <Card
      className={cn(
        "border-white/5 bg-card/50 backdrop-blur-xl",
        dismissed && "opacity-60"
      )}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <AlertBadge level={alert.level} />
            {alert.ceo && (
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium text-background",
                  ceoColors[alert.ceo]
                )}
              >
                {ceoLabels[alert.ceo]}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {alert.timestamp}
            </span>
          </div>
          <p className="font-medium">{alert.title}</p>
          <p className="text-sm text-muted-foreground">{alert.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {alert.action && !dismissed && (
            <Link href={alert.action.href}>
              <Button size="sm" variant="secondary" className="gap-1">
                {alert.action.label}
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
          >
            {dismissed ? "Restaurar" : "Dispensar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
