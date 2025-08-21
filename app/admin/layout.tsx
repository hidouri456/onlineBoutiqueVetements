"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'

const navigation = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Produits", href: "/admin/produits", icon: Package },
  { name: "Commandes", href: "/admin/commandes", icon: ShoppingCart },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Statistiques", href: "/admin/statistiques", icon: BarChart3 },
  { name: "Paramètres", href: "/admin/parametres", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    try {
  const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      if (res.ok) {
        // clear stored auth info
        try { localStorage.removeItem('token'); localStorage.removeItem('role'); } catch (e) {}
        router.push('/')
      } else {
        console.error('Logout failed')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // client-side guard: ensure user is admin
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      if (!token || !(role === 'admin' || role === 'superadmin')) {
        router.replace('/auth/connexion')
      }
    } catch (e) {
      router.replace('/auth/connexion')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        // dev-outline: add ring to visualize sidebar bounds (remove in production)
        className={`
        fixed inset-y-0 left-0 top-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:relative lg:transform-none lg:h-screen ring-2 ring-red-200/40
      `}
        >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-serif font-bold">Admin Panel</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

  <nav className="p-4 space-y-2 pb-24">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

  <div className="absolute bottom-4 left-4 right-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-accent-foreground">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@boutique.com</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              En ligne
            </Badge>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
