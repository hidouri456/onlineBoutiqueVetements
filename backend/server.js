import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import authRoutes from './routes/authRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// allow credentials so the frontend can receive/set HttpOnly cookies
app.use(cors({ origin: true, credentials: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);