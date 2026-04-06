"use client"

import { useState } from "react"
import { Search, Star, Archive, Trash2, MoreHorizontal, Mail, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const messages = [
  {
    id: 1,
    from: "Lucas Silva",
    initials: "LS",
    subject: "Atualizacao do Sprint Q1",
    preview: "Oi! Acabei de finalizar a revisao dos documentos e gostaria de agendar uma reuniao para discutirmos...",
    time: "10:45",
    unread: true,
    starred: true,
    priority: "alta",
  },
  {
    id: 2,
    from: "Marina Costa",
    initials: "MC",
    subject: "Novo design do dashboard",
    preview: "Segue em anexo os mockups atualizados do dashboard. Fiz algumas alteracoes baseadas no feedback...",
    time: "09:30",
    unread: true,
    starred: false,
    priority: "media",
  },
  {
    id: 3,
    from: "Pedro Santos",
    initials: "PS",
    subject: "Re: Integracao API",
    preview: "Perfeito! A integracao esta funcionando corretamente. Podemos fazer o deploy para staging...",
    time: "Ontem",
    unread: false,
    starred: false,
    priority: "baixa",
  },
  {
    id: 4,
    from: "Ana Oliveira",
    initials: "AO",
    subject: "Convite: Daily Standup",
    preview: "Voce foi convidado para participar da daily standup as 09:00. Clique para confirmar presenca...",
    time: "Ontem",
    unread: false,
    starred: true,
    priority: "media",
  },
  {
    id: 5,
    from: "Carlos Mendes",
    initials: "CM",
    subject: "Relatorio mensal",
    preview: "Conforme solicitado, segue o relatorio mensal de performance da equipe com os principais KPIs...",
    time: "2 dias",
    unread: false,
    starred: false,
    priority: "baixa",
  },
]

const priorityColors = {
  alta: "bg-destructive/20 text-destructive border-destructive/30",
  media: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  baixa: "bg-muted text-muted-foreground border-border",
}

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1)

  const selected = messages.find((m) => m.id === selectedMessage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Inbox</h1>
        <p className="text-muted-foreground">
          Gerencie suas mensagens e comunicacoes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mensagens..."
                  className="pl-8 bg-muted/50 border-white/5"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`w-full text-left p-4 transition-colors hover:bg-muted/50 ${
                    selectedMessage === message.id ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {message.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-medium truncate ${
                            message.unread ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {message.from}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {message.starred && (
                            <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {message.time}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          message.unread ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {message.preview}
                      </p>
                    </div>
                    {message.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 lg:col-span-3">
          {selected ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border border-white/10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selected.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selected.subject}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>{selected.from}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{selected.time}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant="outline"
                      className={priorityColors[selected.priority as keyof typeof priorityColors]}
                    >
                      {selected.priority}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Star
                        className={`h-4 w-4 ${
                          selected.starred ? "fill-chart-3 text-chart-3" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Marcar como nao lida</DropdownMenuItem>
                        <DropdownMenuItem>Mover para pasta</DropdownMenuItem>
                        <DropdownMenuItem>Criar tarefa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <Separator className="bg-border/50" />
              <CardContent className="pt-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {selected.preview}
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button>Responder</Button>
                  <Button variant="secondary">Encaminhar</Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Selecione uma mensagem para visualizar
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
