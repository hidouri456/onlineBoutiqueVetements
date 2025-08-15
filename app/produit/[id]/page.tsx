"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock product data
const product = {
  id: 1,
  name: "Robe Élégante Noire",
  price: 89,
  originalPrice: 120,
  description:
    "Une robe élégante parfaite pour toutes les occasions spéciales. Confectionnée dans un tissu de haute qualité, elle offre un confort exceptionnel tout en conservant une silhouette flatteuse.",
  images: [
    "/elegant-black-dress.png",
    "/elegant-black-dress-2.png",
    "/elegant-black-dress-3.png",
    "/elegant-black-dress-4.png",
  ],
  category: "Robes",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Noir", value: "#000000" },
    { name: "Bleu marine", value: "#1e3a8a" },
  ],
  isNew: true,
  isSale: true,
  rating: 4.5,
  reviewCount: 127,
  inStock: true,
  features: [
    "Tissu premium 95% polyester, 5% élasthanne",
    "Coupe ajustée et flatteuse",
    "Fermeture éclair invisible au dos",
    "Doublure intérieure pour plus de confort",
    "Lavage en machine à 30°C",
  ],
  sizeGuide: {
    XS: { chest: "82-86", waist: "62-66", hips: "88-92" },
    S: { chest: "86-90", waist: "66-70", hips: "92-96" },
    M: { chest: "90-94", waist: "70-74", hips: "96-100" },
    L: { chest: "94-98", waist: "74-78", hips: "100-104" },
    XL: { chest: "98-102", waist: "78-82", hips: "104-108" },
  },
}

const relatedProducts = [
  {
    id: 2,
    name: "Blouse Soie Crème",
    price: 65,
    image: "/silk-cream-blouse.png",
  },
  {
    id: 3,
    name: "Veste Blazer Moderne",
    price: 120,
    image: "/modern-blazer.png",
  },
  {
    id: 4,
    name: "Jupe Midi Plissée",
    price: 55,
    image: "/pleated-midi-skirt.png",
  },
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille")
      return
    }
    // TODO: Implement add to cart logic
    console.log("[v0] Add to cart:", {
      productId: product.id,
      size: selectedSize,
      color: selectedColor.name,
      quantity,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/femmes" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-accent" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.isNew && <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>}
                {product.isSale && <Badge className="bg-destructive text-destructive-foreground">Promo</Badge>}
              </div>
              <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">€{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">€{product.originalPrice}</span>
                )}
                {product.isSale && (
                  <Badge variant="outline" className="text-destructive border-destructive">
                    -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">Couleur</Label>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name ? "border-accent scale-110" : "border-muted-foreground/30"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{selectedColor.name}</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Taille</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Quantité</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Ajouter au panier - €{product.price * quantity}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Ajouter aux favoris
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">Livraison gratuite</p>
                <p className="text-xs text-muted-foreground">Dès 50€ d'achat</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">Retours gratuits</p>
                <p className="text-xs text-muted-foreground">30 jours</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">Paiement sécurisé</p>
                <p className="text-xs text-muted-foreground">SSL & 3D Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="size-guide">Guide des tailles</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <h4 className="font-semibold mb-3">Caractéristiques :</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="size-guide" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Guide des tailles (en cm)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Taille</th>
                          <th className="text-left p-2">Tour de poitrine</th>
                          <th className="text-left p-2">Tour de taille</th>
                          <th className="text-left p-2">Tour de hanches</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                          <tr key={size} className="border-b">
                            <td className="p-2 font-medium">{size}</td>
                            <td className="p-2">{measurements.chest}</td>
                            <td className="p-2">{measurements.waist}</td>
                            <td className="p-2">{measurements.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Les avis clients seront bientôt disponibles.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold mb-8">Produits similaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">€{relatedProduct.price}</span>
                      <Button size="sm">Voir détails</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
