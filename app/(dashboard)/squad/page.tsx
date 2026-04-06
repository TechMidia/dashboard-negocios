"use client"

import { Plus, Mail, Phone, MoreHorizontal, Search, Users, Activity, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TeamMember {
  id: number
  name: string
  initials: string
  role: string
  department: string
  email: string
  phone: string
  status: "online" | "away" | "offline"
  tasksCompleted: number
  tasksInProgress: number
  avatar?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Lucas Silva",
    initials: "LS",
    role: "Tech Lead",
    department: "Engenharia",
    email: "lucas@openclaw.io",
    phone: "+55 11 99999-1111",
    status: "online",
    tasksCompleted: 45,
    tasksInProgress: 3,
  },
  {
    id: 2,
    name: "Marina Costa",
    initials: "MC",
    role: "Product Designer",
    department: "Design",
    email: "marina@openclaw.io",
    phone: "+55 11 99999-2222",
    status: "online",
    tasksCompleted: 38,
    tasksInProgress: 5,
  },
  {
    id: 3,
    name: "Pedro Santos",
    initials: "PS",
    role: "Frontend Developer",
    department: "Engenharia",
    email: "pedro@openclaw.io",
    phone: "+55 11 99999-3333",
    status: "away",
    tasksCompleted: 32,
    tasksInProgress: 2,
  },
  {
    id: 4,
    name: "Ana Oliveira",
    initials: "AO",
    role: "Backend Developer",
    department: "Engenharia",
    email: "ana@openclaw.io",
    phone: "+55 11 99999-4444",
    status: "online",
    tasksCompleted: 41,
    tasksInProgress: 4,
  },
  {
    id: 5,
    name: "Carlos Mendes",
    initials: "CM",
    role: "DevOps Engineer",
    department: "Infraestrutura",
    email: "carlos@openclaw.io",
    phone: "+55 11 99999-5555",
    status: "offline",
    tasksCompleted: 28,
    tasksInProgress: 1,
  },
  {
    id: 6,
    name: "Julia Ferreira",
    initials: "JF",
    role: "QA Engineer",
    department: "Qualidade",
    email: "julia@openclaw.io",
    phone: "+55 11 99999-6666",
    status: "online",
    tasksCompleted: 52,
    tasksInProgress: 6,
  },
]

const statusConfig = {
  online: { label: "Online", color: "bg-primary" },
  away: { label: "Ausente", color: "bg-chart-3" },
  offline: { label: "Offline", color: "bg-muted-foreground" },
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-white/10">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card ${
                statusConfig[member.status].color
              }`}
            />
          </div>

          <h3 className="mt-4 font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          <Badge variant="secondary" className="mt-2">
            {member.department}
          </Badge>

          <div className="mt-4 flex w-full justify-center gap-4 text-sm">
            <div className="text-center">
              <p className="font-semibold text-primary">{member.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">Concluidas</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="font-semibold text-chart-3">{member.tasksInProgress}</p>
              <p className="text-xs text-muted-foreground">Em progresso</p>
            </div>
          </div>

          <div className="mt-4 flex w-full gap-2">
            <Button variant="secondary" size="sm" className="flex-1">
              <Mail className="mr-1 h-3 w-3" />
              Email
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar
                </DropdownMenuItem>
                <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                <DropdownMenuItem>Ver tarefas</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Remover do squad
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SquadPage() {
  const onlineMembers = teamMembers.filter((m) => m.status === "online").length
  const totalTasks = teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0)
  const avgTasks = Math.round(totalTasks / teamMembers.length)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Squad</h1>
          <p className="text-muted-foreground">
            Gerencie sua equipe e colaboradores
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Membro
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Membros
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {onlineMembers} online agora
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tarefas Concluidas
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Media de {avgTasks} por membro
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Progresso
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tarefas ativas no momento
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar membros..."
            className="pl-8 bg-muted/50 border-white/5"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
            Todos
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Engenharia
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
            Design
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
            Qualidade
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
