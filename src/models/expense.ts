// models/expense.ts
import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';

export class Expense extends Model {
    amount: any;
    date: any;
    categoryId: any;
}
Expense.init({
  amount: DataTypes.FLOAT,
  date: DataTypes.DATE,
  categoryId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
}, { sequelize, modelName: 'expense' });
