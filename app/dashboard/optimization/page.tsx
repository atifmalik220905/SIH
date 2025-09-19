"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Zap, Clock, TrendingUp, Train, CheckCircle, RotateCcw } from "lucide-react"

interface ScheduleItem {
  trainId: string
  route: string
  station: string
  originalArrival: string
  originalDeparture: string
  optimizedArrival: string
  optimizedDeparture: string
  delayReduction: number
  priority: "Low" | "Medium" | "High"
  status: "improved" | "unchanged" | "rerouted"
}

interface OptimizationMetrics {
  totalDelayReduction: number
  conflictsResolved: number
  throughputIncrease: number
  energySavings: number
}

export default function OptimizationPage() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedSchedules, setOptimizedSchedules] = useState<ScheduleItem[]>([])
  const [metrics, setMetrics] = useState<OptimizationMetrics>({
    totalDelayReduction: 0,
    conflictsResolved: 0,
    throughputIncrease: 0,
    energySavings: 0,
  })
  const [activeView, setActiveView] = useState<"gantt" | "comparison">("gantt")

  const mockOptimizedData: ScheduleItem[] = [
    {
      trainId: "T001",
      route: "Mumbai-Delhi",
      station: "Mumbai Central",
      originalArrival: "08:00",
      originalDeparture: "08:15",
      optimizedArrival: "08:05",
      optimizedDeparture: "08:18",
      delayReduction: 12,
      priority: "High",
      status: "improved",
    },
    {
      trainId: "T002",
      route: "Delhi-Kolkata",
      station: "New Delhi",
      originalArrival: "14:30",
      originalDeparture: "14:45",
      optimizedArrival: "14:25",
      optimizedDeparture: "14:40",
      delayReduction: 8,
      priority: "Medium",
      status: "improved",
    },
    {
      trainId: "T003",
      route: "Chennai-Bangalore",
      station: "Chennai Central",
      originalArrival: "09:15",
      originalDeparture: "09:30",
      optimizedArrival: "09:15",
      optimizedDeparture: "09:30",
      delayReduction: 0,
      priority: "Low",
      status: "unchanged",
    },
    {
      trainId: "T004",
      route: "Pune-Hyderabad",
      station: "Pune Junction",
      originalArrival: "11:20",
      originalDeparture: "11:35",
      optimizedArrival: "11:10",
      optimizedDeparture: "11:25",
      delayReduction: 15,
      priority: "High",
      status: "rerouted",
    },
    {
      trainId: "T005",
      route: "Bangalore-Chennai",
      station: "Bangalore City",
      originalArrival: "16:10",
      originalDeparture: "16:25",
      optimizedArrival: "16:08",
      optimizedDeparture: "16:22",
      delayReduction: 5,
      priority: "Medium",
      status: "improved",
    },
  ]

  const runOptimization = async () => {
    setIsOptimizing(true)
    setOptimizedSchedules([])

    // Simulate AI optimization process
    await new Promise((resolve) => setTimeout(resolve, 4000))

    setOptimizedSchedules(mockOptimizedData)
    setMetrics({
      totalDelayReduction: 40,
      conflictsResolved: 7,
      throughputIncrease: 23,
      energySavings: 18,
    })
    setIsOptimizing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improved":
        return "text-green-400 bg-green-400/20 border-green-400/30"
      case "rerouted":
        return "text-blue-400 bg-blue-400/20 border-blue-400/30"
      case "unchanged":
        return "text-gray-400 bg-gray-400/20 border-gray-400/30"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "improved":
        return <TrendingUp className="w-3 h-3" />
      case "rerouted":
        return <RotateCcw className="w-3 h-3" />
      case "unchanged":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <CheckCircle className="w-3 h-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-400/20"
      case "Medium":
        return "text-yellow-400 bg-yellow-400/20"
      case "Low":
        return "text-green-400 bg-green-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            AI Schedule Optimization
          </h1>
          <p className="text-white/70">Generate optimized timetables to maximize throughput and minimize delays</p>
        </div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Optimization Engine</h2>
                <p className="text-white/60">
                  Advanced AI algorithms for schedule optimization and conflict resolution
                </p>
              </div>
              <Button
                onClick={runOptimization}
                disabled={isOptimizing}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-3"
              >
                {isOptimizing ? (
                  <motion.div className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    Optimizing...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Generate Optimized Schedule
                  </div>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Optimization Progress */}
        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Optimization in Progress</h3>
              <div className="space-y-3">
                {[
                  "Analyzing current schedules...",
                  "Identifying conflicts and bottlenecks...",
                  "Calculating optimal routes...",
                  "Generating improved timetables...",
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    {step}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Optimization Results */}
        {optimizedSchedules.length > 0 && (
          <>
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white/70 text-sm">Delay Reduction</p>
                    <p className="text-2xl font-bold text-green-400">{metrics.totalDelayReduction} min</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-white/70 text-sm">Conflicts Resolved</p>
                    <p className="text-2xl font-bold text-blue-400">{metrics.conflictsResolved}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-white/70 text-sm">Throughput Increase</p>
                    <p className="text-2xl font-bold text-purple-400">+{metrics.throughputIncrease}%</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white/70 text-sm">Energy Savings</p>
                    <p className="text-2xl font-bold text-yellow-400">{metrics.energySavings}%</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Schedule Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "gantt" | "comparison")}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white">Schedule Comparison</h2>
                    <TabsList className="bg-white/10">
                      <TabsTrigger value="gantt" className="data-[state=active]:bg-cyan-500/20">
                        Gantt View
                      </TabsTrigger>
                      <TabsTrigger value="comparison" className="data-[state=active]:bg-cyan-500/20">
                        Comparison
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="gantt" className="space-y-4">
                    <div className="space-y-4">
                      {optimizedSchedules.map((schedule, index) => (
                        <motion.div
                          key={schedule.trainId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="bg-white/5 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <Train className="w-5 h-5 text-cyan-400" />
                              <span className="text-white font-semibold">{schedule.trainId}</span>
                              <Badge className={`${getPriorityColor(schedule.priority)} text-xs`}>
                                {schedule.priority}
                              </Badge>
                              <Badge className={`${getStatusColor(schedule.status)} border text-xs`}>
                                {getStatusIcon(schedule.status)}
                                <span className="ml-1 capitalize">{schedule.status}</span>
                              </Badge>
                            </div>
                            {schedule.delayReduction > 0 && (
                              <div className="text-green-400 text-sm font-medium">
                                -{schedule.delayReduction} min delay
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Original Schedule */}
                            <div className="bg-red-400/10 rounded p-3 border border-red-400/20">
                              <h4 className="text-red-300 font-medium mb-2">Original Schedule</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/70">Route:</span>
                                  <span className="text-white">{schedule.route}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Station:</span>
                                  <span className="text-white">{schedule.station}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Arrival:</span>
                                  <span className="text-white">{schedule.originalArrival}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Departure:</span>
                                  <span className="text-white">{schedule.originalDeparture}</span>
                                </div>
                              </div>
                            </div>

                            {/* Optimized Schedule */}
                            <div className="bg-green-400/10 rounded p-3 border border-green-400/20">
                              <h4 className="text-green-300 font-medium mb-2">Optimized Schedule</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/70">Route:</span>
                                  <span className="text-white">{schedule.route}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Station:</span>
                                  <span className="text-white">{schedule.station}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Arrival:</span>
                                  <span className="text-white">{schedule.optimizedArrival}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Departure:</span>
                                  <span className="text-white">{schedule.optimizedDeparture}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison" className="space-y-4">
                    <div className="text-center py-8">
                      <Settings className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-white mb-2">Interactive Gantt Chart</h3>
                      <p className="text-white/60">Advanced timeline visualization coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 justify-center"
            >
              <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 px-8">
                <CheckCircle className="w-4 h-4 mr-2" />
                Send for Approval
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Export Schedule
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Run New Optimization
              </Button>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {optimizedSchedules.length === 0 && !isOptimizing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <Settings className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">No Optimization Available</h3>
            <p className="text-white/60 mb-6">Generate an optimized schedule to improve throughput and reduce delays</p>
            <Button
              onClick={runOptimization}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Optimization
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
