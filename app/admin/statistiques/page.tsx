"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Statistiques</h1>
        <p className="text-muted-foreground">Vue d'ensemble des indicateurs clés</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Aucune donnée disponible pour le moment.</p>
        </CardContent>
      </Card>
    </div>
  )
}
