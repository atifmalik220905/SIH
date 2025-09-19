"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, AlertTriangle, User, MessageSquare, Train, TrendingUp, Edit3 } from "lucide-react"

interface DecisionItem {
  id: string
  trainId: string
  route: string
  type: "schedule_change" | "route_optimization" | "priority_adjustment"
  description: string
  aiRecommendation: string
  impact: {
    delayReduction: number
    throughputImprovement: number
    conflictsResolved: number
  }
  urgency: "Low" | "Medium" | "High"
  status: "pending" | "approved" | "rejected" | "modified"
  timestamp: string
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<DecisionItem[]>([
    {
      id: "1",
      trainId: "T001",
      route: "Mumbai-Delhi",
      type: "schedule_change",
      description: "Adjust departure time by 5 minutes to avoid platform congestion",
      aiRecommendation: "Move departure from 08:15 to 08:20 to reduce platform conflicts and improve passenger flow",
      impact: {
        delayReduction: 12,
        throughputImprovement: 8,
        conflictsResolved: 2,
      },
      urgency: "High",
      status: "pending",
      timestamp: "2024-01-15 14:30",
    },
    {
      id: "2",
      trainId: "T004",
      route: "Pune-Hyderabad",
      type: "route_optimization",
      description: "Alternative routing through secondary track to bypass maintenance zone",
      aiRecommendation: "Use Track 2B instead of main track to avoid 15-minute delay due to scheduled maintenance",
      impact: {
        delayReduction: 15,
        throughputImprovement: 12,
        conflictsResolved: 1,
      },
      urgency: "Medium",
      status: "pending",
      timestamp: "2024-01-15 14:25",
    },
    {
      id: "3",
      trainId: "T002",
      route: "Delhi-Kolkata",
      type: "priority_adjustment",
      description: "Increase priority level due to VIP passenger manifest",
      aiRecommendation: "Elevate to High priority and provide clear track access for on-time performance",
      impact: {
        delayReduction: 8,
        throughputImprovement: 5,
        conflictsResolved: 3,
      },
      urgency: "High",
      status: "pending",
      timestamp: "2024-01-15 14:20",
    },
  ])

  const [selectedDecision, setSelectedDecision] = useState<DecisionItem | null>(null)
  const [operatorNotes, setOperatorNotes] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDecision = (id: string, action: "approved" | "rejected" | "modified") => {
    setDecisions((prev) => prev.map((decision) => (decision.id === id ? { ...decision, status: action } : decision)))
    setIsDialogOpen(false)
    setOperatorNotes("")
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-400/20"
      case "rejected":
        return "text-red-400 bg-red-400/20"
      case "modified":
        return "text-blue-400 bg-blue-400/20"
      case "pending":
        return "text-yellow-400 bg-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "schedule_change":
        return <Clock className="w-4 h-4" />
      case "route_optimization":
        return <TrendingUp className="w-4 h-4" />
      case "priority_adjustment":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Train className="w-4 h-4" />
    }
  }

  const pendingDecisions = decisions.filter((d) => d.status === "pending")
  const processedDecisions = decisions.filter((d) => d.status !== "pending")

  return (
    <div className="p-6">
      {/* Animated Background Elements - same as login page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-green-400" />
            Operator Decision Center
          </h1>
          <p className="text-white/70">Review and approve AI-generated optimization recommendations</p>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-white/70 text-sm">Pending Decisions</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingDecisions.length}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-white/70 text-sm">Approved Today</p>
                <p className="text-2xl font-bold text-green-400">
                  {processedDecisions.filter((d) => d.status === "approved").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-white/70 text-sm">Rejected Today</p>
                <p className="text-2xl font-bold text-red-400">
                  {processedDecisions.filter((d) => d.status === "rejected").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <div className="flex items-center gap-3">
              <Edit3 className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white/70 text-sm">Modified Today</p>
                <p className="text-2xl font-bold text-blue-400">
                  {processedDecisions.filter((d) => d.status === "modified").length}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pending Decisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            Pending Decisions ({pendingDecisions.length})
          </h2>

          <div className="space-y-4">
            <AnimatePresence>
              {pendingDecisions.map((decision, index) => (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Train className="w-5 h-5 text-cyan-400" />
                          <span className="text-xl font-semibold text-white">{decision.trainId}</span>
                        </div>
                        <Badge className={`${getUrgencyColor(decision.urgency)} border text-xs`}>
                          {decision.urgency} Priority
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white/70 text-xs">
                          {getTypeIcon(decision.type)}
                          <span className="ml-1 capitalize">{decision.type.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <div className="text-white/60 text-sm">{decision.timestamp}</div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-white font-medium mb-2">{decision.route}</h3>
                      <p className="text-white/80 mb-3">{decision.description}</p>

                      <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                        <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          AI Recommendation
                        </h4>
                        <p className="text-white/90 text-sm">{decision.aiRecommendation}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-green-400 text-lg font-bold">-{decision.impact.delayReduction} min</p>
                          <p className="text-white/60 text-xs">Delay Reduction</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-400 text-lg font-bold">+{decision.impact.throughputImprovement}%</p>
                          <p className="text-white/60 text-xs">Throughput</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cyan-400 text-lg font-bold">{decision.impact.conflictsResolved}</p>
                          <p className="text-white/60 text-xs">Conflicts Resolved</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Dialog
                        open={isDialogOpen && selectedDecision?.id === decision.id}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 flex-1"
                            onClick={() => setSelectedDecision(decision)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-white/20 text-white">
                          <DialogHeader>
                            <DialogTitle>Confirm Approval - {decision.trainId}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-white/80">{decision.aiRecommendation}</p>
                            <div>
                              <label className="text-white/80 text-sm">Operator Notes (Optional)</label>
                              <Textarea
                                value={operatorNotes}
                                onChange={(e) => setOperatorNotes(e.target.value)}
                                className="bg-white/5 border-white/20 text-white mt-2"
                                placeholder="Add any additional notes or modifications..."
                              />
                            </div>
                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleDecision(decision.id, "approved")}
                                className="bg-green-600 hover:bg-green-500 flex-1"
                              >
                                Confirm Approval
                              </Button>
                              <Button
                                onClick={() => setIsDialogOpen(false)}
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        onClick={() => handleDecision(decision.id, "rejected")}
                        variant="outline"
                        className="border-red-400/50 text-red-400 hover:bg-red-400/10 bg-transparent flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>

                      <Button
                        onClick={() => {
                          setSelectedDecision(decision)
                          setIsDialogOpen(true)
                        }}
                        variant="outline"
                        className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 bg-transparent flex-1"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Modify
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Recent Decisions */}
        {processedDecisions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Decisions</h2>

            <div className="space-y-3">
              {processedDecisions.slice(0, 5).map((decision, index) => (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Train className="w-4 h-4 text-cyan-400" />
                        <span className="text-white font-medium">{decision.trainId}</span>
                        <span className="text-white/60 text-sm">{decision.route}</span>
                        <Badge className={`${getStatusColor(decision.status)} text-xs`}>
                          {decision.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {decision.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                          {decision.status === "modified" && <Edit3 className="w-3 h-3 mr-1" />}
                          {decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-white/60 text-sm">{decision.timestamp}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {pendingDecisions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">All Decisions Processed</h3>
            <p className="text-white/60">No pending AI recommendations require your attention at this time</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
