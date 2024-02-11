// src/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL!, // Use the DATABASE_URL env variable or specify your connection string here
  {
    dialect: 'postgres', // This specifies that you are using PostgreSQL
    host: process.env.DB_HOST || "localhost",
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true' ? { // Optional: For Heroku or other cloud services requiring SSL
        require: true,
        rejectUnauthorized: false
      } : false,
    }
  }
);

export default sequelize;
