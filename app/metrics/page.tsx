"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, ArrowLeft, Cpu, HardDrive, Network } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CPUChart } from "@/components/cpu-chart"
import { MemoryChart } from "@/components/memory-chart"
import { IOChart } from "@/components/io-chart"

export default function MetricsPage() {
  const [isLive, setIsLive] = useState(true)

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
                  <h1 className="text-xl font-semibold text-foreground">Real-Time Metrics</h1>
                  <p className="text-xs text-muted-foreground">Live system performance monitoring</p>
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
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">67.3%</div>
              <p className="text-xs text-muted-foreground">4 cores active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3.2 GB</div>
              <p className="text-xs text-muted-foreground">of 8 GB (40%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">I/O Throughput</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">142 MB/s</div>
              <p className="text-xs text-muted-foreground">Read: 89 MB/s, Write: 53 MB/s</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cpu" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cpu">CPU Performance</TabsTrigger>
            <TabsTrigger value="memory">Memory Usage</TabsTrigger>
            <TabsTrigger value="io">I/O Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="cpu" className="space-y-6">
            <CPUChart isLive={isLive} />
          </TabsContent>

          <TabsContent value="memory" className="space-y-6">
            <MemoryChart isLive={isLive} />
          </TabsContent>

          <TabsContent value="io" className="space-y-6">
            <IOChart isLive={isLive} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
