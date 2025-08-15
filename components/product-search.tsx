"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const mockProducts: Product[] = [
  { id: 1, name: "Robe Élégante Noire", price: 89, image: "/elegant-black-dress.png", category: "Robes" },
  { id: 2, name: "Blouse Soie Crème", price: 65, image: "/silk-cream-blouse.png", category: "Hauts" },
  { id: 3, name: "Jean Slim Taille Haute", price: 75, image: "/high-waist-jeans.png", category: "Pantalons" },
  { id: 4, name: "Veste Blazer Moderne", price: 120, image: "/modern-blazer.png", category: "Vestes" },
]

interface ProductSearchProps {
  onClose: () => void
}

export function ProductSearch({ onClose }: ProductSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {results.length > 0 && (
            <Card>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                    >
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline">{product.category}</Badge>
                          <span className="font-bold">€{product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {query && results.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Aucun produit trouvé pour "{query}"</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
