'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  User,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react'

export default function GovernancaPage() {
  const agentes = [
    {
      id: 1,
      nome: 'Carlos Mendes',
      cargo: 'Diretor de Operações',
      status: 'ativo',
      nivel_acesso: 'administrador',
      projetos: ['TechMidia', 'Don Carmo'],
      desempenho: 95,
      atividade_recente: 'há 5 minutos',
    },
    {
      id: 2,
      nome: 'Ana Silva',
      cargo: 'Desenvolvedora Senior',
      status: 'ativo',
      nivel_acesso: 'desenvolvedor',
      projetos: ['TechMidia'],
      desempenho: 88,
      atividade_recente: 'há 30 minutos',
    },
    {
      id: 3,
      nome: 'Roberto Ferreira',
      cargo: 'DevOps Engineer',
      status: 'ativo',
      nivel_acesso: 'desenvolvedor',
      projetos: ['TechMidia', 'Vida Pessoal'],
      desempenho: 92,
      atividade_recente: 'há 2 horas',
    },
    {
      id: 4,
      nome: 'Juliana Costa',
      cargo: 'Product Manager',
      status: 'inativo',
      nivel_acesso: 'visualizador',
      projetos: ['Don Carmo'],
      desempenho: 78,
      atividade_recente: 'há 3 dias',
    },
    {
      id: 5,
      nome: 'Marcus Thompson',
      cargo: 'Analista de Segurança',
      status: 'ativo',
      nivel_acesso: 'auditor',
      projetos: ['TechMidia', 'Don Carmo', 'Vida Pessoal'],
      desempenho: 97,
      atividade_recente: 'há 1 hora',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-500/10 text-green-500'
      case 'inativo':
        return 'bg-red-500/10 text-red-500'
      case 'suspenso':
        return 'bg-orange-500/10 text-orange-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getNivelAcessoColor = (nivel: string) => {
    switch (nivel) {
      case 'administrador':
        return 'bg-red-500/10 text-red-500'
      case 'desenvolvedor':
        return 'bg-blue-500/10 text-blue-500'
      case 'auditor':
        return 'bg-purple-500/10 text-purple-500'
      case 'visualizador':
        return 'bg-gray-500/10 text-gray-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getDesempenhoColor = (desempenho: number) => {
    if (desempenho >= 90) return 'text-green-500'
    if (desempenho >= 75) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Governança de Agentes</h1>
        <p className="text-muted-foreground">
          Gerencie usuários, permissões, acessos e políticas de controle do sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usuários Ativos</p>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-green-500 mt-1">1 inativo</p>
            </div>
            <User className="h-8 w-8 text-primary/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Administradores</p>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-foreground mt-1">Acesso total</p>
            </div>
            <Shield className="h-8 w-8 text-red-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alertas de Segurança</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-orange-500 mt-1">Requerem atenção</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500/50" />
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Auditoria</p>
              <p className="text-2xl font-bold">847</p>
              <p className="text-xs text-foreground mt-1">Eventos registrados</p>
            </div>
            <Clock className="h-8 w-8 text-primary/50" />
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Equipe & Permissões</h2>

          <div className="space-y-4">
            {agentes.map((agente) => (
              <div
                key={agente.id}
                className="p-4 rounded-lg border border-white/5 bg-black/20 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{agente.nome}</p>
                        <p className="text-sm text-muted-foreground">{agente.cargo}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(agente.status)}>
                          {agente.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nível Acesso</p>
                        <Badge className={getNivelAcessoColor(agente.nivel_acesso)}>
                          {agente.nivel_acesso}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Desempenho</p>
                        <p className={`font-semibold ${getDesempenhoColor(agente.desempenho)}`}>
                          {agente.desempenho}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Último Acesso</p>
                        <p className="font-semibold text-foreground">{agente.atividade_recente}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Projetos Alocados</p>
                      <div className="flex flex-wrap gap-2">
                        {agente.projetos.map((projeto) => (
                          <Badge
                            key={projeto}
                            variant="outline"
                            className="text-xs"
                          >
                            {projeto}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Gerenciar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-card/50 backdrop-blur-xl border-white/5">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Alertas de Segurança</h2>

          <div className="space-y-3">
            {[
              {
                titulo: 'Múltiplas tentativas de login falhadas',
                descricao: 'Juliana Costa teve 5 tentativas de login falhadas',
                severidade: 'media',
                tempo: 'há 2 horas',
              },
              {
                titulo: 'Acesso de localização incomum',
                descricao: 'Roberto Ferreira acessando de IP diferente',
                severidade: 'baixa',
                tempo: 'há 6 horas',
              },
            ].map((alerta, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5 flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="font-semibold text-orange-500">{alerta.titulo}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alerta.descricao}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {alerta.tempo}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Revisar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
