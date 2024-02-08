import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Import your DB connection

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

export default User;
