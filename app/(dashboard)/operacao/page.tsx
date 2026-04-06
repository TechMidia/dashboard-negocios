'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
} from 'lucide-react'

export default function OperacaoPage() {
  const operacoes = [
    {
      id: 1,
      titulo: 'Deploy Sistema Principal',
      status: 'em-progresso',
      prioridade: 'alta',
      tempo: '2h 34m',
      responsavel: 'Carlos M.',
      descricao: 'Atualização do core do sistema em produção',
    },
    {
      id: 2,
      titulo: 'Sincronização de Dados',
      status: 'concluida',
      prioridade: 'media',
      tempo: '45m',
      responsavel: 'Ana Silva',
      descricao: 'Sincronização de banco de dados com backup',
    },
    {
      id: 3,
      titulo: 'Investigação de Anomalia',
      status: 'em-andamento',
      prioridade: 'critica',
      tempo: '3h 12m',
      responsavel: 'Roberto F.',
      descricao: 'Investigação de pico de uso de memória',
    },
    {
      id: 4,
      titulo: 'Backup Incremental',
      status: 'agendada',
      prioridade: 'media',
      tempo: 'Começar em 1h',
      responsavel: 'Sistema Automatizado',
      descricao: 'Backup incremental diário dos servidores',
    },
    {
      id: 5,
      titulo: 'Recuperação de Falha',
      status: 'em-andamento',
      prioridade: 'alta',
      tempo: '1h 15m',
      responsavel: 'Time de Infraestrutura',
      descricao: 'Recuperação de falha em servidor secundário',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'em-progresso':
      case 'em-andamento':
        return <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
      case 'critica':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'agendada':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'critica':
        return 'bg-red-500/10 text-red-500'
      case 'alta':
        return 'bg-orange-500/10 text-orange-500'
      case 'media':
        return 'bg-yellow-500/10 text-yellow-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operação do Dia</h1>
        <p className="text-muted-foreground">
          Monitore todas as operações críticas e processos em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Zap className="h-8 w-8 text-blue-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Concluídas</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Críticas</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Total</p>
              <p className="text-2xl font-bold">10h 38m</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500/50" />
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Operações Ativas</h2>

          <div className="space-y-4">
            {operacoes.map((op) => (
              <div
                key={op.id}
                className="flex items-start justify-between p-4 rounded-lg border border-white/5 bg-black/20 hover:bg-white/5 transition-colors"
              >
                <div className="flex gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(op.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{op.titulo}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {op.descricao}
                        </p>
                      </div>
                      <Badge className={getPrioridadeColor(op.prioridade)}>
                        {op.prioridade.charAt(0).toUpperCase() + op.prioridade.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Responsável</p>
                        <p className="text-foreground">{op.responsavel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tempo</p>
                        <p className="text-foreground">{op.tempo}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="text-foreground capitalize">
                          {op.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 flex-shrink-0"
                >
                  Detalhes
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
