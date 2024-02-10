// controllers/expenseController.ts
import { Request, Response } from 'express';
import { Expense } from '../models/expense';
import sequelize from '../db'; 
import { Category } from '../models/category';


export async function createExpense(req: Request, res: Response) {
  const { userId, categoryId, amount, date } = req.body;
  try {
    const expense = await Expense.create({ userId, categoryId, amount, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
}

export async function deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await Expense.destroy({ where: { id } });
      if (result === 0) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting expense' });
    }
  }

  export async function editExpense(req: Request, res: Response): Promise<void> {
    const { id } = req.params; 
    const { userId, amount, date, categoryId } = req.body; // Updated expense data from the request body

    try {
        
        const expense = await Expense.findOne({ where: { id, userId } });

        if (!expense) {
            // Expense not found or does not belong to the user
            res.status(404).json({ message: 'Expense not found or access denied' });
            return;
        }

        // Update the expense with new values
        expense.amount = amount !== undefined ? amount : expense.amount;
        expense.date = date || expense.date;
        expense.categoryId = categoryId !== undefined ? categoryId : expense.categoryId;

        // Save the updated expense
        await expense.save();

        // Respond with the updated expense data
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating expense' });
    }
}


  export async function listExpenses(req: Request, res: Response) {
    const { userId, period, date } = req.query; // period: 'day' | 'month' | 'year'
    let whereClause = {};
    switch (period) {
      case 'day':
        whereClause = sequelize.where(sequelize.fn('date', sequelize.col('date')), '=', date);
        break;
      case 'month':
        whereClause = sequelize.where(sequelize.fn('date_trunc', 'month', sequelize.col('date')), '=', sequelize.fn('date_trunc', 'month', date));
        break;
      case 'year':
        whereClause = sequelize.where(sequelize.fn('date_trunc', 'year', sequelize.col('date')), '=', sequelize.fn('date_trunc', 'year', date));
        break;
    }
    try {
      const expenses = await Expense.findAll({
        where: { userId, ...whereClause },
        include: [{ model: Category }],
      });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error listing expenses' });
    }
  }
  