"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

const todayEvents = [
  {
    id: 1,
    title: "Daily Standup",
    time: "09:00 - 09:15",
    type: "meeting",
    color: "bg-primary",
    attendees: ["LS", "MC", "PS"],
    location: "Google Meet",
    isVideo: true,
  },
  {
    id: 2,
    title: "Review Sprint Q1",
    time: "10:30 - 11:30",
    type: "meeting",
    color: "bg-accent",
    attendees: ["AO", "CM", "LS", "MC"],
    location: "Sala de Reunioes A",
    isVideo: false,
  },
  {
    id: 3,
    title: "Almoco com Cliente",
    time: "12:30 - 14:00",
    type: "external",
    color: "bg-chart-3",
    attendees: ["CM"],
    location: "Restaurante Central",
    isVideo: false,
  },
  {
    id: 4,
    title: "Workshop: Design System",
    time: "15:00 - 17:00",
    type: "workshop",
    color: "bg-chart-4",
    attendees: ["MC", "PS", "AO"],
    location: "Zoom",
    isVideo: true,
  },
]

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDay = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const days: (number | null)[] = []

  for (let i = 0; i < startingDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i)
  }

  return days
}

export default function AgendaPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const calendarDays = generateCalendarDays(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie seus compromissos e reunioes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {months[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-xs font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  disabled={day === null}
                  onClick={() => day && setSelectedDay(day)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                    ${day === null ? "invisible" : "hover:bg-muted/50"}
                    ${day === selectedDay && !isToday(day) ? "bg-muted" : ""}
                    ${isToday(day) ? "bg-primary text-primary-foreground font-medium" : ""}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 lg:col-span-2">
          <CardHeader>
            <CardTitle>Eventos de Hoje</CardTitle>
            <CardDescription>
              {today.getDate()} de {months[today.getMonth()]} de {today.getFullYear()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className={`w-1 rounded-full ${event.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline" className="shrink-0">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {event.isVideo ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="flex -space-x-2">
                        {event.attendees.map((attendee, i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-card"
                          >
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                              {attendee}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.attendees.length} participantes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
