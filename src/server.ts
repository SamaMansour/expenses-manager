import express, { Express } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './db'; // Adjust based on your project structure
import userRoutes from './routes/userRoutes'; // Routes for user authentication
import categoryRoutes from './routes/categoryRoutes'; // Routes for category management
import { ensureAuthenticated } from './middlewares/auth'; // Middleware to check authentication
import passport from './config/passport'; // Adjust the path according to your project structure
import expenseRoutes from './routes/expenseRoutes'; // Routes for category management


dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Expense Tracker API',
    version: '1.0.0',
    description: 'API for tracking expenses',
  },
  servers: [{
    url: 'http://localhost:3000',
    description: 'Local server',
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    BearerAuth: []
  }],
};



// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // This glob pattern includes all TypeScript files in the routes directory
};

const swaggerSpec = swaggerJsdoc(options);

// EJS view engine setup
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


// Static files
app.use(express.static('public'));

// Routes
app.use('/users', userRoutes);
app.use('/categories',  categoryRoutes); // Protect all category routes
app.use('/expenses',  expenseRoutes); // Protect all category routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(JSON.stringify(swaggerSpec, null, 2));
// Home route
app.get('/', (req, res) => res.render('index'));

// Sync Sequelize models and start Express server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Sequelize sync error:', err));
