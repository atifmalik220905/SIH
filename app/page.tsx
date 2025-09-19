"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Train, Zap, Network, ArrowRight } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user session
    login(username, role as "admin" | "operator")

    setIsLoading(false)
    router.push("/dashboard")
    console.log("Login successful:", { username, role })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {/* Floating Network Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            initial={{
              x: 100 + i * 200,
              y: 100 + i * 100,
            }}
            animate={{
              x: 200 + i * 200,
              y: 200 + i * 100,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Animated Train Path */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <Train className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 text-balance">AI Railway Control</h1>
            <p className="text-cyan-300 text-sm">Maximizing Section Throughput with AI-Powered Precision</p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl shadow-cyan-500/20 p-8">
              <div className="space-y-6">
                {/* Username Field */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="username" className="text-white font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300"
                      placeholder="Enter your username"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-md border-2 border-cyan-400/0 pointer-events-none"
                      whileFocus={{ borderColor: "rgba(6,182,212,0.5)" }}
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </motion.div>

                {/* Role Selection */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label className="text-white font-medium">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/50">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="admin" className="text-white hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          Admin
                        </div>
                      </SelectItem>
                      <SelectItem value="operator" className="text-white hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4 text-purple-400" />
                          Operator
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleLogin}
                    disabled={!username || !password || !role || isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Authenticating...
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Login to Control Center
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Status Indicators */}
                <div className="flex justify-center gap-4 pt-4">
                  {["System", "AI Engine", "Network"].map((status, index) => (
                    <motion.div
                      key={status}
                      className="flex items-center gap-1 text-xs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{
                          boxShadow: [
                            "0 0 5px rgba(34,197,94,0.5)",
                            "0 0 15px rgba(34,197,94,0.8)",
                            "0 0 5px rgba(34,197,94,0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-green-300">{status}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center mt-8 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>Secure Railway Traffic Management System</p>
            <p className="text-xs mt-1">Powered by Advanced AI Algorithms</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
