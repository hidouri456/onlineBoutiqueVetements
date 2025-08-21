export const askChatbot = async (req, res) => {
  const { message } = req.body;
  // TODO: Intégration API externe ou IA locale
  if (!message) return res.status(400).json({ error: 'Message requis' });

 
  res.json({
    reply: `Bot: Vous avez dit "${message}". Un conseiller vous répondra bientôt !`
  });
};