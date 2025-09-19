"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  username: string
  role: "admin" | "operator"
}

interface AuthContextType {
  user: User | null
  login: (username: string, role: "admin" | "operator") => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("railway_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username: string, role: "admin" | "operator") => {
    const userData = { username, role }
    setUser(userData)
    localStorage.setItem("railway_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("railway_user")
  }

  const isAdmin = user?.role === "admin"

  return <AuthContext.Provider value={{ user, login, logout, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
