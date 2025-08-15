"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "CMD-" + Math.random().toString(36).substr(2, 6).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-2">Commande confirmée !</h1>
            <p className="text-muted-foreground">Merci pour votre achat. Votre commande a été traitée avec succès.</p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="font-serif">Détails de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Numéro de commande</span>
                <Badge variant="secondary" className="font-mono">
                  {orderNumber}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Date de commande</span>
                <span>{new Date().toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Livraison estimée</span>
                <span className="text-green-600 font-medium">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Mode de livraison</span>
                <span>Livraison standard gratuite</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="font-serif">Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email de confirmation envoyé</p>
                    <p className="text-sm text-muted-foreground">
                      Vérifiez votre boîte mail pour les détails de votre commande
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Préparation de votre commande</p>
                    <p className="text-sm text-muted-foreground">Nous préparons vos articles avec soin</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Expédition et livraison</p>
                    <p className="text-sm text-muted-foreground">Livraison estimée le {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full bg-transparent">
                Suivre ma commande
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Télécharger la facture
              </Button>
            </div>

            <Link href="/">
              <Button className="w-full" size="lg">
                Continuer mes achats
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Support */}
          <Card className="mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="font-serif font-semibold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-muted-foreground mb-4">Notre équipe est là pour vous accompagner</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm">
                  Contacter le support
                </Button>
                <Button variant="outline" size="sm">
                  FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
