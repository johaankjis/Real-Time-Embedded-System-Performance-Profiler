"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CPUChartProps {
  isLive: boolean
}

export function CPUChart({ isLive }: CPUChartProps) {
  const [data, setData] = useState(() => generateInitialData())

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const timestamp = new Date().toLocaleTimeString()
        newData.push({
          time: timestamp,
          core0: Math.random() * 40 + 50,
          core1: Math.random() * 40 + 40,
          core2: Math.random() * 40 + 45,
          core3: Math.random() * 40 + 55,
          avg: Math.random() * 20 + 60,
        })
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>CPU Utilization Over Time</CardTitle>
          <CardDescription>Per-core CPU usage with average utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
              <XAxis dataKey="time" stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} />
              <YAxis stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "0.5rem",
                  color: "oklch(0.98 0 0)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="core0"
                stroke="oklch(0.65 0.24 264)"
                strokeWidth={2}
                dot={false}
                name="Core 0"
              />
              <Line
                type="monotone"
                dataKey="core1"
                stroke="oklch(0.70 0.17 162)"
                strokeWidth={2}
                dot={false}
                name="Core 1"
              />
              <Line
                type="monotone"
                dataKey="core2"
                stroke="oklch(0.77 0.19 70)"
                strokeWidth={2}
                dot={false}
                name="Core 2"
              />
              <Line
                type="monotone"
                dataKey="core3"
                stroke="oklch(0.63 0.27 304)"
                strokeWidth={2}
                dot={false}
                name="Core 3"
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="oklch(0.65 0.25 16)"
                strokeWidth={3}
                dot={false}
                name="Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Context Switches</CardTitle>
          <CardDescription>Kernel context switch rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Rate</span>
                <span className="text-2xl font-bold text-foreground">2,847/s</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: "68%" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Peak Rate</p>
                <p className="text-lg font-semibold text-foreground">4,192/s</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-lg font-semibold text-foreground">2,341/s</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cache Performance</CardTitle>
          <CardDescription>L1/L2 cache hit rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">L1 Cache Hit Rate</span>
                <span className="text-lg font-bold text-foreground">94.2%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: "94.2%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">L2 Cache Hit Rate</span>
                <span className="text-lg font-bold text-foreground">87.6%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-3" style={{ width: "87.6%" }} />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Cache Misses</p>
              <p className="text-lg font-semibold text-foreground">1,247/s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function generateInitialData() {
  const data = []
  for (let i = 30; i >= 0; i--) {
    const time = new Date(Date.now() - i * 1000).toLocaleTimeString()
    data.push({
      time,
      core0: Math.random() * 40 + 50,
      core1: Math.random() * 40 + 40,
      core2: Math.random() * 40 + 45,
      core3: Math.random() * 40 + 55,
      avg: Math.random() * 20 + 60,
    })
  }
  return data
}
