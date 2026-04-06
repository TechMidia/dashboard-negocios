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

type CEO = "techmidia" | "doncarmo" | "vida" | "all"

interface FinanceData {
  ceo: "techmidia" | "doncarmo" | "vida"
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
  ceo: "techmidia" | "doncarmo" | "vida"
}

const ceoColors = {
  techmidia: { bg: "bg-ceo-techmidia", text: "text-ceo-techmidia" },
  doncarmo: { bg: "bg-ceo-doncarmo", text: "text-ceo-doncarmo" },
  vida: { bg: "bg-ceo-vida", text: "text-ceo-vida" },
}

const ceoLabels = {
  techmidia: "TechMidia",
  doncarmo: "Don Carmo",
  vida: "Vida Pessoal",
}

// Mock data
const financeByDomain: FinanceData[] = [
  {
    ceo: "techmidia",
    receita: 12500,
    despesa: 4200,
    aReceber: 8500,
    aPagar: 2100,
    saldo: 8300,
  },
  {
    ceo: "doncarmo",
    receita: 0,
    despesa: 1800,
    aReceber: 0,
    aPagar: 3500,
    saldo: -1800,
  },
  {
    ceo: "vida",
    receita: 6000,
    despesa: 1200,
    aReceber: 0,
    aPagar: 800,
    saldo: 5000,
  },
]

const fluxoCaixa = [
  { mes: "Jan", techmidia: 8000, doncarmo: -500, vida: 4500 },
  { mes: "Fev", techmidia: 9500, doncarmo: -800, vida: 4800 },
  { mes: "Mar", techmidia: 7800, doncarmo: -1200, vida: 5000 },
  { mes: "Abr", techmidia: 11000, doncarmo: -1500, vida: 4200 },
  { mes: "Mai", techmidia: 10500, doncarmo: -1800, vida: 5200 },
  { mes: "Jun", techmidia: 12500, doncarmo: -1800, vida: 6000 },
]

const contas: Conta[] = [
  {
    id: 1,
    descricao: "Cliente X - Projeto Web",
    valor: 5000,
    tipo: "receber",
    status: "pendente",
    vencimento: "2024-06-20",
    ceo: "techmidia",
  },
  {
    id: 2,
    descricao: "Cliente Y - Manutencao",
    valor: 3500,
    tipo: "receber",
    status: "vencido",
    vencimento: "2024-06-10",
    ceo: "techmidia",
  },
  {
    id: 3,
    descricao: "Servidor AWS",
    valor: 450,
    tipo: "pagar",
    status: "pendente",
    vencimento: "2024-06-15",
    ceo: "techmidia",
  },
  {
    id: 4,
    descricao: "Dominio e Hospedagem",
    valor: 1200,
    tipo: "pagar",
    status: "pendente",
    vencimento: "2024-06-25",
    ceo: "doncarmo",
  },
  {
    id: 5,
    descricao: "Software Contabilidade",
    valor: 350,
    tipo: "pagar",
    status: "pago",
    vencimento: "2024-06-05",
    ceo: "doncarmo",
  },
  {
    id: 6,
    descricao: "Aluguel",
    valor: 800,
    tipo: "pagar",
    status: "pendente",
    vencimento: "2024-06-10",
    ceo: "vida",
  },
]

const statusColors = {
  pendente: "bg-alert-important/10 text-alert-important border-alert-important/20",
  pago: "bg-primary/10 text-primary border-primary/20",
  vencido: "bg-alert-critical/10 text-alert-critical border-alert-critical/20",
}

export default function FinanceiroPage() {
  const [selectedCEO, setSelectedCEO] = useState<CEO>("all")

  const totals = financeByDomain.reduce(
    (acc, d) => ({
      receita: acc.receita + d.receita,
      despesa: acc.despesa + d.despesa,
      aReceber: acc.aReceber + d.aReceber,
      aPagar: acc.aPagar + d.aPagar,
      saldo: acc.saldo + d.saldo,
    }),
    { receita: 0, despesa: 0, aReceber: 0, aPagar: 0, saldo: 0 }
  )

  const filteredContas =
    selectedCEO === "all"
      ? contas
      : contas.filter((c) => c.ceo === selectedCEO)

  const contasAReceber = filteredContas.filter((c) => c.tipo === "receber")
  const contasAPagar = filteredContas.filter((c) => c.tipo === "pagar")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Financeiro
          </h1>
          <p className="text-muted-foreground">
            Visao consolidada e por dominio de receitas, despesas e fluxo de caixa
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Transacao
        </Button>
      </div>

      {/* Totais Consolidados */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Consolidado do Mes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            label="Receita Total"
            value={`R$${(totals.receita / 1000).toFixed(1)}k`}
            icon={TrendingUp}
            trend="up"
            trendValue="+12%"
            colorClass="text-primary"
          />
          <MetricCard
            label="Despesa Total"
            value={`R$${(totals.despesa / 1000).toFixed(1)}k`}
            icon={TrendingDown}
            trend="down"
            trendValue="-5%"
            colorClass="text-alert-critical"
          />
          <MetricCard
            label="A Receber"
            value={`R$${(totals.aReceber / 1000).toFixed(1)}k`}
            icon={ArrowUpRight}
            colorClass="text-alert-info"
          />
          <MetricCard
            label="A Pagar"
            value={`R$${(totals.aPagar / 1000).toFixed(1)}k`}
            icon={ArrowDownRight}
            colorClass="text-alert-important"
          />
          <MetricCard
            label="Saldo Liquido"
            value={`R$${(totals.saldo / 1000).toFixed(1)}k`}
            icon={DollarSign}
            trend="up"
            trendValue="+8%"
            colorClass="text-primary"
          />
        </div>
      </section>

      {/* Cards por Dominio */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Por Dominio
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {financeByDomain.map((domain) => (
            <Card
              key={domain.ceo}
              className="relative overflow-hidden border-white/5 bg-card/50 backdrop-blur-xl"
            >
              <div className={cn("absolute inset-x-0 top-0 h-1", ceoColors[domain.ceo].bg)} />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className={cn("h-2 w-2 rounded-full", ceoColors[domain.ceo].bg)} />
                  {ceoLabels[domain.ceo]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Receita</p>
                    <p className="text-lg font-bold text-primary">
                      R${domain.receita.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Despesa</p>
                    <p className="text-lg font-bold text-alert-critical">
                      R${domain.despesa.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Saldo</span>
                    <span
                      className={cn(
                        "text-lg font-bold",
                        domain.saldo >= 0 ? "text-primary" : "text-alert-critical"
                      )}
                    >
                      R${domain.saldo.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Grafico Fluxo de Caixa */}
      <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Fluxo de Caixa por Dominio</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fluxoCaixa}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="mes" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="techmidia"
                name="TechMidia"
                stroke="var(--color-ceo-techmidia)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="doncarmo"
                name="Don Carmo"
                stroke="var(--color-ceo-doncarmo)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="vida"
                name="Vida"
                stroke="var(--color-ceo-vida)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Contas - Tabs */}
      <Tabs value={selectedCEO} onValueChange={(v) => setSelectedCEO(v as CEO)}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Contas
          </h2>
          <TabsList className="bg-card/50">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="techmidia">TechMidia</TabsTrigger>
            <TabsTrigger value="doncarmo">Don Carmo</TabsTrigger>
            <TabsTrigger value="vida">Vida</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedCEO} className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* A Receber */}
            <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  A Receber
                  <Badge variant="secondary" className="ml-auto">
                    {contasAReceber.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contasAReceber.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma conta a receber
                  </p>
                ) : (
                  contasAReceber.map((conta) => (
                    <ContaItem key={conta.id} conta={conta} />
                  ))
                )}
              </CardContent>
            </Card>

            {/* A Pagar */}
            <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ArrowDownRight className="h-4 w-4 text-alert-important" />
                  A Pagar
                  <Badge variant="secondary" className="ml-auto">
                    {contasAPagar.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contasAPagar.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma conta a pagar
                  </p>
                ) : (
                  contasAPagar.map((conta) => (
                    <ContaItem key={conta.id} conta={conta} />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContaItem({ conta }: { conta: Conta }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
      <div className="flex items-center gap-3">
        <div className={cn("h-2 w-2 rounded-full", ceoColors[conta.ceo].bg)} />
        <div>
          <p className="text-sm font-medium">{conta.descricao}</p>
          <p className="text-xs text-muted-foreground">
            Venc: {conta.vencimento}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold">R${conta.valor.toLocaleString()}</p>
          <Badge
            variant="outline"
            className={cn("text-[10px]", statusColors[conta.status])}
          >
            {conta.status}
          </Badge>
        </div>
        {conta.status === "vencido" && (
          <AlertCircle className="h-4 w-4 text-alert-critical" />
        )}
      </div>
    </div>
  )
}
