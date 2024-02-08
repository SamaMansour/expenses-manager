import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Ensure this import path matches your project structure

export class Expense extends Model {
  public id!: number;
  public amount!: number;
  public description?: string;
  public date!: Date;
  public categoryId!: number;
  public userId!: number;
}

Expense.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale according to your needs
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(255), // Optional description of the expense
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY, // Stores only the date part (YYYY-MM-DD)
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'categories', // This should match the table name for categories
      key: 'id',
    }
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users', // This should match the table name for users
      key: 'id',
    }
  },
}, {
  tableName: 'expenses',
  sequelize, // Passing the Sequelize instance is required
});
