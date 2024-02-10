// src/routes/categoryRoutes.ts
import express from 'express';
import { createCategory, listCategories, editCategory, getCategory } from '../controllers/categoryController';
import { ensureAuthenticated } from '../middlewares/auth';


const router = express.Router();

/**
 * @swagger
 * /categories/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grocery
 *               userId:
 *                 type: number
 *                 example: 8
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/create', ensureAuthenticated, createCategory);
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized access.
 */

router.get('/', ensureAuthenticated, listCategories);
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category.
 *                 example: Utilities
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input provided.
 *       404:
 *         description: Category not found.
 *       401:
 *         description: Unauthorized access.
 */

router.put('/categories/:id', ensureAuthenticated, editCategory);
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a single category by its ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       401:
 *         description: Unauthorized access.
 */

router.get('/categories/:id', ensureAuthenticated, getCategory);


export default router;
