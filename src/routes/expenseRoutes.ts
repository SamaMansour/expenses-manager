import express from 'express';
import { createExpense, deleteExpense, listExpenses, editExpense } from '../controllers/expenseController';
import { ensureAuthenticated } from '../middlewares/auth';


const router = express.Router();
/**
 * @swagger
 * /expenses/create:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
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
 *                 example: 50.0
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2023-01-01'
 *               categoryId:
 *                 type: integer
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
 * /expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 75.0
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2023-02-01'
 *               categoryId:
 *                 type: integer
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
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to delete
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
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose expenses to retrieve
 *       - in: query
 *         name: period
 *         required: false
 *         schema:
 *           type: string
 *           enum: [day, month, year]
 *         description: The period to filter expenses by ('day', 'month', 'year')
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The specific date to filter expenses, format depends on the period ('YYYY-MM-DD' for day, 'YYYY-MM' for month, 'YYYY' for year)
 *     responses:
 *       200:
 *         description: A list of filtered expenses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Bad request, invalid parameters
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Server error
 */

router.get('/', ensureAuthenticated, listExpenses);

export default router;
