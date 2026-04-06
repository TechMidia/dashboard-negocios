"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Inbox,
  Zap,
  DollarSign,
  Brain,
  Bell,
  Bot,
  Settings,
  LogOut,
  Grip,
  Circle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  {
    title: "Centro de Comando",
    url: "/centro-comando",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    badge: 5,
  },
  {
    title: "Operacao",
    url: "/operacao",
    icon: Zap,
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: DollarSign,
  },
  {
    title: "Memoria",
    url: "/memoria",
    icon: Brain,
  },
  {
    title: "Alertas",
    url: "/alertas",
    icon: Bell,
    badge: 2,
  },
  {
    title: "Agentes",
    url: "/agentes",
    icon: Bot,
  },
]

const ceoStatus = [
  { name: "TechMidia", status: "operational", color: "bg-ceo-techmidia" },
  { name: "Don Carmo", status: "setup", color: "bg-ceo-doncarmo" },
  { name: "Vida", status: "active", color: "bg-ceo-vida" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/centro-comando">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Grip className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight">OPENCLAW</span>
                  <span className="truncate text-xs text-muted-foreground">Control Center</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegacao</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Status CEOs</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              {ceoStatus.map((ceo) => (
                <div
                  key={ceo.name}
                  className="flex items-center gap-2 rounded-md bg-sidebar-accent/50 px-2 py-1.5"
                >
                  <Circle className={`h-2 w-2 fill-current ${ceo.color} text-transparent`} />
                  <span className="text-xs font-medium">{ceo.name}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground capitalize">
                    {ceo.status}
                  </span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatar.png" alt="Usuario" />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      OC
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Operador</span>
                    <span className="truncate text-xs text-muted-foreground">
                      admin@openclaw.io
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuracoes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
