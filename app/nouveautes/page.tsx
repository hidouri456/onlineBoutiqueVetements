"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

// NOTE: Idéalement, ces données proviendraient d'un fichier centralisé ou d'une API.
const allProducts = [
  // Hommes
  {
    id: 101,
    name: "Chemise en Coton Premium",
    price: 79,
    originalPrice: 110,
    image: "/premium-cotton-shirt.png",
    category: "Hommes",
    isNew: true,
    isSale: true,
  },
  {
    id: 102,
    name: "Jean Slim Fit",
    price: 85,
    image: "/slim-fit-jeans.png",
    category: "Hommes",
    isNew: true,
    isSale: false,
  },
  // Femmes (données fictives)
  {
    id: 201,
    name: "Robe Florale d'Été",
    price: 95,
    image: "/floral-summer-dress.png",
    category: "Femmes",
    isNew: true,
    isSale: false,
  },
  {
    id: 202,
    name: "Blouse en Soie",
    price: 65,
    originalPrice: 80,
    image: "/silk-blouse.png",
    category: "Femmes",
    isNew: true,
    isSale: true,
  },
  // Enfants
  {
    id: 301,
    name: "T-shirt Dinosaure Rigolo",
    price: 19,
    image: "/t-shirt-dinosaure.png",
    category: "Enfants",
    isNew: true,
    isSale: false,
  },
  {
    id: 302,
    name: "Ensemble Pyjama Étoilé",
    price: 25,
    image: "/pyjama-etoile.png",
    category: "Enfants",
    isNew: true,
    isSale: false,
  },
  // Un produit qui n'est pas nouveau pour tester le filtre
  {
    id: 103,
    name: "Polo Classique Piqué",
    price: 55,
    image: "/classic-pique-polo.png",
    category: "Hommes",
    isNew: false,
    isSale: false,
  },
];

// Filtrer pour ne garder que les nouveautés
const newProducts = allProducts.filter(product => product.isNew);

export default function NouveautesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Accueil
              </Link>
              <h1 className="text-2xl font-serif font-bold text-foreground">Nouveautés</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
            <p className="text-muted-foreground">
                {newProducts.length} produit{newProducts.length > 1 ? "s" : ""}
            </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-muted rounded-t-lg relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>}
                    {product.isSale && (
                      <Badge className="bg-destructive text-destructive-foreground">Promo</Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          €{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm">Voir détails</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {newProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun nouvel article pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

