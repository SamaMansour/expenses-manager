import express from 'express';
import { createExpense, deleteExpense, listExpenses } from '../controllers/expenseController';

const router = express.Router();

router.post('/create', createExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/', listExpenses);

export default router;
