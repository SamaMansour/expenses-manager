import express from 'express';
import { createExpense, deleteExpense, listExpenses, editExpense } from '../controllers/expenseController';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       required:
 *         - amount
 *         - date
 *         - categoryId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the expense.
 *         amount:
 *           type: number
 *           description: The amount of the expense.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the expense.
 *         categoryId:
 *           type: integer
 *           description: The category ID of the expense.
 *         userId:
 *           type: integer
 *           description: The user ID associated with the expense.
 *       example:
 *         id: 1
 *         amount: 50.0
 *         date: '2023-01-01'
 *         categoryId: 1
 *         userId: 8
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: Bearer
 *       BearerFormat: JWT
 * tags:
 *   - name: Expenses
 *     description: Operations related to expenses.
 */

/**
 * @swagger
 * /expenses/create:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - date
 *               - categoryId
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the expense.
 *                 example: 50.0
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the expense.
 *                 example: '2023-01-01'
 *               categoryId:
 *                 type: integer
 *                 description: The category ID of the expense.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Expense created successfully.
 *       400:
 *         description: Invalid input provided.
 *       401:
 *         description: Unauthorized access.
 */

router.post('/create', ensureAuthenticated, createExpense);

/**
 * @swagger
 * /expenses/expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The new amount of the expense.
 *                 example: 75.0
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The new date of the expense.
 *                 example: '2023-02-01'
 *               categoryId:
 *                 type: integer
 *                 description: The new category ID of the expense.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Expense updated successfully.
 *       400:
 *         description: Invalid input provided.
 *       404:
 *         description: Expense not found.
 *       401:
 *         description: Unauthorized access.
 */

router.put('/expenses/:id', ensureAuthenticated, editExpense);

/**
 * @swagger
 * /expenses/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to delete.
 *     responses:
 *       204:
 *         description: Expense deleted successfully.
 *       404:
 *         description: Expense not found.
 *       401:
 *         description: Unauthorized access.
 */

router.delete('/expenses/:id', ensureAuthenticated, deleteExpense);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retrieve a list of expenses filtered by period
 *     tags: [Expenses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      
 *       - in: query
 *         name: period
 *         required: false
 *         schema:
 *           type: string
 *           enum: [day, month, year]
 *         description: The period to filter expenses by ('day', 'month', 'year').
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The specific date to filter expenses, format depends on the period ('YYYY-MM-DD' for day, 'YYYY-MM' for month, 'YYYY' for year).
 *     responses:
 *       200:
 *         description: A list of filtered expenses.
 *       400:
 *         description: Bad request, invalid parameters.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Server error.
 */

router.get('/', ensureAuthenticated, listExpenses);

export default router;
