'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function DonCarmoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projetos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Don Carmo</h1>
          <p className="text-muted-foreground">
            Gerenciamento de propriedades imobiliárias - Sistema integrado
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso Geral</p>
              <p className="text-2xl font-bold">45%</p>
              <Progress value={45} className="h-2 mt-2" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Orçamento Restante</p>
              <p className="text-2xl font-bold">R$ 68.750</p>
              <p className="text-xs text-yellow-500 mt-1">45% utilizado</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Prazo</p>
              <p className="text-2xl font-bold">274 dias</p>
              <p className="text-xs text-foreground mt-1">Até 31/12/2024</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Equipe</p>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-foreground mt-1">5/5 alocados</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Módulos do Sistema</h2>
        <div className="space-y-4">
          {[
            { titulo: 'Cadastro de Propriedades', progresso: 100, status: 'completo' },
            { titulo: 'Gerenciamento de Inquilinos', progresso: 70, status: 'em-andamento' },
            { titulo: 'Sistema de Cobranças', progresso: 45, status: 'em-andamento' },
            { titulo: 'Portal do Inquilino', progresso: 30, status: 'em-andamento' },
            { titulo: 'Relatórios Financeiros', progresso: 20, status: 'pendente' },
          ].map((modulo, i) => (
            <div key={i} className="p-4 rounded-lg border border-white/5 bg-black/20">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">{modulo.titulo}</p>
                <Badge className={modulo.status === 'completo' ? 'bg-green-500/10 text-green-500' : modulo.status === 'em-andamento' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}>
                  {modulo.status}
                </Badge>
              </div>
              <Progress value={modulo.progresso} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Questões Pendentes</h2>
        <div className="space-y-3">
          {[
            { descricao: 'Definir fluxo de cobranças com juros', prioridade: 'alta' },
            { descricao: 'Validação de documentos de inquilinos', prioridade: 'media' },
            { descricao: 'Integração com sistema bancário', prioridade: 'alta' },
            { descricao: 'Design do portal do inquilino', prioridade: 'media' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/20">
              <AlertCircle className={`h-4 w-4 mt-1 flex-shrink-0 ${item.prioridade === 'alta' ? 'text-red-500' : 'text-yellow-500'}`} />
              <div className="flex-1">
                <p className="text-foreground">{item.descricao}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prioridade: {item.prioridade}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
