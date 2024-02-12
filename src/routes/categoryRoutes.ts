import express from 'express';
import { createCategory, listCategories, editCategory, getCategory } from '../controllers/categoryController';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *         userId:
 *           type: integer
 *           description: The user ID associated with the category.
 *       example:
 *         id: 1
 *         name: Grocery
 *         userId: 8
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   - name: Category
 *     description: Operations related to categories.
 */

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
 *                 description: The name of the category.
 *                 example: Grocery
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       401:
 *         description: Unauthorized due to missing or invalid JWT token.
 */


router.post('/create', ensureAuthenticated, createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of all categories for the authenticated user.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *              
 *       401:
 *         description: Unauthorized access.
 */

router.get('/', ensureAuthenticated, listCategories);

/**
 * @swagger
 * /categories/categories/{id}:
 *   put:
 *     summary: Update an existing category by its ID.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to be updated.
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
 *                 description: The new name of the category.
 *                 example: Utilities
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Category not found.
 *       401:
 *         description: Unauthorized access.
 */


router.put('/categories/:id', ensureAuthenticated, editCategory);

/**
 * @swagger
 * /categories/categories/{id}:
 *   get:
 *     summary: Retrieve a single category by its ID.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: A single category detail.
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
