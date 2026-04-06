"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/os/metric-card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type CEO = "techmidia" | "doncarmo" | "vida"

interface FinanceData {
  ceo: CEO
  receita: number
  despesa: number
  aReceber: number
  aPagar: number
  saldo: number
}

interface Conta {
  id: number
  descricao: string
  valor: number
  tipo: "receber" | "pagar"
  status: "pendente" | "pago" | "vencido"
  vencimento: string
  ceo: CEO
}

const ceoConfig = {
  techmidia: {
    name: "TechMidia",
    bg: "bg-ceo-techmidia",
    text: "text-ceo-techmidia",
    light: "bg-ceo-techmidia/10",
  },
  doncarmo: {
    name: "Don Carmo",
    bg: "bg-ceo-doncarmo",
    text: "text-ceo-doncarmo",
    light: "bg-ceo-doncarmo/10",
  },
  vida: {
    name: "Vida Pessoal",
    bg: "bg-ceo-vida",
    text: "text-ceo-vida",
    light: "bg-ceo-vida/10",
  },
}

// Mock data financeiro por CEO
const financeDataByCEO: FinanceData[] = [
  {
    ceo: "techmidia",
    receita: 12500,
    despesa: 3200,
    aReceber: 8500,
    aPagar: 1200,
    saldo: 16600,
  },
  {
    ceo: "doncarmo",
    receita: 4200,
    despesa: 2100,
    aReceber: 3500,
    aPagar: 800,
    saldo: 4800,
  },
  {
    ceo: "vida",
    receita: 1800,
    despesa: 1500,
    aReceber: 0,
    aPagar: 200,
    saldo: 3100,
  },
]

// Dados para graficos
const monthlyChartData = [
  { mes: "Jan", techmidia: 8000, doncarmo: 2000, vida: 1200 },
  { mes: "Fev", techmidia: 9500, doncarmo: 2500, vida: 1400 },
  { mes: "Mar", techmidia: 11000, doncarmo: 3500, vida: 1600 },
  { mes: "Abr", techmidia: 12500, doncarmo: 4200, vida: 1800 },
]

const contas: Conta[] = [
  {
    id: 1,
    descricao: "Cliente ABC - Proposta Abril",
    valor: 5500,
    tipo: "receber",
    status: "pendente",
    vencimento: "2026-04-10",
    ceo: "techmidia",
  },
  {
    id: 2,
    descricao: "Cliente XYZ - Servicos Prestados",
    valor: 3000,
    tipo: "receber",
    status: "pago",
    vencimento: "2026-04-01",
    ceo: "techmidia",
  },
  {
    id: 3,
    descricao: "Fornecedor - Materias Primas",
    valor: 1200,
    tipo: "pagar",
    status: "vencido",
    vencimento: "2026-04-05",
    ceo: "doncarmo",
  },
  {
    id: 4,
    descricao: "Provedor Internet - Mensal",
    valor: 450,
    tipo: "pagar",
    status: "pendente",
    vencimento: "2026-04-15",
    ceo: "techmidia",
  },
  {
    id: 5,
    descricao: "Salao - Servicos",
    valor: 150,
    tipo: "pagar",
    status: "pago",
    vencimento: "2026-04-03",
    ceo: "vida",
  },
  {
    id: 6,
    descricao: "Parceria comercial",
    valor: 2000,
    tipo: "receber",
    status: "pendente",
    vencimento: "2026-04-20",
    ceo: "doncarmo",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "pago":
      return "bg-primary/10 text-primary"
    case "pendente":
      return "bg-alert-important/10 text-alert-important"
    case "vencido":
      return "bg-alert-critical/10 text-alert-critical"
    default:
      return "bg-muted text-muted-foreground"
  }
}

interface ConsolidadoMetrics {
  totalReceita: number
  totalDespesa: number
  totalSaldo: number
  aReceber: number
  aPagar: number
}

function calculateConsolidado(): ConsolidadoMetrics {
  return financeDataByCEO.reduce(
    (acc, data) => ({
      totalReceita: acc.totalReceita + data.receita,
      totalDespesa: acc.totalDespesa + data.despesa,
      totalSaldo: acc.totalSaldo + data.saldo,
      aReceber: acc.aReceber + data.aReceber,
      aPagar: acc.aPagar + data.aPagar,
    }),
    { totalReceita: 0, totalDespesa: 0, totalSaldo: 0, aReceber: 0, aPagar: 0 }
  )
}

export default function FinanceiroPage() {
  const consolidado = calculateConsolidado()
  const [selectedCEO, setSelectedCEO] = useState<CEO | "all">("all")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Financeiro
          </h1>
          <p className="text-muted-foreground">
            Visao consolidada e detalhes por dominio.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Conta
        </Button>
      </div>

      {/* Visao Consolidada */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Visao Consolidada
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            label="Receita Total"
            value={`R$${(consolidado.totalReceita / 1000).toFixed(1)}k`}
            icon={TrendingUp}
            trend="up"
            trendValue="+12%"
            colorClass="text-primary"
          />
          <MetricCard
            label="Despesa Total"
            value={`R$${(consolidado.totalDespesa / 1000).toFixed(1)}k`}
            icon={TrendingDown}
            trend="down"
            trendValue="-5%"
            colorClass="text-alert-critical"
          />
          <MetricCard
            label="Saldo Total"
            value={`R$${(consolidado.totalSaldo / 1000).toFixed(1)}k`}
            icon={DollarSign}
            trend="up"
            trendValue="+8%"
            colorClass="text-primary"
          />
          <MetricCard
            label="A Receber"
            value={`R$${(consolidado.aReceber / 1000).toFixed(1)}k`}
            icon={ArrowUpRight}
            trend="up"
            trendValue="+3 contas"
            colorClass="text-alert-info"
          />
          <MetricCard
            label="A Pagar"
            value={`R$${(consolidado.aPagar / 1000).toFixed(1)}k`}
            icon={ArrowDownRight}
            trend="down"
            trendValue="+1 vencido"
            colorClass="text-alert-critical"
          />
        </div>
      </section>

      {/* Graficos */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Receita por Dominio */}
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="mes" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip />
                <Bar dataKey="techmidia" fill="var(--color-ceo-techmidia)" />
                <Bar dataKey="doncarmo" fill="var(--color-ceo-doncarmo)" />
                <Bar dataKey="vida" fill="var(--color-ceo-vida)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuicao por Dominio */}
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base">Saldo por Dominio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={financeDataByCEO.map((d) => ({
                    name: ceoConfig[d.ceo].name,
                    value: d.saldo,
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: R$${(value / 1000).toFixed(1)}k`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="var(--color-ceo-techmidia)" />
                  <Cell fill="var(--color-ceo-doncarmo)" />
                  <Cell fill="var(--color-ceo-vida)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Paineis por Dominio */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start bg-card/50 backdrop-blur-xl border-b border-white/5">
          <TabsTrigger value="all" onClick={() => setSelectedCEO("all")}>
            Todos os Dominios
          </TabsTrigger>
          {(Object.keys(ceoConfig) as CEO[]).map((ceo) => (
            <TabsTrigger
              key={ceo}
              value={ceo}
              onClick={() => setSelectedCEO(ceo)}
              className={cn("capitalize")}
            >
              {ceoConfig[ceo].name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Todos */}
        <TabsContent value="all" className="space-y-6">
          {(Object.keys(ceoConfig) as CEO[]).map((ceo) => {
            const data = financeDataByCEO.find((d) => d.ceo === ceo)!
            const ceConfig = ceoConfig[ceo]
            const contasCEO = contas.filter((c) => c.ceo === ceo)
            const aReceber = contasCEO.filter((c) => c.tipo === "receber")
            const aPagar = contasCEO.filter((c) => c.tipo === "pagar")

            return (
              <section key={ceo} className="space-y-4 p-4 rounded-lg border border-white/5 bg-card/30 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className={cn("h-3 w-3 rounded-full", ceConfig.bg)}></div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {ceConfig.name}
                  </h3>
                </div>

                {/* Metricas do Dominio */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="rounded-lg bg-card/50 p-3">
                    <span className="text-xs text-muted-foreground">Receita</span>
                    <p className="text-xl font-bold text-primary">
                      R${(data.receita / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/50 p-3">
                    <span className="text-xs text-muted-foreground">Despesa</span>
                    <p className="text-xl font-bold text-alert-critical">
                      R${(data.despesa / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/50 p-3">
                    <span className="text-xs text-muted-foreground">Saldo</span>
                    <p className="text-xl font-bold">
                      R${(data.saldo / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/50 p-3">
                    <span className="text-xs text-muted-foreground">A Receber</span>
                    <p className="text-xl font-bold text-alert-info">
                      R${(data.aReceber / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/50 p-3">
                    <span className="text-xs text-muted-foreground">A Pagar</span>
                    <p className="text-xl font-bold text-alert-critical">
                      R${(data.aPagar / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>

                {/* Contas A Receber */}
                {aReceber.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">A Receber</h4>
                    <div className="space-y-2">
                      {aReceber.map((conta) => (
                        <div
                          key={conta.id}
                          className="flex items-center justify-between rounded-lg bg-card/50 p-3 text-sm"
                        >
                          <div>
                            <p className="font-medium">{conta.descricao}</p>
                            <p className="text-xs text-muted-foreground">
                              Venc: {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">R${conta.valor.toLocaleString("pt-BR")}</p>
                            <Badge className={getStatusColor(conta.status)}>
                              {conta.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contas A Pagar */}
                {aPagar.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">A Pagar</h4>
                    <div className="space-y-2">
                      {aPagar.map((conta) => (
                        <div
                          key={conta.id}
                          className="flex items-center justify-between rounded-lg bg-card/50 p-3 text-sm"
                        >
                          <div>
                            <p className="font-medium">{conta.descricao}</p>
                            <p className="text-xs text-muted-foreground">
                              Venc: {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">R${conta.valor.toLocaleString("pt-BR")}</p>
                            <Badge className={getStatusColor(conta.status)}>
                              {conta.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )
          })}
        </TabsContent>

        {/* Por Dominio - Tabs dinamicas */}
        {(Object.keys(ceoConfig) as CEO[]).map((ceo) => {
          const data = financeDataByCEO.find((d) => d.ceo === ceo)!
          const ceConfig = ceoConfig[ceo]
          const contasCEO = contas.filter((c) => c.ceo === ceo)
          const aReceber = contasCEO.filter((c) => c.tipo === "receber")
          const aPagar = contasCEO.filter((c) => c.tipo === "pagar")

          return (
            <TabsContent key={ceo} value={ceo} className="space-y-4">
              {/* Metricas do Dominio */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-lg bg-card/50 p-3">
                  <span className="text-xs text-muted-foreground">Receita</span>
                  <p className="text-xl font-bold text-primary">
                    R${(data.receita / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="rounded-lg bg-card/50 p-3">
                  <span className="text-xs text-muted-foreground">Despesa</span>
                  <p className="text-xl font-bold text-alert-critical">
                    R${(data.despesa / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="rounded-lg bg-card/50 p-3">
                  <span className="text-xs text-muted-foreground">Saldo</span>
                  <p className="text-xl font-bold">
                    R${(data.saldo / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="rounded-lg bg-card/50 p-3">
                  <span className="text-xs text-muted-foreground">A Receber</span>
                  <p className="text-xl font-bold text-alert-info">
                    R${(data.aReceber / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="rounded-lg bg-card/50 p-3">
                  <span className="text-xs text-muted-foreground">A Pagar</span>
                  <p className="text-xl font-bold text-alert-critical">
                    R${(data.aPagar / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>

              {/* Contas A Receber */}
              {aReceber.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">A Receber</h4>
                  <div className="space-y-2">
                    {aReceber.map((conta) => (
                      <div
                        key={conta.id}
                        className="flex items-center justify-between rounded-lg bg-card/50 p-3 text-sm"
                      >
                        <div>
                          <p className="font-medium">{conta.descricao}</p>
                          <p className="text-xs text-muted-foreground">
                            Venc: {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">R${conta.valor.toLocaleString("pt-BR")}</p>
                          <Badge className={getStatusColor(conta.status)}>
                            {conta.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contas A Pagar */}
              {aPagar.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">A Pagar</h4>
                  <div className="space-y-2">
                    {aPagar.map((conta) => (
                      <div
                        key={conta.id}
                        className="flex items-center justify-between rounded-lg bg-card/50 p-3 text-sm"
                      >
                        <div>
                          <p className="font-medium">{conta.descricao}</p>
                          <p className="text-xs text-muted-foreground">
                            Venc: {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">R${conta.valor.toLocaleString("pt-BR")}</p>
                          <Badge className={getStatusColor(conta.status)}>
                            {conta.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
