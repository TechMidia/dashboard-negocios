'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function VidaPessoalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projetos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vida Pessoal</h1>
          <p className="text-muted-foreground">
            App de gestão pessoal e produtividade - Gerenciamento de vida pessoal
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso Geral</p>
              <p className="text-2xl font-bold">25%</p>
              <Progress value={25} className="h-2 mt-2" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Orçamento Restante</p>
              <p className="text-2xl font-bold">R$ 36.500</p>
              <p className="text-xs text-green-500 mt-1">19% utilizado</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Prazo</p>
              <p className="text-2xl font-bold">234 dias</p>
              <p className="text-xs text-foreground mt-1">Até 30/11/2024</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Equipe</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-foreground mt-1">3/3 alocados</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Fases do Projeto</h2>
        <div className="space-y-4">
          {[
            { titulo: 'Pesquisa e Planejamento', progresso: 100, status: 'completo' },
            { titulo: 'Design UX/UI', progresso: 60, status: 'em-andamento' },
            { titulo: 'Desenvolvimento Backend', progresso: 20, status: 'em-andamento' },
            { titulo: 'Desenvolvimento Frontend', progresso: 0, status: 'pendente' },
            { titulo: 'Testes e QA', progresso: 0, status: 'pendente' },
          ].map((fase, i) => (
            <div key={i} className="p-4 rounded-lg border border-white/5 bg-black/20">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">{fase.titulo}</p>
                <Badge className={fase.status === 'completo' ? 'bg-green-500/10 text-green-500' : fase.status === 'em-andamento' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}>
                  {fase.status}
                </Badge>
              </div>
              <Progress value={fase.progresso} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Próximas Ações</h2>
        <div className="space-y-3">
          {[
            { descricao: 'Apresentação de protótipos para stakeholders', data: '15/06/2024' },
            { descricao: 'Iniciar desenvolvimento do backend', data: '20/06/2024' },
            { descricao: 'Definir arquitetura de banco de dados', data: '18/06/2024' },
            { descricao: 'Revisar escopo técnico com equipe', data: '17/06/2024' },
          ].map((acao, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/20">
              <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-foreground">{acao.descricao}</p>
                <p className="text-xs text-muted-foreground mt-1">{acao.data}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
