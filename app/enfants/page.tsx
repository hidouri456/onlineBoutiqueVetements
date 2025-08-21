"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Heart, ShoppingBag, Grid3X3, List, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Chemise en Coton Premium",
    price: 79,
    originalPrice: 110,
    image: "/premium-cotton-shirt.png",
    category: "Chemises",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Bleu ciel", "Gris"],
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Polo Classique Piqué",
    price: 55,
    image: "/classic-pique-polo.png",
    category: "Polos",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Noir", "Bleu marine", "Blanc"],
    isNew: false,
    isSale: false,
  },
  {
    id: 3,
    name: "Jean Slim Fit",
    price: 85,
    image: "/slim-fit-jeans.png",
    category: "Pantalons",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Bleu brut", "Noir délavé"],
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Veste Bomber Urbaine",
    price: 120,
    image: "/urban-bomber-jacket.png",
    category: "Vestes",
    sizes: ["S", "M", "L"],
    colors: ["Kaki", "Noir"],
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Pull en Laine Mérinos",
    price: 110,
    originalPrice: 150,
    image: "/merino-wool-sweater.png",
    category: "Pulls",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris chiné", "Bleu marine", "Bordeaux"],
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Pantalon Chino Confort",
    price: 69,
    image: "/comfort-chino-pants.png",
    category: "Pantalons",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Beige", "Gris anthracite", "Vert olive"],
    isNew: true,
    isSale: false,
  },
]

export default function HommesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = ["Chemises", "Polos", "Pantalons", "Vestes", "Pulls"]
  const sizes = ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"]
  const colors = ["Noir", "Blanc", "Gris", "Beige", "Bleu", "Vert", "Bordeaux", "Kaki"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size))
    const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color))
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return b.id - a.id // newest first
    }
  })

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

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
              <h1 className="text-2xl font-serif font-bold text-foreground">Collection Enfants</h1>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 space-y-6">
            <div>
              <h3 className="font-serif font-semibold mb-4">Recherche</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold mb-4">Catégorie</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-serif font-semibold mb-4">Tailles</h3>
              <div className="grid grid-cols-2 gap-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold mb-4">Couleurs</h3>
              <div className="grid grid-cols-2 gap-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                    />
                    <Label htmlFor={`color-${color}`} className="text-sm">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold mb-4">Prix</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    {/* Mobile filters content - same as desktop sidebar */}
                    <div className="space-y-6 mt-6">
                      <div>
                        <h3 className="font-serif font-semibold mb-4">Recherche</h3>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Rechercher un produit..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      {/* Add other filter sections here */}
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-muted-foreground">
                  {sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Plus récents</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="name">Nom A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
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
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
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
                      </>
                    ) : (
                      <div className="flex items-center p-4 space-x-4">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-lg font-bold">€{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    €{product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="icon">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button size="sm">Voir détails</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun produit ne correspond à vos critères de recherche.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedSizes([])
                    setSelectedColors([])
                    setPriceRange([0, 100])
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
