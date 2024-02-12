// controllers/expenseController.ts
import { Request, Response } from 'express';
import Expense  from '../models/expense';
import sequelize from '../db'; 
import Category  from '../models/category';
import { Op, fn, col, WhereOptions } from 'sequelize';

export async function createExpense(req: Request, res: Response) {
  const userId = (req.user as any).id;
  const { categoryId, amount, date } = req.body;
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
    const { amount, date, categoryId } = req.body; // Updated expense data from the request body
    const userId = (req.user as any).id;


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


export async function listExpenses(req: Request, res: Response): Promise<void> {
  const { period, date } = req.query;
  const userId = (req.user as any).id;


  // Base where clause to filter by userId
  const whereClause: any = {
      userId: userId,
  };

  // Adjust whereClause based on period
  if (date) {
      switch (period) {
          case 'day':
              whereClause.date = date; // Direct comparison if the periods match exactly with date formats
              break;
          case 'month':
              // For month and year, use Op.gte and Op.lt to define a range
              const startDate = new Date(date as string);
              const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1); // Next month first day
              whereClause.date = {
                  [Op.gte]: startDate,
                  [Op.lt]: endDate,
              };
              break;
          case 'year':
              const startOfYear = new Date(date as string);
              const endOfYear = new Date(startOfYear.getFullYear() + 1, 0, 1); // First day of next year
              whereClause.date = {
                  [Op.gte]: startOfYear,
                  [Op.lt]: endOfYear,
              };
              break;
      }
  }

  try {
      const expenses = await Expense.findAll({
          include: [{ model: Category, as: 'category' }],
          where: whereClause,
      });

      res.json(expenses);
  } catch (error) {
      console.error('Error listing expenses:', error);
      res.status(500).json({ message: 'Error listing expenses' });
  }
}
