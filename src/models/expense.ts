// models/expense.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Category from './category';
import User from './user'; // Import the User model if you're associating expenses with users

class Expense extends Model {
  declare id: number; // Assuming you have an ID field
  declare amount: number;
  declare date: Date;
  declare categoryId: number;
  declare userId: number; // Include this if you're associating expenses with users
}

Expense.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: DataTypes.FLOAT,
  date: DataTypes.DATE,
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: 'Categories', key: 'id' }, // Ensure this matches your Category model/table name
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }, // Ensure this matches your User model/table name, include only if associating with User
  },
}, { sequelize, modelName: 'expense' });

// Association with Category
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Association with User (include this only if you're indeed associating expenses with users)
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Expense; // Exporting the initialized model
