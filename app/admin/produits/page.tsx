"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "1",
    name: "Robe Élégante Noire",
    category: "Femmes",
    price: "€89.99",
    stock: 15,
    status: "Actif",
    image: "/elegant-black-dress.png",
    sales: 45,
  },
  {
    id: "2",
    name: "Chemise Homme Classique",
    category: "Hommes",
    price: "€49.99",
    stock: 8,
    status: "Actif",
    image: "/classic-mens-shirt.png",
    sales: 38,
  },
  {
    id: "3",
    name: "Jean Femme Tendance",
    category: "Femmes",
    price: "€79.99",
    stock: 22,
    status: "Actif",
    image: "/trendy-womens-jeans.png",
    sales: 32,
  },
  {
    id: "4",
    name: "Pull Enfant Coloré",
    category: "Enfants",
    price: "€29.99",
    stock: 0,
    status: "Rupture",
    image: "/colorful-kids-sweater.png",
    sales: 28,
  },
  {
    id: "5",
    name: "Veste Homme Décontractée",
    category: "Hommes",
    price: "€129.99",
    stock: 12,
    status: "Actif",
    image: "/casual-mens-jacket.png",
    sales: 19,
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Gestion des produits</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de produits</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un produit..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Produits ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-16 h-16 bg-background rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium">{product.price}</span>
                    <Badge variant={product.status === "Actif" ? "default" : "destructive"} className="text-xs">
                      {product.status}
                    </Badge>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">Stock: {product.stock}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
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
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total produits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "Actif").length}</p>
                <p className="text-sm text-muted-foreground">Produits actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock === 0).length}</p>
                <p className="text-sm text-muted-foreground">Ruptures de stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
