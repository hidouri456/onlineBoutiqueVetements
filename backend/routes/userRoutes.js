import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin, isSuperAdmin } from '../middleware/adminMiddleware.js';

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Admin & SuperAdmin routes
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isSuperAdmin, deleteUser);

export default router;