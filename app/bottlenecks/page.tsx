"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, ArrowLeft, AlertTriangle, CheckCircle2, XCircle, Play, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const bottlenecks = [
  {
    id: 1,
    type: "CPU",
    severity: "high",
    title: "High CPU utilization in sensor_processing()",
    description: "Function consuming 42% of total CPU cycles",
    tool: "perf",
    file: "src/sensors/processor.cpp:247",
    recommendation: "Consider vectorization or parallel processing",
    impact: "30% reduction possible",
  },
  {
    id: 2,
    type: "Memory",
    severity: "medium",
    title: "Memory leak detected in data_buffer",
    description: "2.4 MB leaked over 10 minutes",
    tool: "valgrind",
    file: "src/buffers/ring_buffer.cpp:89",
    recommendation: "Add proper cleanup in destructor",
    impact: "Prevents memory exhaustion",
  },
  {
    id: 3,
    type: "Cache",
    severity: "medium",
    title: "L2 cache miss rate elevated",
    description: "18% cache miss rate in matrix operations",
    tool: "perf",
    file: "src/math/matrix_ops.cpp:156",
    recommendation: "Improve data locality with blocking",
    impact: "15% performance gain",
  },
  {
    id: 4,
    type: "I/O",
    severity: "low",
    title: "Suboptimal disk access pattern",
    description: "Sequential reads fragmented across sectors",
    tool: "perf",
    file: "src/storage/file_reader.cpp:78",
    recommendation: "Implement read-ahead buffering",
    impact: "10% I/O improvement",
  },
]

const profilerRuns = [
  {
    id: 1,
    timestamp: "2025-10-31 14:23:45",
    duration: "45s",
    tool: "perf stat",
    status: "completed",
    findings: 3,
  },
  {
    id: 2,
    timestamp: "2025-10-31 13:15:22",
    duration: "2m 14s",
    tool: "valgrind --leak-check=full",
    status: "completed",
    findings: 1,
  },
  {
    id: 3,
    timestamp: "2025-10-31 12:08:11",
    duration: "1m 32s",
    tool: "perf record",
    status: "completed",
    findings: 2,
  },
]

export default function BottlenecksPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const runProfiler = () => {
    setIsRunning(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

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
                  <h1 className="text-xl font-semibold text-foreground">Bottleneck Detection</h1>
                  <p className="text-xs text-muted-foreground">Automated perf & valgrind analysis</p>
                </div>
              </div>
            </div>
            <Button onClick={runProfiler} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Profiler"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isRunning && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profiling in Progress</CardTitle>
              <CardDescription>Running perf and valgrind analysis...</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">6</div>
              <p className="text-xs text-muted-foreground">2 high, 3 medium, 1 low</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Reduction</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">30%</div>
              <p className="text-xs text-muted-foreground">Potential improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">14m ago</div>
              <p className="text-xs text-muted-foreground">45s duration</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Detected Bottlenecks</h2>
              <div className="space-y-4">
                {bottlenecks.map((bottleneck) => (
                  <Card key={bottleneck.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                bottleneck.severity === "high"
                                  ? "destructive"
                                  : bottleneck.severity === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {bottleneck.severity}
                            </Badge>
                            <Badge variant="outline">{bottleneck.type}</Badge>
                            <Badge variant="outline" className="font-mono text-xs">
                              {bottleneck.tool}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{bottleneck.title}</CardTitle>
                          <CardDescription className="mt-1">{bottleneck.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Location</p>
                          <code className="text-sm bg-secondary px-2 py-1 rounded text-foreground font-mono">
                            {bottleneck.file}
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Recommendation</p>
                          <p className="text-sm text-foreground">{bottleneck.recommendation}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-sm font-medium text-chart-2">{bottleneck.impact}</span>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profiler History</CardTitle>
                <CardDescription>Recent analysis runs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profilerRuns.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                        {run.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-chart-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{run.tool}</p>
                        <p className="text-xs text-muted-foreground">{run.timestamp}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {run.duration}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{run.findings} findings</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Play className="h-4 w-4 mr-2" />
                  Run perf stat
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Play className="h-4 w-4 mr-2" />
                  Run valgrind
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Play className="h-4 w-4 mr-2" />
                  Run callgrind
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
