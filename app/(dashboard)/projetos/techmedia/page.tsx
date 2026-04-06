'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function TechMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projetos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">TechMidia</h1>
          <p className="text-muted-foreground">
            Plataforma de mídia e conteúdo - Sistema de distribuição digital
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso Geral</p>
              <p className="text-2xl font-bold">65%</p>
              <Progress value={65} className="h-2 mt-2" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Orçamento Restante</p>
              <p className="text-2xl font-bold">R$ 29.750</p>
              <p className="text-xs text-yellow-500 mt-1">65% utilizado</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Prazo</p>
              <p className="text-2xl font-bold">152 dias</p>
              <p className="text-xs text-foreground mt-1">Até 30/09/2024</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Equipe</p>
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs text-foreground mt-1">7/7 alocados</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Milestones</h2>
        <div className="space-y-4">
          {[
            { titulo: 'Estrutura Base', progresso: 100, status: 'completo' },
            { titulo: 'API REST', progresso: 100, status: 'completo' },
            { titulo: 'Frontend Premium', progresso: 80, status: 'em-andamento' },
            { titulo: 'Sistema de Pagamento', progresso: 50, status: 'em-andamento' },
            { titulo: 'Deploy em Produção', progresso: 0, status: 'pendente' },
          ].map((milestone, i) => (
            <div key={i} className="p-4 rounded-lg border border-white/5 bg-black/20">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">{milestone.titulo}</p>
                <Badge className={milestone.status === 'completo' ? 'bg-green-500/10 text-green-500' : milestone.status === 'em-andamento' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}>
                  {milestone.status}
                </Badge>
              </div>
              <Progress value={milestone.progresso} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          {[
            { descricao: 'Integração com CDN finalizada', tempo: 'há 2 horas' },
            { descricao: 'Code review da API completado', tempo: 'há 6 horas' },
            { descricao: 'Deploy para staging', tempo: 'ontem' },
            { descricao: 'Testes de carga iniciados', tempo: '2 dias atrás' },
          ].map((atividade, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
              <Clock className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-foreground">{atividade.descricao}</p>
                <p className="text-xs text-muted-foreground">{atividade.tempo}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
