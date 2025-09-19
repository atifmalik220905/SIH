"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Train, Upload, Brain, Map, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  const stats = [
    { label: "Active Trains", value: "47", change: "+12%", icon: Train, color: "text-cyan-400" },
    { label: "On-Time Performance", value: "94.2%", change: "+5.8%", icon: Clock, color: "text-green-400" },
    { label: "Throughput Today", value: "1,247", change: "+18%", icon: TrendingUp, color: "text-purple-400" },
    { label: "AI Predictions", value: "156", change: "+23%", icon: Brain, color: "text-yellow-400" },
  ]

  return (
    <div className="p-6">
      {/* Fixed background elements to prevent ResizeObserver issues */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">System Overview</h2>
          <p className="text-white/70">Real-time railway traffic control and optimization</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from yesterday</p>
                  </div>
                  <div className={`p-3 rounded-full bg-white/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-6 h-auto flex-col gap-2"
                onClick={() => router.push("/dashboard/schedule")}
              >
                <Upload className="w-8 h-8" />
                <span className="font-semibold">Upload Schedule</span>
                <span className="text-xs opacity-80">Add new train schedules</span>
              </Button>

              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white p-6 h-auto flex-col gap-2"
                onClick={() => router.push("/dashboard/prediction")}
              >
                <Brain className="w-8 h-8" />
                <span className="font-semibold">AI Analysis</span>
                <span className="text-xs opacity-80">Run delay predictions</span>
              </Button>

              <Button
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white p-6 h-auto flex-col gap-2"
                onClick={() => router.push("/dashboard/visualization")}
              >
                <Map className="w-8 h-8" />
                <span className="font-semibold">Gujarat Railway Map</span>
                <span className="text-xs opacity-80">View railway status</span>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div>
                  <p className="text-white font-medium">AI Engine</p>
                  <p className="text-green-400 text-sm">Operational</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div>
                  <p className="text-white font-medium">Network</p>
                  <p className="text-green-400 text-sm">Connected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                <div>
                  <p className="text-white font-medium">Sensors</p>
                  <p className="text-yellow-400 text-sm">2 Offline</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
