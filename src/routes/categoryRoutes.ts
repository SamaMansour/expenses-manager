// src/routes/categoryRoutes.ts
import express from 'express';
import { createCategory, listCategories, editCategory, getCategory } from '../controllers/categoryController';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.post('/create', createCategory);
router.get('/', listCategories);
router.put('/categories/:id', editCategory);
router.get('/categories/:id', getCategory);

// Define other routes (update, delete, get) here, also protected by ensureAuthenticated

export default router;
