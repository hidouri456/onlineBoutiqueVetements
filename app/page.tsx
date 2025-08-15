import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Menu, User } from "lucide-react"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-foreground">Boutique Mode</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/femmes" className="text-foreground hover:text-accent transition-colors">
                Femmes
              </Link>
              <Link href="/hommes" className="text-foreground hover:text-accent transition-colors">
                Hommes
              </Link>
              <Link href="/enfants" className="text-foreground hover:text-accent transition-colors">
                Enfants
              </Link>
              <Link href="/nouveautes" className="text-foreground hover:text-accent transition-colors">
                Nouveautés
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <CartIcon />
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              Collection Automne/Hiver 2024
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez notre nouvelle collection de vêtements tendance pour toute la famille. Style, confort et qualité
              réunis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Découvrir la collection
              </Button>
              <Button variant="outline" size="lg">
                Voir les nouveautés
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">Nos Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-[4/5] bg-muted rounded-t-lg">
                  <img
                    src="/elegant-woman-fashion.png"
                    alt="Collection Femmes"
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-semibold mb-2">Femmes</h4>
                  <p className="text-muted-foreground mb-4">Élégance et modernité pour la femme d'aujourd'hui</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-[4/5] bg-muted rounded-t-lg">
                  <img
                    src="/stylish-men-fashion.png"
                    alt="Collection Hommes"
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-semibold mb-2">Hommes</h4>
                  <p className="text-muted-foreground mb-4">Style raffiné et décontracté pour l'homme moderne</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-[4/5] bg-muted rounded-t-lg">
                  <img
                    src="/cute-children-fashion.png"
                    alt="Collection Enfants"
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-semibold mb-2">Enfants</h4>
                  <p className="text-muted-foreground mb-4">Confort et style pour les plus petits</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-serif font-bold">Produits Vedettes</h3>
            <Button variant="outline">Voir tout</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-background rounded-t-lg relative">
                    <img
                      src={`/trendy-fashion-item.png?height=300&width=300&query=trendy fashion item ${item}`}
                      alt={`Produit ${item}`}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Nouveau</Badge>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Produit Tendance {item}</h4>
                    <p className="text-sm text-muted-foreground mb-2">Description du produit</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">€{29 + item * 10}</span>
                      <AddToCartButton
                        product={{
                          id: `product-${item}`,
                          name: `Produit Tendance ${item}`,
                          price: 29 + item * 10,
                          image: `/trendy-fashion-item.png?height=300&width=300&query=trendy fashion item ${item}`,
                          category: "nouveautés",
                        }}
                        variant="default"
                        className="text-xs px-3 py-1 h-8"
                      >
                        Ajouter
                      </AddToCartButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-accent text-accent-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Restez à la Mode</h3>
              <p className="text-accent-foreground/80 mb-6 max-w-2xl mx-auto">
                Inscrivez-vous à notre newsletter pour recevoir les dernières tendances, offres exclusives et nouveautés
                en avant-première.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 rounded-md bg-background text-foreground border border-border"
                />
                <Button variant="secondary">S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-serif font-bold mb-4">Boutique Mode</h4>
              <p className="text-primary-foreground/80">Votre destination mode pour toute la famille depuis 2024.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Collections</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/femmes" className="hover:text-primary-foreground transition-colors">
                    Femmes
                  </Link>
                </li>
                <li>
                  <Link href="/hommes" className="hover:text-primary-foreground transition-colors">
                    Hommes
                  </Link>
                </li>
                <li>
                  <Link href="/enfants" className="hover:text-primary-foreground transition-colors">
                    Enfants
                  </Link>
                </li>
                <li>
                  <Link href="/nouveautes" className="hover:text-primary-foreground transition-colors">
                    Nouveautés
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Service Client</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/livraison" className="hover:text-primary-foreground transition-colors">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link href="/retours" className="hover:text-primary-foreground transition-colors">
                    Retours
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Mon Compte</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/connexion" className="hover:text-primary-foreground transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link href="/inscription" className="hover:text-primary-foreground transition-colors">
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link href="/commandes" className="hover:text-primary-foreground transition-colors">
                    Mes commandes
                  </Link>
                </li>
                <li>
                  <Link href="/favoris" className="hover:text-primary-foreground transition-colors">
                    Mes favoris
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Boutique Mode. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
