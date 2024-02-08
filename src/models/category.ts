import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Assuming you've set up your Sequelize connection as shown before

export class Category extends Model {
  public id!: number; // Note: using `public` is optional here, it's just for clarity
  public name!: string;
  public userId!: number; // Foreign key to reference User model
}

Category.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users', // This is the table name
      key: 'id', // This is the column in the users table that we will reference
    }
  },
}, {
  tableName: 'categories', // Explicitly specifying the table name is optional but recommended
  sequelize, // Passing the Sequelize instance is required
});
