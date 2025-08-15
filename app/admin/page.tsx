"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, Euro, Eye } from "lucide-react"

const stats = [
  {
    title: "Chiffre d'affaires",
    value: "€12,847",
    change: "+12.5%",
    trend: "up",
    icon: Euro,
  },
  {
    title: "Commandes",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Produits",
    value: "89",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Clients",
    value: "1,247",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "CMD-001",
    customer: "Marie Dubois",
    amount: "€89.99",
    status: "En cours",
    date: "Il y a 2h",
  },
  {
    id: "CMD-002",
    customer: "Pierre Martin",
    amount: "€156.50",
    status: "Expédiée",
    date: "Il y a 4h",
  },
  {
    id: "CMD-003",
    customer: "Sophie Laurent",
    amount: "€67.25",
    status: "Livrée",
    date: "Il y a 6h",
  },
  {
    id: "CMD-004",
    customer: "Jean Moreau",
    amount: "€234.80",
    status: "En attente",
    date: "Il y a 8h",
  },
]

const topProducts = [
  {
    name: "Robe Élégante Noire",
    sales: 45,
    revenue: "€2,025",
    image: "/elegant-black-dress.png",
  },
  {
    name: "Chemise Homme Classique",
    sales: 38,
    revenue: "€1,520",
    image: "/classic-mens-shirt.png",
  },
  {
    name: "Jean Femme Tendance",
    sales: 32,
    revenue: "€1,280",
    image: "/trendy-womens-jeans.png",
  },
  {
    name: "Pull Enfant Coloré",
    sales: 28,
    revenue: "€840",
    image: "/colorful-kids-sweater.png",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Aperçu de votre boutique en ligne</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Commandes récentes</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Livrée"
                          ? "default"
                          : order.status === "Expédiée"
                            ? "secondary"
                            : order.status === "En cours"
                              ? "outline"
                              : "destructive"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Produits populaires</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-background rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              Ajouter un produit
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <ShoppingCart className="h-6 w-6" />
              Gérer les commandes
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              Voir les clients
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
