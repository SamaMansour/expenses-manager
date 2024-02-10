import express from 'express';
import { createExpense, deleteExpense, listExpenses, editExpense } from '../controllers/expenseController';
import { ensureAuthenticated } from '../middlewares/auth';


const router = express.Router();

router.post('/create', ensureAuthenticated, createExpense);
router.put('/expenses/:id', ensureAuthenticated, editExpense);
router.delete('/expenses/:id', ensureAuthenticated, deleteExpense);
router.get('/', ensureAuthenticated, listExpenses);

export default router;
