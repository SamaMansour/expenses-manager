# Expenses Manager

Project Name is a comprehensive expense tracking API that allows users to register, log in, manage expense categories, and record their expenses efficiently.

## Features

- User registration and authentication
- CRUD operations for expense categories
- Expense tracking and management
- Filtering expenses by day, month, or year

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT for authentication
- Swagger for API documentation

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- PostgreSQL


### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:
`git clone <repository-url>`


2. Install NPM packages:
`npm install`


3. Set up your PostgreSQL database and ensure it is running.

4. Create a `.env` file in the root directory of your project and add the necessary environment variables:

DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_DATABASE=<your-db-name>
DB_HOST=<your-db-host>
JWT_SECRET=<your-jwt-secret>

5. Create database expense_manager

`Create database expense_manager`

6. Restore db from dump, change file extension to .sql

`psql -U root -d expense_manager -f [backup_file_path]`

7. Run database migrations:
`npx sequelize-cli db:migrate`

8. Start the server:
`npm run dev`

8. Start docker
`docker compose up`

9. Run docker detached
`docker compose up -d`

## API Documentation

Access the Swagger UI for the API documentation at `http://localhost:3000/api-docs` after starting the server, where you can find detailed information about the API endpoints, request bodies, and responses.
