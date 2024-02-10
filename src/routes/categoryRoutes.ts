// src/routes/categoryRoutes.ts
import express from 'express';
import { createCategory, listCategories, editCategory, getCategory } from '../controllers/categoryController';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.post('/create', ensureAuthenticated, createCategory);
router.get('/', ensureAuthenticated, listCategories);
router.put('/categories/:id', ensureAuthenticated, editCategory);
router.get('/categories/:id', ensureAuthenticated, getCategory);


export default router;
