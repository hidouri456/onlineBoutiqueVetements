import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

function getOpenAiKey() {
  const key = process.env.OPENAI_API_KEY || process.env.OPENAI_API_key
  return key
}

export async function GET() {
  const key = getOpenAiKey()
  const isMock = !key || key === "sk-REPLACE_ME" || key.trim() === ""
  return new Response(JSON.stringify({ mock: isMock }), { headers: { 'Content-Type': 'application/json' } })
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const key = getOpenAiKey()
  if (!key || key === "sk-REPLACE_ME" || key.trim() === "") {
    // Fallback mock: generate a simple helpful response in French without calling OpenAI
    const userMessages = messages.filter((m: any) => m.role === 'user').map((m: any) => m.content).join('\n')
    const mockReply = `Bonjour ! Je suis le mode dégradé du chatbot. Je n'ai pas accès à l'API OpenAI ici. Vous avez dit : "${userMessages || '...'}". Comment puis-je vous aider autrement ?`
    return new Response(JSON.stringify({ message: mockReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const systemPrompt = `Tu es l'assistant virtuel de "Boutique Mode", une boutique en ligne française spécialisée dans les vêtements pour toute la famille (femmes, hommes, enfants).

INFORMATIONS SUR LA BOUTIQUE:
- Boutique de mode française fondée en 2024
- Collections pour femmes, hommes et enfants
- Livraison gratuite pour toute commande supérieure à 50€
- Retours gratuits sous 30 jours
- Service client disponible 7j/7
- Paiement sécurisé par carte bancaire
- Délai de livraison standard: 2-3 jours ouvrés

PRODUITS DISPONIBLES:
- Femmes: robes, chemisiers, pantalons, jupes, vestes, accessoires
- Hommes: chemises, pantalons, vestes, t-shirts, pulls
- Enfants: vêtements confortables et tendance pour tous âges
- Tailles disponibles: XS à XXL pour adultes, 2 ans à 16 ans pour enfants

SERVICES:
- Guide des tailles interactif
- Recommandations personnalisées
- Suivi de commande en temps réel
- Programme de fidélité
- Newsletter avec offres exclusives

INSTRUCTIONS:
- Réponds toujours en français
- Sois chaleureux, professionnel et serviable
- Aide avec les questions sur les produits, tailles, commandes, livraisons
- Propose des recommandations basées sur les besoins du client
- Si tu ne connais pas une information spécifique, propose de contacter le service client
- Utilise des emojis avec modération pour rendre la conversation plus amicale
- Encourage les achats de manière subtile et naturelle

Tu peux aider avec:
✅ Conseils de style et recommandations
✅ Guide des tailles et ajustement
✅ Informations sur les produits
✅ Suivi de commandes
✅ Politique de retour et échange
✅ Délais de livraison
✅ Méthodes de paiement
✅ Offres et promotions

Commence toujours par être accueillant et demande comment tu peux aider le client aujourd'hui.`

  // Note: @ai-sdk/openai will read the OPENAI_API_KEY from process.env automatically
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
