"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Seg", tarefas: 8, reunioes: 3 },
  { day: "Ter", tarefas: 12, reunioes: 5 },
  { day: "Qua", tarefas: 6, reunioes: 2 },
  { day: "Qui", tarefas: 15, reunioes: 4 },
  { day: "Sex", tarefas: 10, reunioes: 3 },
  { day: "Sab", tarefas: 4, reunioes: 1 },
  { day: "Dom", tarefas: 2, reunioes: 0 },
]

const chartConfig = {
  tarefas: {
    label: "Tarefas",
    color: "var(--chart-1)",
  },
  reunioes: {
    label: "Reunioes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ActivityChart() {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-white/5">
      <CardHeader>
        <CardTitle>Atividade Semanal</CardTitle>
        <CardDescription>
          Tarefas concluidas e reunioes realizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillTarefas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillReunioes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="reunioes"
              type="monotone"
              fill="url(#fillReunioes)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="tarefas"
              type="monotone"
              fill="url(#fillTarefas)"
              stroke="var(--chart-1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
