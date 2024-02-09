// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
import { ensureAuthenticated } from '../middlewares/auth'; // Middleware to check if the user is authenticated
const { listCategories, getCategory, showCreateForm, createCategory, showEditForm, editCategory } = require('../controllers/categoryController');

// Use ensureAuthenticated on all category routes
router.get('/', ensureAuthenticated, listCategories);
router.get('/create', ensureAuthenticated, showCreateForm);
router.post('/create', ensureAuthenticated, createCategory);
router.get('/edit/:id', ensureAuthenticated, showEditForm);
router.post('/edit/:id', ensureAuthenticated, editCategory);
router.get('/:id', ensureAuthenticated, getCategory);


export default router;

