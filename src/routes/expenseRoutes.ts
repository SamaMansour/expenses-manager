import express from 'express';
import { createExpense, deleteExpense, listExpenses, editExpense } from '../controllers/expenseController';

const router = express.Router();

router.post('/create', createExpense);
router.put('/expenses/:id', editExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/', listExpenses);

export default router;
