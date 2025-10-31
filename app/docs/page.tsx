import Link from "next/link"
import { Activity, ArrowLeft, Book, Code, Cpu, HardDrive, Zap, Terminal, FileCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
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
                  <h1 className="text-xl font-semibold text-foreground">Documentation</h1>
                  <p className="text-xs text-muted-foreground">Architecture & developer guides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">RT Profiler Documentation</h2>
            <p className="text-muted-foreground text-balance">
              Complete guide to the Real-Time Embedded System Performance Profiler for ARM Linux platforms
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    The Real-Time Embedded System Performance Profiler is a C++-based diagnostic tool designed for Linux
                    embedded platforms, specifically targeting ARM Jetson Nano and Orin devices. It provides real-time
                    visibility into CPU, memory, and I/O performance, enabling developers to quickly identify
                    bottlenecks and optimize system behavior under high-load conditions.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Key Features</h3>
                  <div className="grid gap-4 md:grid-cols-2 not-prose">
                    <div className="flex gap-3 p-4 bg-card border border-border rounded-lg">
                      <Cpu className="h-5 w-5 text-chart-1 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Real-Time Monitoring</h4>
                        <p className="text-sm text-muted-foreground">
                          Multi-threaded sampling engine with less than 5% overhead
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 bg-card border border-border rounded-lg">
                      <Zap className="h-5 w-5 text-chart-2 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Bottleneck Detection</h4>
                        <p className="text-sm text-muted-foreground">
                          Automated perf and valgrind integration for diagnostics
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 bg-card border border-border rounded-lg">
                      <HardDrive className="h-5 w-5 text-chart-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">DMA Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Direct memory access for 25% throughput improvement
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 bg-card border border-border rounded-lg">
                      <FileCode className="h-5 w-5 text-chart-4 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Export & Analysis</h4>
                        <p className="text-sm text-muted-foreground">CSV and log export for offline analysis</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Success Metrics</h3>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-chart-2 mt-1">•</span>
                      <span>
                        <strong>40% reduction</strong> in diagnostic latency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-chart-2 mt-1">•</span>
                      <span>
                        <strong>30% reduction</strong> in CPU utilization under high-load scenarios
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-chart-2 mt-1">•</span>
                      <span>
                        <strong>25% throughput improvement</strong> with DMA-enabled ingestion
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-chart-2 mt-1">•</span>
                      <span>Improved cross-team debugging efficiency through documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    System Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Core Components</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">1. Sampling Engine</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Multi-threaded C++ engine that collects CPU, memory, and I/O metrics in real-time using a
                          lock-free ring buffer.
                        </p>
                        <code className="text-xs bg-card px-2 py-1 rounded text-foreground font-mono block">
                          src/core/sampling_engine.cpp
                        </code>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">2. Profiling Integration</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Automated wrapper scripts for perf and valgrind that trigger on threshold violations and
                          generate reports.
                        </p>
                        <code className="text-xs bg-card px-2 py-1 rounded text-foreground font-mono block">
                          scripts/profiler_wrapper.sh
                        </code>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">3. DMA Pipeline</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Direct memory access implementation for high-throughput sensor data ingestion on Jetson Orin.
                        </p>
                        <code className="text-xs bg-card px-2 py-1 rounded text-foreground font-mono block">
                          src/dma/dma_controller.cpp
                        </code>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4. Data Export</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          CSV and log file generation for offline analysis and integration with external tools.
                        </p>
                        <code className="text-xs bg-card px-2 py-1 rounded text-foreground font-mono block">
                          src/export/data_exporter.cpp
                        </code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technology Stack</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-3 bg-card border border-border rounded-lg">
                        <p className="text-sm font-medium text-foreground">Core Engine</p>
                        <p className="text-xs text-muted-foreground">C++17, CMake</p>
                      </div>
                      <div className="p-3 bg-card border border-border rounded-lg">
                        <p className="text-sm font-medium text-foreground">Platform</p>
                        <p className="text-xs text-muted-foreground">Linux ARM (Jetson Nano/Orin)</p>
                      </div>
                      <div className="p-3 bg-card border border-border rounded-lg">
                        <p className="text-sm font-medium text-foreground">Profiling Tools</p>
                        <p className="text-xs text-muted-foreground">perf, valgrind, callgrind</p>
                      </div>
                      <div className="p-3 bg-card border border-border rounded-lg">
                        <p className="text-sm font-medium text-foreground">Automation</p>
                        <p className="text-xs text-muted-foreground">Bash scripts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Installation & Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Prerequisites</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-chart-1 mt-1">•</span>
                        <span>ARM Jetson Nano or Orin device running Linux</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-1 mt-1">•</span>
                        <span>GCC 9.0+ with C++17 support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-1 mt-1">•</span>
                        <span>CMake 3.15 or higher</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-1 mt-1">•</span>
                        <span>perf and valgrind installed</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Build Instructions</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">1. Clone the repository</p>
                        <pre className="bg-card p-3 rounded-lg overflow-x-auto">
                          <code className="text-sm text-foreground font-mono">
                            git clone https://github.com/your-org/rt-profiler.git{"\n"}
                            cd rt-profiler
                          </code>
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">2. Install dependencies</p>
                        <pre className="bg-card p-3 rounded-lg overflow-x-auto">
                          <code className="text-sm text-foreground font-mono">
                            sudo apt-get update{"\n"}
                            sudo apt-get install build-essential cmake linux-tools-generic valgrind
                          </code>
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">3. Build the project</p>
                        <pre className="bg-card p-3 rounded-lg overflow-x-auto">
                          <code className="text-sm text-foreground font-mono">
                            mkdir build && cd build{"\n"}
                            cmake ..{"\n"}
                            make -j4
                          </code>
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">4. Run the profiler</p>
                        <pre className="bg-card p-3 rounded-lg overflow-x-auto">
                          <code className="text-sm text-foreground font-mono">
                            sudo ./rt_profiler --config config.yaml
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Configuration</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Edit{" "}
                      <code className="bg-card px-2 py-1 rounded text-foreground font-mono text-xs">config.yaml</code>{" "}
                      to customize profiler behavior:
                    </p>
                    <pre className="bg-card p-3 rounded-lg overflow-x-auto">
                      <code className="text-sm text-foreground font-mono">
                        {`sampling:
  frequency: 1000  # Hz
  buffer_size: 8192

thresholds:
  cpu_high: 80  # %
  memory_high: 90  # %
  
export:
  format: csv
  path: /var/log/rt-profiler/`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="h-5 w-5" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Core Classes</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <code className="text-sm font-semibold text-foreground font-mono">SamplingEngine</code>
                        <p className="text-sm text-muted-foreground mt-2 mb-3">
                          Main profiler engine for collecting system metrics
                        </p>
                        <div className="space-y-2">
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">void start()</code>
                            <p className="text-xs text-muted-foreground mt-1">Start the sampling engine</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">void stop()</code>
                            <p className="text-xs text-muted-foreground mt-1">Stop the sampling engine</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">Metrics getMetrics()</code>
                            <p className="text-xs text-muted-foreground mt-1">Retrieve current system metrics</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <code className="text-sm font-semibold text-foreground font-mono">DMAController</code>
                        <p className="text-sm text-muted-foreground mt-2 mb-3">
                          Direct memory access controller for sensor data
                        </p>
                        <div className="space-y-2">
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">bool initChannel(int id)</code>
                            <p className="text-xs text-muted-foreground mt-1">Initialize a DMA channel</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">
                              size_t transfer(void* src, void* dst, size_t size)
                            </code>
                            <p className="text-xs text-muted-foreground mt-1">Perform DMA transfer</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">ThroughputStats getStats()</code>
                            <p className="text-xs text-muted-foreground mt-1">Get throughput statistics</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-secondary rounded-lg">
                        <code className="text-sm font-semibold text-foreground font-mono">ProfilerWrapper</code>
                        <p className="text-sm text-muted-foreground mt-2 mb-3">
                          Wrapper for perf and valgrind integration
                        </p>
                        <div className="space-y-2">
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">
                              void runPerf(const std::string& target)
                            </code>
                            <p className="text-xs text-muted-foreground mt-1">Run perf analysis on target</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">
                              void runValgrind(const std::string& target)
                            </code>
                            <p className="text-xs text-muted-foreground mt-1">Run valgrind memory check</p>
                          </div>
                          <div className="bg-card p-2 rounded">
                            <code className="text-xs text-foreground font-mono">Report generateReport()</code>
                            <p className="text-xs text-muted-foreground mt-1">Generate bottleneck report</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Example Usage</h3>
                    <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-foreground font-mono">
                        {`#include "rt_profiler/sampling_engine.h"
#include "rt_profiler/dma_controller.h"

int main() {
    // Initialize profiler
    SamplingEngine engine;
    engine.setFrequency(1000); // 1kHz
    engine.start();
    
    // Initialize DMA
    DMAController dma;
    dma.initChannel(0);
    
    // Run your application
    // ...
    
    // Get metrics
    auto metrics = engine.getMetrics();
    std::cout << "CPU: " << metrics.cpu_usage << "%\\n";
    
    engine.stop();
    return 0;
}`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <a href="https://github.com/your-org/rt-profiler" target="_blank" rel="noopener noreferrer">
                    <Code className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </a>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <a href="https://perf.wiki.kernel.org/" target="_blank" rel="noopener noreferrer">
                    <Book className="h-4 w-4 mr-2" />
                    perf Documentation
                  </a>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <a href="https://valgrind.org/docs/manual/manual.html" target="_blank" rel="noopener noreferrer">
                    <Book className="h-4 w-4 mr-2" />
                    Valgrind Manual
                  </a>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <a href="https://developer.nvidia.com/embedded/jetson" target="_blank" rel="noopener noreferrer">
                    <Cpu className="h-4 w-4 mr-2" />
                    Jetson Platform Guide
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
