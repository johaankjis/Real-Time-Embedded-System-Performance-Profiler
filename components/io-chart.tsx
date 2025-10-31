"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface IOChartProps {
  isLive: boolean
}

export function IOChart({ isLive }: IOChartProps) {
  const [data, setData] = useState(() => generateInitialData())

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const timestamp = new Date().toLocaleTimeString()
        newData.push({
          time: timestamp,
          read: Math.random() * 50 + 60,
          write: Math.random() * 40 + 30,
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
          <CardTitle>I/O Throughput Over Time</CardTitle>
          <CardDescription>Disk read and write operations (MB/s)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey="read"
                stroke="oklch(0.70 0.17 162)"
                strokeWidth={3}
                dot={false}
                name="Read"
              />
              <Line
                type="monotone"
                dataKey="write"
                stroke="oklch(0.65 0.25 16)"
                strokeWidth={3}
                dot={false}
                name="Write"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disk Operations</CardTitle>
          <CardDescription>IOPS and latency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Read IOPS</p>
              <p className="text-2xl font-bold text-foreground">4,287</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Write IOPS</p>
              <p className="text-2xl font-bold text-foreground">2,145</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Average Latency</p>
              <p className="text-lg font-semibold text-foreground">2.4 ms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Queue Depth</CardTitle>
          <CardDescription>I/O request queue status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Queue</span>
                <span className="text-2xl font-bold text-foreground">8</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: "25%" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Peak Queue</p>
                <p className="text-lg font-semibold text-foreground">32</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-lg font-semibold text-foreground">12</p>
              </div>
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
      read: Math.random() * 50 + 60,
      write: Math.random() * 40 + 30,
    })
  }
  return data
}
