"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { Train, Upload, Brain, Settings, CheckCircle, Map, BarChart3, User, LogOut, Users } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3, href: "/dashboard" },
    { id: "schedule", label: "Train Schedule", icon: Upload, href: "/dashboard/schedule" },
    { id: "prediction", label: "AI Delay Prediction", icon: Brain, href: "/dashboard/prediction" },
    { id: "optimization", label: "AI Optimization", icon: Settings, href: "/dashboard/optimization" },
    { id: "decisions", label: "Operator Decisions", icon: CheckCircle, href: "/dashboard/decisions" },
    { id: "visualization", label: "Railway Map", icon: Map, href: "/dashboard/visualization" },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3, href: "/dashboard/reports" },
    ...(isAdmin ? [{ id: "operators", label: "Operators", icon: Users, href: "/dashboard/operators" }] : []),
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <motion.header
        className="bg-black/20 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Train className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Railway Control</h1>
                <p className="text-xs text-cyan-300">Traffic Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <User className="w-4 h-4" />
                <span>
                  {user?.username || "User"} ({user?.role || "operator"})
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <motion.aside
          className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-[calc(100vh-4rem)]"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 text-left ${
                    pathname === item.href
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
