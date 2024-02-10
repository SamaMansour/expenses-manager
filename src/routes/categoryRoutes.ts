// src/routes/categoryRoutes.ts
import express from 'express';
import { createCategory, listCategories } from '../controllers/categoryController';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.post('/create', ensureAuthenticated, createCategory);
router.get('/', ensureAuthenticated, listCategories);

// Define other routes (update, delete, get) here, also protected by ensureAuthenticated

export default router;
