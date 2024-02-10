// src/models/category.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db';
import { User } from './user';

export class Category extends Model {
    declare id: number;
    declare name: string;
    declare userId: number;
}

Category.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'category' });

Category.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Category, { foreignKey: 'userId' });
