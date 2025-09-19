"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, AlertTriangle, CheckCircle, Clock, TrendingUp, Zap, Train, MapPin, Activity } from "lucide-react"

interface PredictionData {
  trainId: string
  route: string
  station: string
  scheduledTime: string
  delayProbability: number
  riskLevel: "Low" | "Medium" | "High"
  causes: string[]
  confidence: number
}

interface SystemMetrics {
  totalTrains: number
  atRiskTrains: number
  avgDelayProbability: number
  systemLoad: number
}

export default function PredictionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalTrains: 0,
    atRiskTrains: 0,
    avgDelayProbability: 0,
    systemLoad: 0,
  })

  const mockPredictions: PredictionData[] = [
    {
      trainId: "T001",
      route: "Mumbai-Delhi",
      station: "Mumbai Central",
      scheduledTime: "08:15",
      delayProbability: 85,
      riskLevel: "High",
      causes: ["Track congestion", "Weather conditions", "Priority conflicts"],
      confidence: 92,
    },
    {
      trainId: "T002",
      route: "Delhi-Kolkata",
      station: "New Delhi",
      scheduledTime: "14:45",
      delayProbability: 45,
      riskLevel: "Medium",
      causes: ["Minor track maintenance", "Passenger boarding delays"],
      confidence: 78,
    },
    {
      trainId: "T003",
      route: "Chennai-Bangalore",
      station: "Chennai Central",
      scheduledTime: "09:30",
      delayProbability: 15,
      riskLevel: "Low",
      causes: ["Normal operations"],
      confidence: 95,
    },
    {
      trainId: "T004",
      route: "Pune-Hyderabad",
      station: "Pune Junction",
      scheduledTime: "11:20",
      delayProbability: 72,
      riskLevel: "High",
      causes: ["Signal failures", "Track congestion"],
      confidence: 88,
    },
    {
      trainId: "T005",
      route: "Bangalore-Chennai",
      station: "Bangalore City",
      scheduledTime: "16:10",
      delayProbability: 28,
      riskLevel: "Low",
      causes: ["Light traffic"],
      confidence: 91,
    },
  ]

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    setPredictions([])

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setPredictions(mockPredictions)
    setMetrics({
      totalTrains: mockPredictions.length,
      atRiskTrains: mockPredictions.filter((p) => p.riskLevel === "High").length,
      avgDelayProbability: Math.round(
        mockPredictions.reduce((acc, p) => acc + p.delayProbability, 0) / mockPredictions.length,
      ),
      systemLoad: 67,
    })
    setIsAnalyzing(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-400 bg-red-400/20 border-red-400/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30"
      case "Low":
        return "text-green-400 bg-green-400/20 border-green-400/30"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "High":
        return <AlertTriangle className="w-4 h-4" />
      case "Medium":
        return <Clock className="w-4 h-4" />
      case "Low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
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
            <Brain className="w-8 h-8 text-purple-400" />
            AI Delay Prediction
          </h1>
          <p className="text-white/70">Advanced machine learning analysis for delay probability assessment</p>
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
                <h2 className="text-xl font-semibold text-white mb-2">Analysis Control</h2>
                <p className="text-white/60">Run AI analysis on current train schedules and real-time data</p>
              </div>
              <Button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 px-8 py-3"
              >
                {isAnalyzing ? (
                  <motion.div className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    Analyzing...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Run AI Analysis
                  </div>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* System Metrics */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <div className="flex items-center gap-3">
                <Train className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-white/70 text-sm">Total Trains</p>
                  <p className="text-2xl font-bold text-white">{metrics.totalTrains}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-white/70 text-sm">At Risk</p>
                  <p className="text-2xl font-bold text-red-400">{metrics.atRiskTrains}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-white/70 text-sm">Avg Delay Risk</p>
                  <p className="text-2xl font-bold text-yellow-400">{metrics.avgDelayProbability}%</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-white/70 text-sm">System Load</p>
                  <p className="text-2xl font-bold text-purple-400">{metrics.systemLoad}%</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Predictions Grid */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Delay Predictions</h2>

            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.trainId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Train className="w-5 h-5 text-cyan-400" />
                          <span className="text-xl font-semibold text-white">{prediction.trainId}</span>
                        </div>

                        <Badge className={`${getRiskColor(prediction.riskLevel)} border`}>
                          {getRiskIcon(prediction.riskLevel)}
                          <span className="ml-1">{prediction.riskLevel} Risk</span>
                        </Badge>

                        <div className="text-sm text-white/60">Confidence: {prediction.confidence}%</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="w-4 h-4 text-green-400" />
                          <span className="text-sm">{prediction.route}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">{prediction.station}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">Scheduled: {prediction.scheduledTime}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">Delay Probability</span>
                          <span className="text-white font-semibold">{prediction.delayProbability}%</span>
                        </div>
                        <Progress value={prediction.delayProbability} className="h-2 bg-white/20" />
                      </div>

                      <div>
                        <p className="text-white/80 text-sm mb-2">Potential Causes:</p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.causes.map((cause, causeIndex) => (
                            <Badge key={causeIndex} variant="outline" className="text-xs border-white/30 text-white/70">
                              {cause}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        prediction.riskLevel === "High"
                          ? "bg-red-400/20"
                          : prediction.riskLevel === "Medium"
                            ? "bg-yellow-400/20"
                            : "bg-green-400/20"
                      }`}
                      animate={
                        prediction.riskLevel === "High"
                          ? {
                              boxShadow: [
                                "0 0 20px rgba(248, 113, 113, 0.3)",
                                "0 0 40px rgba(248, 113, 113, 0.6)",
                                "0 0 20px rgba(248, 113, 113, 0.3)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <span
                        className={`text-2xl font-bold ${
                          prediction.riskLevel === "High"
                            ? "text-red-400"
                            : prediction.riskLevel === "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {prediction.delayProbability}%
                      </span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8">
              Generate Optimized Schedule
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Export Predictions
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {predictions.length === 0 && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">No Analysis Available</h3>
            <p className="text-white/60 mb-6">Run AI analysis to generate delay predictions for your train schedules</p>
            <Button
              onClick={runAnalysis}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Analysis
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
