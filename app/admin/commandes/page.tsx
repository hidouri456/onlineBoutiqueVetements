"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Eye, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "CMD-001",
    customer: "Marie Dubois",
    email: "marie.dubois@email.com",
    amount: "€89.99",
    status: "En cours",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "CMD-002",
    customer: "Pierre Martin",
    email: "pierre.martin@email.com",
    amount: "€156.50",
    status: "Expédiée",
    date: "2024-01-14",
    items: 3,
  },
  {
    id: "CMD-003",
    customer: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    amount: "€67.25",
    status: "Livrée",
    date: "2024-01-13",
    items: 1,
  },
  {
    id: "CMD-004",
    customer: "Jean Moreau",
    email: "jean.moreau@email.com",
    amount: "€234.80",
    status: "En attente",
    date: "2024-01-12",
    items: 4,
  },
  {
    id: "CMD-005",
    customer: "Claire Dubois",
    email: "claire.dubois@email.com",
    amount: "€123.45",
    status: "Annulée",
    date: "2024-01-11",
    items: 2,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "En cours":
      return <Clock className="h-4 w-4" />
    case "Expédiée":
      return <Truck className="h-4 w-4" />
    case "Livrée":
      return <CheckCircle className="h-4 w-4" />
    case "En attente":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Livrée":
      return "default"
    case "Expédiée":
      return "secondary"
    case "En cours":
      return "outline"
    case "En attente":
      return "secondary"
    case "Annulée":
      return "destructive"
    default:
      return "outline"
  }
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Gestion des commandes</h1>
        <p className="text-muted-foreground">Suivez et gérez toutes les commandes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "En cours").length}</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Expédiée").length}</p>
                <p className="text-sm text-muted-foreground">Expédiées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Livrée").length}</p>
                <p className="text-sm text-muted-foreground">Livrées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "En attente").length}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
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
              <Input placeholder="Rechercher une commande..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Commandes ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{order.id}</h3>
                      <Badge variant={getStatusVariant(order.status)} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {order.customer} • {order.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.items} article{order.items > 1 ? "s" : ""} • {order.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">{order.amount}</p>
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
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Truck className="h-4 w-4 mr-2" />
                      Marquer comme expédiée
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marquer comme livrée
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
