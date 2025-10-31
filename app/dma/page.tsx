"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, ArrowLeft, Zap, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const dmaChannels = [
  { id: 0, name: "Camera Sensor", status: "active", throughput: 245, utilization: 82 },
  { id: 1, name: "LIDAR Data", status: "active", throughput: 189, utilization: 67 },
  { id: 2, name: "IMU Stream", status: "active", throughput: 12, utilization: 15 },
  { id: 3, name: "Audio Input", status: "idle", throughput: 0, utilization: 0 },
]

export default function DMAPage() {
  const [isLive, setIsLive] = useState(true)
  const [throughputData, setThroughputData] = useState(() => generateInitialData())
  const [channelData, setChannelData] = useState(dmaChannels)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setThroughputData((prevData) => {
        const newData = [...prevData.slice(1)]
        const timestamp = new Date().toLocaleTimeString()
        newData.push({
          time: timestamp,
          total: Math.random() * 100 + 350,
          camera: Math.random() * 50 + 220,
          lidar: Math.random() * 40 + 160,
          imu: Math.random() * 5 + 8,
        })
        return newData
      })

      setChannelData((prev) =>
        prev.map((channel) => ({
          ...channel,
          throughput: channel.status === "active" ? Math.max(0, channel.throughput + (Math.random() - 0.5) * 20) : 0,
          utilization:
            channel.status === "active"
              ? Math.max(0, Math.min(100, channel.utilization + (Math.random() - 0.5) * 10))
              : 0,
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [isLive])

  const totalThroughput = channelData.reduce((sum, ch) => sum + ch.throughput, 0)
  const avgUtilization =
    channelData.filter((ch) => ch.status === "active").reduce((sum, ch) => sum + ch.utilization, 0) /
    channelData.filter((ch) => ch.status === "active").length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">DMA Throughput Monitor</h1>
                  <p className="text-xs text-muted-foreground">Direct memory access performance tracking</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
                <div
                  className={`h-2 w-2 rounded-full ${isLive ? "bg-chart-2 animate-pulse" : "bg-muted-foreground"}`}
                />
                <span className="text-sm font-medium text-secondary-foreground">{isLive ? "Live" : "Paused"}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                {isLive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Throughput</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalThroughput.toFixed(0)} MB/s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-2">+25%</span> vs baseline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {channelData.filter((ch) => ch.status === "active").length}/{channelData.length}
              </div>
              <p className="text-xs text-muted-foreground">DMA channels in use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{avgUtilization.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Across active channels</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>DMA Throughput Over Time</CardTitle>
              <CardDescription>Real-time data transfer rates per channel (MB/s)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={throughputData}>
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
                    dataKey="camera"
                    stroke="oklch(0.65 0.24 264)"
                    strokeWidth={2}
                    dot={false}
                    name="Camera"
                  />
                  <Line
                    type="monotone"
                    dataKey="lidar"
                    stroke="oklch(0.70 0.17 162)"
                    strokeWidth={2}
                    dot={false}
                    name="LIDAR"
                  />
                  <Line
                    type="monotone"
                    dataKey="imu"
                    stroke="oklch(0.77 0.19 70)"
                    strokeWidth={2}
                    dot={false}
                    name="IMU"
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="oklch(0.65 0.25 16)"
                    strokeWidth={3}
                    dot={false}
                    name="Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Utilization</CardTitle>
              <CardDescription>Current DMA channel usage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
                  <XAxis
                    dataKey="id"
                    stroke="oklch(0.65 0 0)"
                    tick={{ fill: "oklch(0.65 0 0)" }}
                    label={{ value: "Channel", position: "insideBottom", offset: -5, fill: "oklch(0.65 0 0)" }}
                  />
                  <YAxis stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.12 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "0.5rem",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Bar dataKey="utilization" fill="oklch(0.65 0.24 264)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">DMA Channels</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {channelData.map((channel) => (
              <Card key={channel.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Channel {channel.id}: {channel.name}
                      </CardTitle>
                      <CardDescription className="mt-1">DMA transfer pipeline</CardDescription>
                    </div>
                    <Badge variant={channel.status === "active" ? "default" : "secondary"}>{channel.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Throughput</span>
                        <span className="text-lg font-bold text-foreground">{channel.throughput.toFixed(1)} MB/s</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-chart-1 transition-all duration-300"
                          style={{ width: `${Math.min(100, (channel.throughput / 300) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Utilization</span>
                        <span className="text-lg font-bold text-foreground">{channel.utilization.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-chart-2 transition-all duration-300"
                          style={{ width: `${channel.utilization}%` }}
                        />
                      </div>
                    </div>
                    {channel.status === "active" && channel.utilization > 90 && (
                      <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-destructive">High utilization</p>
                          <p className="text-xs text-muted-foreground">Consider load balancing</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>DMA pipeline statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Buffer Underruns</p>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-chart-2 mt-1">No issues detected</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transfer Errors</p>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-chart-2 mt-1">100% success rate</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Latency</p>
                <p className="text-2xl font-bold text-foreground">1.2 ms</p>
                <p className="text-xs text-muted-foreground mt-1">Per transfer</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Uptime</p>
                <p className="text-2xl font-bold text-foreground">2h 14m</p>
                <p className="text-xs text-muted-foreground mt-1">Stable operation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function generateInitialData() {
  const data = []
  for (let i = 30; i >= 0; i--) {
    const time = new Date(Date.now() - i * 1000).toLocaleTimeString()
    data.push({
      time,
      total: Math.random() * 100 + 350,
      camera: Math.random() * 50 + 220,
      lidar: Math.random() * 40 + 160,
      imu: Math.random() * 5 + 8,
    })
  }
  return data
}
