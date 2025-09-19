"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BarChart3, TrendingUp, Download, Clock, Train, Target, Zap, FileText } from "lucide-react"

interface AnalyticsData {
  throughputData: Array<{ name: string; planned: number; achieved: number }>
  delayData: Array<{ name: string; delays: number; onTime: number }>
  aiEfficiencyData: Array<{ name: string; conflicts: number; resolved: number }>
  performanceMetrics: {
    throughputAchieved: number
    throughputPlanned: number
    delayReduction: number
    aiEfficiency: number
    conflictsResolved: number
    totalConflicts: number
  }
}

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [reportType, setReportType] = useState("performance")

  const analyticsData: AnalyticsData = {
    throughputData: [
      { name: "Mon", planned: 120, achieved: 118 },
      { name: "Tue", planned: 125, achieved: 132 },
      { name: "Wed", planned: 130, achieved: 128 },
      { name: "Thu", planned: 135, achieved: 142 },
      { name: "Fri", planned: 140, achieved: 145 },
      { name: "Sat", planned: 110, achieved: 115 },
      { name: "Sun", planned: 100, achieved: 108 },
    ],
    delayData: [
      { name: "Week 1", delays: 45, onTime: 155 },
      { name: "Week 2", delays: 38, onTime: 162 },
      { name: "Week 3", delays: 32, onTime: 168 },
      { name: "Week 4", delays: 28, onTime: 172 },
    ],
    aiEfficiencyData: [
      { name: "Jan", conflicts: 25, resolved: 23 },
      { name: "Feb", conflicts: 32, resolved: 30 },
      { name: "Mar", conflicts: 28, resolved: 27 },
      { name: "Apr", conflicts: 35, resolved: 34 },
      { name: "May", conflicts: 30, resolved: 29 },
      { name: "Jun", conflicts: 22, resolved: 22 },
    ],
    performanceMetrics: {
      throughputAchieved: 94.2,
      throughputPlanned: 100,
      delayReduction: 23.5,
      aiEfficiency: 96.8,
      conflictsResolved: 165,
      totalConflicts: 172,
    },
  }

  const pieData = [
    { name: "On Time", value: 78, color: "#10b981" },
    { name: "Minor Delays", value: 15, color: "#f59e0b" },
    { name: "Major Delays", value: 7, color: "#ef4444" },
  ]

  const exportReport = (format: "pdf" | "excel") => {
    // Simulate export functionality
    console.log(`Exporting report as ${format.toUpperCase()}`)
  }

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    window.addEventListener("error", handleResizeObserverError)
    return () => window.removeEventListener("error", handleResizeObserverError)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                Reports & Analytics
              </h1>
              <p className="text-white/70">Comprehensive performance insights and system analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="24h" className="text-white hover:bg-white/10">
                    Last 24h
                  </SelectItem>
                  <SelectItem value="7d" className="text-white hover:bg-white/10">
                    Last 7 days
                  </SelectItem>
                  <SelectItem value="30d" className="text-white hover:bg-white/10">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="90d" className="text-white hover:bg-white/10">
                    Last 90 days
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Throughput Achieved</p>
                <motion.p
                  className="text-3xl font-bold text-green-400 mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {analyticsData.performanceMetrics.throughputAchieved}%
                </motion.p>
                <p className="text-green-400 text-sm mt-1">
                  vs {analyticsData.performanceMetrics.throughputPlanned}% planned
                </p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Delay Reduction</p>
                <motion.p
                  className="text-3xl font-bold text-blue-400 mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  {analyticsData.performanceMetrics.delayReduction}%
                </motion.p>
                <p className="text-blue-400 text-sm mt-1">improvement this month</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">AI Efficiency</p>
                <motion.p
                  className="text-3xl font-bold text-purple-400 mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  {analyticsData.performanceMetrics.aiEfficiency}%
                </motion.p>
                <p className="text-purple-400 text-sm mt-1">conflicts resolved</p>
              </div>
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Conflicts</p>
                <motion.p
                  className="text-3xl font-bold text-cyan-400 mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  {analyticsData.performanceMetrics.conflictsResolved}
                </motion.p>
                <p className="text-cyan-400 text-sm mt-1">
                  of {analyticsData.performanceMetrics.totalConflicts} resolved
                </p>
              </div>
              <Train className="w-8 h-8 text-cyan-400" />
            </div>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
            <TabsList className="bg-white/10 p-1">
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/20">
                Performance
              </TabsTrigger>
              <TabsTrigger value="delays" className="data-[state=active]:bg-cyan-500/20">
                Delays
              </TabsTrigger>
              <TabsTrigger value="ai-efficiency" className="data-[state=active]:bg-cyan-500/20">
                AI Efficiency
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Throughput Analysis</h3>
                  <div style={{ willChange: "transform" }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.throughputData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#ffffff80" />
                        <YAxis stroke="#ffffff80" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                        <Bar dataKey="planned" fill="#6366f1" name="Planned" />
                        <Bar dataKey="achieved" fill="#10b981" name="Achieved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">On-Time Performance</h3>
                  <div style={{ willChange: "transform" }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-white/70 text-sm">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="delays" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Delay Trends</h3>
                <div style={{ willChange: "transform" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analyticsData.delayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Line type="monotone" dataKey="delays" stroke="#ef4444" strokeWidth={3} name="Delays" />
                      <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} name="On Time" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="ai-efficiency" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">AI Conflict Resolution</h3>
                <div style={{ willChange: "transform" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analyticsData.aiEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="conflicts" fill="#f59e0b" name="Total Conflicts" />
                      <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Export Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              Export Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Daily Reports</h4>
                <div className="space-y-2">
                  <Button
                    onClick={() => exportReport("pdf")}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Daily Performance Report (PDF)
                  </Button>
                  <Button
                    onClick={() => exportReport("excel")}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Daily Analytics Data (Excel)
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-medium">Weekly Reports</h4>
                <div className="space-y-2">
                  <Button
                    onClick={() => exportReport("pdf")}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Weekly Throughput Summary (PDF)
                  </Button>
                  <Button
                    onClick={() => exportReport("excel")}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    AI Efficiency Report (Excel)
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
