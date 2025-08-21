"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les options de la boutique</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Général</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Aucune configuration disponible pour le moment.</p>
          <div className="mt-4">
            <Button variant="outline">Ajouter une configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
