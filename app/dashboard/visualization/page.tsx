"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Train, AlertTriangle, CheckCircle, Clock, Activity, MapPin, Gauge } from "lucide-react"

interface TrainPosition {
  id: string
  trainId: string
  route: string
  currentStation: string
  nextStation: string
  position: { x: number; y: number }
  speed: number
  status: "on_time" | "delayed" | "critical"
  passengers: number
  delay: number
}

interface TrackSection {
  id: string
  name: string
  status: "free" | "busy" | "critical"
  congestionLevel: number
  trains: string[]
  coordinates: { start: { x: number; y: number }; end: { x: number; y: number } }
}

export default function VisualizationPage() {
  const [selectedTrain, setSelectedTrain] = useState<TrainPosition | null>(null)
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview")
  const [isLive, setIsLive] = useState(true)

  const [trains, setTrains] = useState<TrainPosition[]>([
    {
      id: "1",
      trainId: "GJ001",
      route: "Ahmedabad-Surat",
      currentStation: "Ahmedabad Junction",
      nextStation: "Anand Junction",
      position: { x: 30, y: 35 },
      speed: 85,
      status: "on_time",
      passengers: 1247,
      delay: 0,
    },
    {
      id: "2",
      trainId: "GJ002",
      route: "Rajkot-Vadodara",
      currentStation: "Rajkot Junction",
      nextStation: "Surendranagar",
      position: { x: 20, y: 25 },
      speed: 72,
      status: "delayed",
      passengers: 892,
      delay: 8,
    },
    {
      id: "3",
      trainId: "GJ003",
      route: "Bhavnagar-Ahmedabad",
      currentStation: "Bhavnagar Terminus",
      nextStation: "Sihor",
      position: { x: 25, y: 45 },
      speed: 95,
      status: "on_time",
      passengers: 1156,
      delay: 0,
    },
    {
      id: "4",
      trainId: "GJ004",
      route: "Gandhidham-Mumbai",
      currentStation: "Gandhidham",
      nextStation: "Bhuj",
      position: { x: 15, y: 15 },
      speed: 45,
      status: "critical",
      passengers: 743,
      delay: 22,
    },
    {
      id: "5",
      trainId: "GJ005",
      route: "Vapi-Ahmedabad",
      currentStation: "Vapi",
      nextStation: "Valsad",
      position: { x: 45, y: 75 },
      speed: 88,
      status: "on_time",
      passengers: 1034,
      delay: 0,
    },
  ])

  const trackSections: TrackSection[] = [
    {
      id: "1",
      name: "Ahmedabad-Surat Corridor",
      status: "busy",
      congestionLevel: 75,
      trains: ["GJ001", "GJ005"],
      coordinates: { start: { x: 30, y: 35 }, end: { x: 45, y: 75 } },
    },
    {
      id: "2",
      name: "Rajkot-Vadodara Main Line",
      status: "free",
      congestionLevel: 35,
      trains: ["GJ002"],
      coordinates: { start: { x: 20, y: 25 }, end: { x: 35, y: 50 } },
    },
    {
      id: "3",
      name: "Bhavnagar-Ahmedabad Express",
      status: "critical",
      congestionLevel: 90,
      trains: ["GJ003"],
      coordinates: { start: { x: 25, y: 45 }, end: { x: 30, y: 35 } },
    },
    {
      id: "4",
      name: "Kutch Railway Section",
      status: "busy",
      congestionLevel: 68,
      trains: ["GJ004"],
      coordinates: { start: { x: 15, y: 15 }, end: { x: 25, y: 25 } },
    },
  ]

  const updateTrainPositions = useCallback(() => {
    setTrains((prev) =>
      prev.map((train) => ({
        ...train,
        position: {
          x: Math.max(5, Math.min(95, train.position.x + Math.random() * 2 - 1)),
          y: Math.max(5, Math.min(95, train.position.y + Math.random() * 2 - 1)),
        },
        speed: Math.max(30, train.speed + Math.random() * 10 - 5),
      })),
    )
  }, [])

  // Simulate real-time updates with debouncing
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(updateTrainPositions, 5000)
    return () => clearInterval(interval)
  }, [isLive, updateTrainPositions])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_time":
        return "text-green-400 bg-green-400/20"
      case "delayed":
        return "text-yellow-400 bg-yellow-400/20"
      case "critical":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getTrackColor = (status: string) => {
    switch (status) {
      case "free":
        return "stroke-green-400"
      case "busy":
        return "stroke-yellow-400"
      case "critical":
        return "stroke-red-400"
      default:
        return "stroke-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_time":
        return <CheckCircle className="w-4 h-4" />
      case "delayed":
        return <Clock className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Map className="w-8 h-8 text-blue-400" />
                Gujarat Railway Network
              </h1>
              <p className="text-white/70">Real-time Gujarat railway section monitoring and train tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsLive(!isLive)}
                variant={isLive ? "default" : "outline"}
                className={
                  isLive
                    ? "bg-green-600 hover:bg-green-500"
                    : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                }
              >
                <Activity className="w-4 h-4 mr-2" />
                {isLive ? "Live" : "Paused"}
              </Button>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "overview" | "detailed")}>
                <TabsList className="bg-white/10">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="data-[state=active]:bg-cyan-500/20">
                    Detailed
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Map */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 h-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Gujarat Railway Map</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-white/70">Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-white/70">Busy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-white/70">Critical</span>
                    </div>
                  </div>
                </div>

                <div
                  className="relative w-full h-full bg-slate-800/50 rounded-lg overflow-hidden"
                  style={{ willChange: "transform" }}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Track Sections */}
                    {trackSections.map((track) => (
                      <motion.line
                        key={track.id}
                        x1={track.coordinates.start.x}
                        y1={track.coordinates.start.y}
                        x2={track.coordinates.end.x}
                        y2={track.coordinates.end.y}
                        className={`${getTrackColor(track.status)} stroke-2`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    ))}

                    {[
                      { name: "Ahmedabad", x: 30, y: 35 },
                      { name: "Rajkot", x: 20, y: 25 },
                      { name: "Surat", x: 45, y: 75 },
                      { name: "Vadodara", x: 35, y: 50 },
                      { name: "Bhavnagar", x: 25, y: 45 },
                      { name: "Gandhidham", x: 15, y: 15 },
                      { name: "Vapi", x: 45, y: 75 },
                      { name: "Bhuj", x: 10, y: 10 },
                    ].map((station, index) => (
                      <motion.g
                        key={station.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <circle cx={station.x} cy={station.y} r="2" className="fill-white stroke-cyan-400 stroke-1" />
                        <text
                          x={station.x}
                          y={station.y - 3}
                          className="fill-white text-xs"
                          textAnchor="middle"
                          fontSize="3"
                        >
                          {station.name}
                        </text>
                      </motion.g>
                    ))}

                    {/* Moving Trains */}
                    {trains.map((train, index) => (
                      <motion.g
                        key={train.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <motion.circle
                          cx={train.position.x}
                          cy={train.position.y}
                          r="1.5"
                          className={`${
                            train.status === "on_time"
                              ? "fill-green-400"
                              : train.status === "delayed"
                                ? "fill-yellow-400"
                                : "fill-red-400"
                          } cursor-pointer`}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.9, 1, 0.9],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          onClick={() => setSelectedTrain(train)}
                          style={{ willChange: "transform" }}
                        />
                        <text
                          x={train.position.x}
                          y={train.position.y + 4}
                          className="fill-white text-xs cursor-pointer"
                          textAnchor="middle"
                          fontSize="2.5"
                          onClick={() => setSelectedTrain(train)}
                        >
                          {train.trainId}
                        </text>
                      </motion.g>
                    ))}
                  </svg>

                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Train Details */}
            {selectedTrain && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Train className="w-5 h-5 text-cyan-400" />
                    {selectedTrain.trainId}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Status</span>
                      <Badge className={`${getStatusColor(selectedTrain.status)} text-xs`}>
                        {getStatusIcon(selectedTrain.status)}
                        <span className="ml-1 capitalize">{selectedTrain.status.replace("_", " ")}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Route</span>
                      <span className="text-white text-sm">{selectedTrain.route}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Current</span>
                      <span className="text-white text-sm">{selectedTrain.currentStation}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Next</span>
                      <span className="text-white text-sm">{selectedTrain.nextStation}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Speed</span>
                      <span className="text-cyan-400 font-medium">{Math.round(selectedTrain.speed)} km/h</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Passengers</span>
                      <span className="text-white">{selectedTrain.passengers.toLocaleString()}</span>
                    </div>

                    {selectedTrain.delay > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Delay</span>
                        <span className="text-red-400 font-medium">+{selectedTrain.delay} min</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setSelectedTrain(null)}
                    variant="outline"
                    className="w-full mt-4 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Close Details
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Track Status */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  Track Sections
                </h3>

                <div className="space-y-3">
                  {trackSections.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{track.name}</span>
                        <Badge className={`${getStatusColor(track.status)} text-xs`}>
                          {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Congestion</span>
                        <span className="text-white">{track.congestionLevel}%</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Active Trains</span>
                        <span className="text-white">{track.trains.length}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* System Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-green-400" />
                  System Status
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Active Trains</span>
                    <span className="text-green-400 font-medium">{trains.length}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">On Time</span>
                    <span className="text-green-400 font-medium">
                      {trains.filter((t) => t.status === "on_time").length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Delayed</span>
                    <span className="text-yellow-400 font-medium">
                      {trains.filter((t) => t.status === "delayed").length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Critical</span>
                    <span className="text-red-400 font-medium">
                      {trains.filter((t) => t.status === "critical").length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Total Passengers</span>
                    <span className="text-cyan-400 font-medium">
                      {trains.reduce((acc, train) => acc + train.passengers, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
