'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { ArrowRight, Users, Calendar, DollarSign } from 'lucide-react'

export default function ProjetosPage() {
  const projetos = [
    {
      id: 1,
      nome: 'TechMidia',
      descricao: 'Plataforma de mídia e conteúdo',
      progresso: 65,
      status: 'em-andamento',
      data_inicio: '2024-01-15',
      data_fim: '2024-09-30',
      orcamento: 'R$ 85.000',
      gasto: 'R$ 55.250',
      equipe: 7,
      link: '/projetos/techmedia',
    },
    {
      id: 2,
      nome: 'Don Carmo',
      descricao: 'Gerenciamento de propriedades imobiliárias',
      progresso: 45,
      status: 'em-andamento',
      data_inicio: '2024-03-01',
      data_fim: '2024-12-31',
      orcamento: 'R$ 125.000',
      gasto: 'R$ 56.250',
      equipe: 5,
      link: '/projetos/don-carmo',
    },
    {
      id: 3,
      nome: 'Vida Pessoal',
      descricao: 'App de gestão pessoal e produtividade',
      progresso: 25,
      status: 'planejamento',
      data_inicio: '2024-05-15',
      data_fim: '2024-11-30',
      orcamento: 'R$ 45.000',
      gasto: 'R$ 8.500',
      equipe: 3,
      link: '/projetos/vida-pessoal',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em-andamento':
        return 'bg-blue-500/10 text-blue-500'
      case 'planejamento':
        return 'bg-purple-500/10 text-purple-500'
      case 'concluido':
        return 'bg-green-500/10 text-green-500'
      case 'parado':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const calcularOrcamentoRestante = (orcamento: string, gasto: string) => {
    const orc = parseFloat(orcamento.replace(/[^\d,]/g, '').replace(',', '.'))
    const gst = parseFloat(gasto.replace(/[^\d,]/g, '').replace(',', '.'))
    const restante = orc - gst
    return `R$ ${restante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
        <p className="text-muted-foreground">
          Acompanhe o status, progresso e financeiro de todos os projetos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Projetos Ativos</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investimento Total</p>
              <p className="text-2xl font-bold">R$ 255.000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Equipe Alocada</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {projetos.map((projeto) => (
          <Card
            key={projeto.id}
            className="bg-card/50 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors p-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {projeto.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {projeto.descricao}
                  </p>
                </div>
                <Badge className={getStatusColor(projeto.status)}>
                  {projeto.status.replace('-', ' ')}
                </Badge>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Progresso</p>
                  <p className="text-sm font-semibold">{projeto.progresso}%</p>
                </div>
                <Progress value={projeto.progresso} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data Início</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data Fim</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(projeto.data_fim).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Orçamento</p>
                  <p className="text-sm font-medium text-foreground">
                    {projeto.orcamento}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gasto: {projeto.gasto}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Equipe</p>
                  <p className="text-sm font-medium text-foreground flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {projeto.equipe} pessoas
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-2">
                <Link href={projeto.link} className="flex-1">
                  <Button className="w-full" variant="outline">
                    Ver Detalhes
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
