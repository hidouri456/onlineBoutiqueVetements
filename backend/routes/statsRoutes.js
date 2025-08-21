import express from 'express';
const router = express.Router();
import { getAppStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

router.route('/').get(protect, isAdmin, getAppStats);

export default router;