import Product from '../models/productModel.js'
import Fuse from 'fuse.js'

export const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message requis' });

    // load product documents (limit to recent 200 for performance)
    const products = await Product.find({}).select('name description category price sizes colors isNew isSale').limit(200).lean()

    // if no products, simple fallback
    if (!products || products.length === 0) {
      return res.json({ reply: `Désolé, je n'ai pas de catalogue pour le moment. Vous avez dit: "${message}".` })
    }

    // build Fuse index
    const fuse = new Fuse(products, {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.5 },
        { name: 'category', weight: 0.3 }
      ],
      threshold: 0.4,
      includeScore: true,
      useExtendedSearch: true,
    })

    // search
    const results = fuse.search(message, { limit: 5 })

    if (!results || results.length === 0) {
      return res.json({ reply: `Je n'ai pas trouvé de produit correspondant à votre demande. Vous avez dit: "${message}".` })
    }

    // craft a helpful reply summarizing top matches
    const top = results.slice(0, 3).map(r => r.item)
    let reply = `Voici quelques produits pertinents que j'ai trouvés pour "${message}":\n\n`
    top.forEach((p, i) => {
      reply += `${i + 1}. ${p.name} — ${p.category} — ${p.isSale ? 'En promotion — ' : ''}${p.isNew ? 'Nouveauté — ' : ''}Prix: ${p.price}€\n`
      if (p.sizes && p.sizes.length) reply += `   Tailles: ${p.sizes.join(', ')}\n`
    })
    reply += `\nSi vous voulez plus de détails sur un produit, dites-moi lequel (par exemple: "Plus d'infos sur 1" ou "Afficher le produit 2").`

    return res.json({ reply })
  } catch (err) {
    console.error('chatbot error', err)
    return res.status(500).json({ error: 'Erreur du chatbot' })
  }
}