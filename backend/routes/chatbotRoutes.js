import express from 'express';
const router = express.Router();
import { askChatbot } from '../controllers/chatbotController.js';

// Endpoint pour discuter avec le chatbot
router.post('/ask', askChatbot);

export default router;