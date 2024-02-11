// src/models/category.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './user'; // Make sure this import matches the export of your User model
import Expense from './expense'; // Assuming Expense exports a Sequelize model instance

class Category extends Model {
    declare id: number;
    declare name: string;
    declare userId: number;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'category', // Define the model name
});

// Associate Category to User
// This assumes that the User model has a corresponding hasMany association to Category.
Category.belongsTo(User, { 
    foreignKey: 'userId', // Ensure this matches the foreign key in the User model's hasMany association
    as: 'user', // Optional: define an alias for when you're including User in your queries
});

// Associate Category to Expense
// This establishes a one-to-many relationship where a Category can have many Expenses

export default Category; // Exporting the initialized model
