"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface MemoryChartProps {
  isLive: boolean
}

export function MemoryChart({ isLive }: MemoryChartProps) {
  const [data, setData] = useState(() => generateInitialData())

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const timestamp = new Date().toLocaleTimeString()
        newData.push({
          time: timestamp,
          used: Math.random() * 1000 + 2500,
          cached: Math.random() * 500 + 1200,
          buffers: Math.random() * 300 + 400,
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
          <CardTitle>Memory Usage Over Time</CardTitle>
          <CardDescription>RAM allocation breakdown (MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
              <XAxis dataKey="time" stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} />
              <YAxis stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "0.5rem",
                  color: "oklch(0.98 0 0)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="used"
                stackId="1"
                stroke="oklch(0.65 0.24 264)"
                fill="oklch(0.65 0.24 264)"
                name="Used"
              />
              <Area
                type="monotone"
                dataKey="cached"
                stackId="1"
                stroke="oklch(0.70 0.17 162)"
                fill="oklch(0.70 0.17 162)"
                name="Cached"
              />
              <Area
                type="monotone"
                dataKey="buffers"
                stackId="1"
                stroke="oklch(0.77 0.19 70)"
                fill="oklch(0.77 0.19 70)"
                name="Buffers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memory Breakdown</CardTitle>
          <CardDescription>Current allocation status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Used Memory</span>
                <span className="text-lg font-bold text-foreground">3.2 GB</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: "40%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Cached</span>
                <span className="text-lg font-bold text-foreground">1.8 GB</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: "22.5%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Buffers</span>
                <span className="text-lg font-bold text-foreground">512 MB</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-3" style={{ width: "6.4%" }} />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available</span>
                <span className="text-lg font-semibold text-foreground">2.5 GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page Faults</CardTitle>
          <CardDescription>Memory page fault statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Minor Faults</p>
              <p className="text-2xl font-bold text-foreground">847/s</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Major Faults</p>
              <p className="text-2xl font-bold text-foreground">12/s</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Swap Usage</p>
              <p className="text-lg font-semibold text-foreground">0 MB</p>
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
      used: Math.random() * 1000 + 2500,
      cached: Math.random() * 500 + 1200,
      buffers: Math.random() * 300 + 400,
    })
  }
  return data
}
