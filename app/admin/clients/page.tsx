"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Eye, Mail, Users, UserCheck, UserX } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const customers = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    orders: 12,
    totalSpent: "€1,247.80",
    status: "Actif",
    joinDate: "2023-08-15",
    lastOrder: "2024-01-15",
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    orders: 8,
    totalSpent: "€892.50",
    status: "Actif",
    joinDate: "2023-09-22",
    lastOrder: "2024-01-14",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    orders: 15,
    totalSpent: "€1,567.25",
    status: "VIP",
    joinDate: "2023-06-10",
    lastOrder: "2024-01-13",
  },
  {
    id: "4",
    name: "Jean Moreau",
    email: "jean.moreau@email.com",
    orders: 3,
    totalSpent: "€234.80",
    status: "Nouveau",
    joinDate: "2024-01-05",
    lastOrder: "2024-01-12",
  },
  {
    id: "5",
    name: "Claire Dubois",
    email: "claire.dubois@email.com",
    orders: 0,
    totalSpent: "€0.00",
    status: "Inactif",
    joinDate: "2023-12-20",
    lastOrder: "Jamais",
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "VIP":
      return "default"
    case "Actif":
      return "secondary"
    case "Nouveau":
      return "outline"
    case "Inactif":
      return "destructive"
    default:
      return "outline"
  }
}

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Gestion des clients</h1>
        <p className="text-muted-foreground">Gérez votre base de clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-sm text-muted-foreground">Total clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {customers.filter((c) => c.status === "Actif" || c.status === "VIP").length}
                </p>
                <p className="text-sm text-muted-foreground">Clients actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.filter((c) => c.status === "VIP").length}</p>
                <p className="text-sm text-muted-foreground">Clients VIP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserX className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.filter((c) => c.status === "Nouveau").length}</p>
                <p className="text-sm text-muted-foreground">Nouveaux clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un client..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Clients ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-accent-foreground">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{customer.name}</h3>
                    <Badge variant={getStatusVariant(customer.status)} className="text-xs">
                      {customer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                  <p className="text-xs text-muted-foreground">Membre depuis {customer.joinDate}</p>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="font-medium">{customer.totalSpent}</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.orders} commande{customer.orders > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">Dernière: {customer.lastOrder}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir profil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
