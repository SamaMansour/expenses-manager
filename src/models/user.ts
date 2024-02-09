// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Importing the configured Sequelize instance

export class User extends Model {
    password!: string;
}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

export default User;
