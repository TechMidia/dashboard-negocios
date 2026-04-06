"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Folder,
  FolderOpen,
  FileText,
  Search,
  Clock,
  ChevronRight,
  ChevronDown,
  Eye,
  Edit,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FileNode {
  id: string
  name: string
  type: "folder" | "file"
  ceo?: "techmidia" | "doncarmo" | "vida" | "sistema"
  lastModified?: string
  children?: FileNode[]
  content?: string
}

const ceoColors = {
  techmidia: "text-ceo-techmidia",
  doncarmo: "text-ceo-doncarmo",
  vida: "text-ceo-vida",
  sistema: "text-accent",
}

const ceoLabels = {
  techmidia: "TechMidia",
  doncarmo: "Don Carmo",
  vida: "Vida",
  sistema: "Sistema",
}

// Mock file structure
const fileTree: FileNode[] = [
  {
    id: "1",
    name: "TechMidia",
    type: "folder",
    ceo: "techmidia",
    children: [
      {
        id: "1.1",
        name: "Clientes",
        type: "folder",
        children: [
          {
            id: "1.1.1",
            name: "cliente-x-briefing.md",
            type: "file",
            lastModified: "Hoje, 14:32",
            content: "# Cliente X - Briefing\n\n## Objetivo\nDesenvolver landing page para lancamento de produto...",
          },
          {
            id: "1.1.2",
            name: "cliente-y-contrato.md",
            type: "file",
            lastModified: "Ontem",
          },
        ],
      },
      {
        id: "1.2",
        name: "Processos",
        type: "folder",
        children: [
          {
            id: "1.2.1",
            name: "workflow-vendas.md",
            type: "file",
            lastModified: "2 dias atras",
          },
          {
            id: "1.2.2",
            name: "checklist-projeto.md",
            type: "file",
            lastModified: "5 dias atras",
          },
        ],
      },
      {
        id: "1.3",
        name: "notas-reuniao-06-04.md",
        type: "file",
        lastModified: "Hoje, 11:00",
        content: "# Notas Reuniao 06/04\n\n## Participantes\n- Joao\n- Maria\n\n## Pauta\n1. Revisao de projetos\n2. Novos clientes\n3. Proximos passos",
      },
    ],
  },
  {
    id: "2",
    name: "Don Carmo",
    type: "folder",
    ceo: "doncarmo",
    children: [
      {
        id: "2.1",
        name: "Setup",
        type: "folder",
        children: [
          {
            id: "2.1.1",
            name: "roadmap.md",
            type: "file",
            lastModified: "Hoje, 09:15",
            content: "# Roadmap Don Carmo\n\n## Fase 1 - Setup (atual)\n- [x] Definir identidade visual\n- [ ] Landing page\n- [ ] Setup CRM\n\n## Fase 2 - Lancamento\n- [ ] Campanha inicial\n- [ ] Primeiros clientes",
          },
          {
            id: "2.1.2",
            name: "identidade-visual.md",
            type: "file",
            lastModified: "3 dias atras",
          },
        ],
      },
      {
        id: "2.2",
        name: "plano-negocio.md",
        type: "file",
        lastModified: "1 semana atras",
      },
    ],
  },
  {
    id: "3",
    name: "Vida Pessoal",
    type: "folder",
    ceo: "vida",
    children: [
      {
        id: "3.1",
        name: "Saude",
        type: "folder",
        children: [
          {
            id: "3.1.1",
            name: "rotina-exercicios.md",
            type: "file",
            lastModified: "2 dias atras",
          },
          {
            id: "3.1.2",
            name: "metas-saude-2024.md",
            type: "file",
            lastModified: "1 mes atras",
          },
        ],
      },
      {
        id: "3.2",
        name: "Estudos",
        type: "folder",
        children: [
          {
            id: "3.2.1",
            name: "notas-curso-react.md",
            type: "file",
            lastModified: "Hoje, 11:00",
            content: "# Curso React Avancado\n\n## Modulo 3 - Server Components\n\nServer Components renderizam no servidor...\n\n### Vantagens\n- Menor bundle size\n- Acesso direto ao banco\n- Melhor SEO",
          },
        ],
      },
      {
        id: "3.3",
        name: "diario-06-04.md",
        type: "file",
        lastModified: "Hoje, 22:00",
      },
    ],
  },
  {
    id: "4",
    name: "Sistema",
    type: "folder",
    ceo: "sistema",
    children: [
      {
        id: "4.1",
        name: "configuracoes.md",
        type: "file",
        lastModified: "1 semana atras",
      },
      {
        id: "4.2",
        name: "regras-jarvis.md",
        type: "file",
        lastModified: "2 semanas atras",
        content: "# Regras do Jarvis\n\n## Principios\n1. Sempre priorizar alertas criticos\n2. Manter CEOs sincronizados\n3. Respeitar horarios de foco\n\n## Automacoes\n- Sync diario as 8h\n- Relatorio semanal segunda-feira",
      },
    ],
  },
]

const recentFiles = [
  { name: "cliente-x-briefing.md", ceo: "techmidia" as const, time: "Hoje, 14:32" },
  { name: "notas-curso-react.md", ceo: "vida" as const, time: "Hoje, 11:00" },
  { name: "notas-reuniao-06-04.md", ceo: "techmidia" as const, time: "Hoje, 11:00" },
  { name: "roadmap.md", ceo: "doncarmo" as const, time: "Hoje, 09:15" },
  { name: "diario-06-04.md", ceo: "vida" as const, time: "Hoje, 22:00" },
]

export default function MemoriaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["1", "2", "3", "4"])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const selectFile = (node: FileNode) => {
    if (node.type === "file") {
      setSelectedFile(node)
    }
  }

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.includes(node.id)
    const isSelected = selectedFile?.id === node.id

    return (
      <div key={node.id}>
        <button
          onClick={() => node.type === "folder" ? toggleFolder(node.id) : selectFile(node)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5",
            isSelected && "bg-white/10",
            depth > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {isExpanded ? (
                <FolderOpen className={cn("h-4 w-4", node.ceo && ceoColors[node.ceo])} />
              ) : (
                <Folder className={cn("h-4 w-4", node.ceo && ceoColors[node.ceo])} />
              )}
            </>
          ) : (
            <>
              <span className="w-4" />
              <FileText className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          <span className="truncate">{node.name}</span>
          {node.lastModified && (
            <span className="ml-auto text-xs text-muted-foreground">
              {node.lastModified}
            </span>
          )}
        </button>
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Memoria
          </h1>
          <p className="text-muted-foreground">
            Acesse e gerencie arquivos e documentos do sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Arquivo
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar arquivos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-card/50 pl-10 backdrop-blur-xl"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tree View */}
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Arquivos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-1">
                {fileTree.map((node) => renderNode(node))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-white/5 bg-card/50 backdrop-blur-xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {selectedFile ? selectedFile.name : "Preview"}
            </CardTitle>
            {selectedFile && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Ver
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedFile ? (
              <ScrollArea className="h-[450px]">
                <div className="prose prose-invert prose-sm max-w-none">
                  {selectedFile.content ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {selectedFile.content}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground">
                      Conteudo do arquivo nao disponivel no preview.
                    </p>
                  )}
                </div>
                {selectedFile.lastModified && (
                  <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Ultima modificacao: {selectedFile.lastModified}
                  </div>
                )}
              </ScrollArea>
            ) : (
              <div className="flex h-[450px] items-center justify-center">
                <p className="text-muted-foreground">
                  Selecione um arquivo para visualizar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Files */}
      <Card className="border-white/5 bg-card/50 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            Arquivos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {recentFiles.map((file, index) => (
              <button
                key={index}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/20 p-3 text-left hover:bg-white/5"
              >
                <FileText className={cn("h-5 w-5", ceoColors[file.ceo])} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.time}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
