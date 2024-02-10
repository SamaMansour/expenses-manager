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

// Home route
app.get('/', (req, res) => res.render('index'));

// Sync Sequelize models and start Express server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Sequelize sync error:', err));
