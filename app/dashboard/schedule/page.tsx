"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Plus, Trash2, Download, FileSpreadsheet, Train, Clock, MapPin } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface TrainSchedule {
  id: string
  trainId: string
  route: string
  station: string
  arrival: string
  departure: string
  priority: "Low" | "Medium" | "High"
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<TrainSchedule[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [newSchedule, setNewSchedule] = useState<Omit<TrainSchedule, "id">>({
    trainId: "",
    route: "",
    station: "",
    arrival: "",
    departure: "",
    priority: "Medium",
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true)
    // Simulate file processing
    setTimeout(() => {
      const mockData: TrainSchedule[] = [
        {
          id: "1",
          trainId: "T001",
          route: "Mumbai-Delhi",
          station: "Mumbai Central",
          arrival: "08:00",
          departure: "08:15",
          priority: "High",
        },
        {
          id: "2",
          trainId: "T002",
          route: "Delhi-Kolkata",
          station: "New Delhi",
          arrival: "14:30",
          departure: "14:45",
          priority: "Medium",
        },
        {
          id: "3",
          trainId: "T003",
          route: "Chennai-Bangalore",
          station: "Chennai Central",
          arrival: "09:15",
          departure: "09:30",
          priority: "Low",
        },
      ]
      setSchedules((prev) => [...prev, ...mockData])
      setIsUploading(false)
    }, 2000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  })

  const addSchedule = () => {
    if (newSchedule.trainId && newSchedule.route && newSchedule.station) {
      const schedule: TrainSchedule = {
        ...newSchedule,
        id: Date.now().toString(),
      }
      setSchedules((prev) => [...prev, schedule])
      setNewSchedule({
        trainId: "",
        route: "",
        station: "",
        arrival: "",
        departure: "",
        priority: "Medium",
      })
    }
  }

  const removeSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id))
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
          <h1 className="text-3xl font-bold text-white mb-2">Train Schedule Entry</h1>
          <p className="text-white/70">Upload CSV/Excel files or manually enter train schedules</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Upload Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                File Upload
              </h2>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-white/30 hover:border-cyan-400/50 hover:bg-white/5"
                }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={isUploading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isUploading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                >
                  <FileSpreadsheet className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                </motion.div>

                {isUploading ? (
                  <div>
                    <p className="text-white font-medium">Processing file...</p>
                    <p className="text-white/60 text-sm">Please wait while we import your data</p>
                  </div>
                ) : isDragActive ? (
                  <div>
                    <p className="text-white font-medium">Drop the file here</p>
                    <p className="text-white/60 text-sm">Release to upload</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-medium mb-2">Drag & drop your schedule file here</p>
                    <p className="text-white/60 text-sm mb-4">or click to browse</p>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-white/60">
                <p className="mb-2">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                <p>Required columns: Train ID, Route, Station, Arrival, Departure, Priority</p>
              </div>
            </Card>
          </motion.div>

          {/* Manual Entry Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                Manual Entry
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Train ID</Label>
                    <Input
                      value={newSchedule.trainId}
                      onChange={(e) => setNewSchedule((prev) => ({ ...prev, trainId: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      placeholder="T001"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Route</Label>
                    <Input
                      value={newSchedule.route}
                      onChange={(e) => setNewSchedule((prev) => ({ ...prev, route: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Mumbai-Delhi"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80">Station</Label>
                  <Input
                    value={newSchedule.station}
                    onChange={(e) => setNewSchedule((prev) => ({ ...prev, station: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Mumbai Central"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Arrival Time</Label>
                    <Input
                      type="time"
                      value={newSchedule.arrival}
                      onChange={(e) => setNewSchedule((prev) => ({ ...prev, arrival: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Departure Time</Label>
                    <Input
                      type="time"
                      value={newSchedule.departure}
                      onChange={(e) => setNewSchedule((prev) => ({ ...prev, departure: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80">Priority</Label>
                  <Select
                    value={newSchedule.priority}
                    onValueChange={(value: "Low" | "Medium" | "High") =>
                      setNewSchedule((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="Low" className="text-white hover:bg-white/10">
                        Low
                      </SelectItem>
                      <SelectItem value="Medium" className="text-white hover:bg-white/10">
                        Medium
                      </SelectItem>
                      <SelectItem value="High" className="text-white hover:bg-white/10">
                        High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={addSchedule}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
                  disabled={!newSchedule.trainId || !newSchedule.route || !newSchedule.station}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Schedule Table */}
        {schedules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Train className="w-5 h-5 text-green-400" />
                  Current Schedules ({schedules.length})
                </h2>
                <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/80">Train ID</TableHead>
                      <TableHead className="text-white/80">Route</TableHead>
                      <TableHead className="text-white/80">Station</TableHead>
                      <TableHead className="text-white/80">Arrival</TableHead>
                      <TableHead className="text-white/80">Departure</TableHead>
                      <TableHead className="text-white/80">Priority</TableHead>
                      <TableHead className="text-white/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule, index) => (
                      <motion.tr
                        key={schedule.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <TableCell className="text-white font-medium">{schedule.trainId}</TableCell>
                        <TableCell className="text-white/80">{schedule.route}</TableCell>
                        <TableCell className="text-white/80 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          {schedule.station}
                        </TableCell>
                        <TableCell className="text-white/80 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-400" />
                          {schedule.arrival}
                        </TableCell>
                        <TableCell className="text-white/80">{schedule.departure}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(schedule.priority)}`}
                          >
                            {schedule.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSchedule(schedule.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        {schedules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Button
              onClick={addSchedule}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8"
            >
              Proceed to AI Analysis
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Save as Draft
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
