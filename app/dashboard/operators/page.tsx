"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { Plus, Edit, Trash2, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface Operator {
  id: string
  username: string
  role: "admin" | "operator"
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
}

export default function OperatorsPage() {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [operators, setOperators] = useState<Operator[]>([
    {
      id: "1",
      username: "admin",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 10:30",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      username: "operator1",
      role: "operator",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      username: "operator2",
      role: "operator",
      status: "inactive",
      lastLogin: "2024-01-10 14:20",
      createdAt: "2024-01-08",
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null)
  const [newOperator, setNewOperator] = useState({
    username: "",
    role: "operator" as "admin" | "operator",
    password: "",
  })

  // Redirect if not admin
  if (!isAdmin) {
    router.push("/dashboard")
    return null
  }

  const handleAddOperator = () => {
    const operator: Operator = {
      id: Date.now().toString(),
      username: newOperator.username,
      role: newOperator.role,
      status: "active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setOperators([...operators, operator])
    setNewOperator({ username: "", role: "operator", password: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditOperator = (operator: Operator) => {
    setEditingOperator(operator)
    setNewOperator({
      username: operator.username,
      role: operator.role,
      password: "",
    })
  }

  const handleUpdateOperator = () => {
    if (!editingOperator) return

    setOperators(
      operators.map((op) =>
        op.id === editingOperator.id ? { ...op, username: newOperator.username, role: newOperator.role } : op,
      ),
    )
    setEditingOperator(null)
    setNewOperator({ username: "", role: "operator", password: "" })
  }

  const handleDeleteOperator = (id: string) => {
    setOperators(operators.filter((op) => op.id !== id))
  }

  const toggleOperatorStatus = (id: string) => {
    setOperators(
      operators.map((op) => (op.id === id ? { ...op, status: op.status === "active" ? "inactive" : "active" } : op)),
    )
  }

  return (
    <div className="p-6">
      {/* Fixed background elements to prevent ResizeObserver issues */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
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
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Operators Management</h2>
            <p className="text-white/70">Manage system operators and their permissions</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Operator
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-white/20">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Operator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-white">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={newOperator.username}
                    onChange={(e) => setNewOperator({ ...newOperator, username: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newOperator.password}
                    onChange={(e) => setNewOperator({ ...newOperator, password: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <Label className="text-white">Role</Label>
                  <Select
                    value={newOperator.role}
                    onValueChange={(value: "admin" | "operator") => setNewOperator({ ...newOperator, role: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="operator" className="text-white">
                        Operator
                      </SelectItem>
                      <SelectItem value="admin" className="text-white">
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddOperator}
                  disabled={!newOperator.username || !newOperator.password}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  Add Operator
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Operators List */}
        <div className="grid gap-4">
          {operators.map((operator, index) => (
            <motion.div
              key={operator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white/10">
                      {operator.role === "admin" ? (
                        <Shield className="w-6 h-6 text-cyan-400" />
                      ) : (
                        <User className="w-6 h-6 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{operator.username}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={operator.role === "admin" ? "default" : "secondary"}>{operator.role}</Badge>
                        <Badge variant={operator.status === "active" ? "default" : "destructive"}>
                          {operator.status}
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm mt-1">
                        Last login: {operator.lastLogin} | Created: {operator.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOperatorStatus(operator.id)}
                      className="text-white/70 hover:text-white"
                    >
                      {operator.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditOperator(operator)}
                      className="text-white/70 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteOperator(operator.id)}
                      className="text-red-400 hover:text-red-300"
                      disabled={operator.role === "admin"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingOperator} onOpenChange={() => setEditingOperator(null)}>
          <DialogContent className="bg-slate-800 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Operator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-username" className="text-white">
                  Username
                </Label>
                <Input
                  id="edit-username"
                  value={newOperator.username}
                  onChange={(e) => setNewOperator({ ...newOperator, username: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Role</Label>
                <Select
                  value={newOperator.role}
                  onValueChange={(value: "admin" | "operator") => setNewOperator({ ...newOperator, role: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="operator" className="text-white">
                      Operator
                    </SelectItem>
                    <SelectItem value="admin" className="text-white">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateOperator} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                Update Operator
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}
