'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'

export default function FinanceiroPage() {
  const dadosReceita = [
    { mes: 'Jan', receita: 45000, despesa: 32000 },
    { mes: 'Fev', receita: 52000, despesa: 35000 },
    { mes: 'Mar', receita: 48000, despesa: 33000 },
    { mes: 'Abr', receita: 61000, despesa: 38000 },
    { mes: 'Mai', receita: 55000, despesa: 36000 },
    { mes: 'Jun', receita: 67000, despesa: 40000 },
  ]

  const dadosCaixa = [
    { mes: 'Jan', caixa: 13000 },
    { mes: 'Fev', caixa: 17000 },
    { mes: 'Mar', caixa: 15000 },
    { mes: 'Abr', caixa: 23000 },
    { mes: 'Mai', caixa: 19000 },
    { mes: 'Jun', caixa: 27000 },
  ]

  const distribuicaoDespesas = [
    { name: 'Pessoal', value: 45, color: '#00bcd4' },
    { name: 'Infraestrutura', value: 30, color: '#a855f7' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Outros', value: 10, color: '#6366f1' },
  ]

  const contas = [
    {
      id: 1,
      descricao: 'Servidores AWS',
      valor: '2.450,00',
      status: 'pago',
      vencimento: '2024-06-15',
      categoria: 'Infraestrutura',
    },
    {
      id: 2,
      descricao: 'Salários Equipe',
      valor: '18.500,00',
      status: 'pendente',
      vencimento: '2024-06-20',
      categoria: 'Pessoal',
    },
    {
      id: 3,
      descricao: 'Licenças de Software',
      valor: '1.200,00',
      status: 'vencido',
      vencimento: '2024-06-10',
      categoria: 'Operacional',
    },
    {
      id: 4,
      descricao: 'Campanha Digital',
      valor: '3.800,00',
      status: 'pendente',
      vencimento: '2024-06-25',
      categoria: 'Marketing',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-500/10 text-green-500'
      case 'pendente':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'vencido':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground">
          Acompanhe receitas, despesas e fluxo de caixa em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita (Jun)</p>
              <p className="text-2xl font-bold">R$ 67.000</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% vs mês anterior
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Despesa (Jun)</p>
              <p className="text-2xl font-bold">R$ 40.000</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +11% vs mês anterior
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lucro Líquido</p>
              <p className="text-2xl font-bold">R$ 27.000</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> Margem 40%
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contas Vencidas</p>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" /> Atenção necessária
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500/50" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Receita vs Despesa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosReceita}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="mes" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="receita" fill="#00bcd4" />
              <Bar dataKey="despesa" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Fluxo de Caixa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosCaixa}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="mes" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="caixa" stroke="#00bcd4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Contas a Pagar</h2>
        <div className="space-y-4">
          {contas.map((conta) => (
            <div
              key={conta.id}
              className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-black/20"
            >
              <div className="flex-1">
                <p className="font-semibold text-foreground">{conta.descricao}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {conta.categoria} • Vencimento: {conta.vencimento}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">R$ {conta.valor}</p>
                  <Badge className={getStatusColor(conta.status)}>
                    {conta.status.charAt(0).toUpperCase() + conta.status.slice(1)}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Ação
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
