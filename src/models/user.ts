// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Importing the configured Sequelize instance

export class User extends Model {
    id!: number; // Adding the id property
    username!: string;
    email!: string;
    password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

export default User;
