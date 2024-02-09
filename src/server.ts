import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passport'; // Adjust the path according to your project structure
import sequelize from './db';
import userRoutes from './routes/userRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'yourSecretKey', // Replace 'yourSecretKey' with a real secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using HTTPS, false for HTTP
}));

// Initialize Passport and its session management
app.use(passport.initialize());
app.use(passport.session());

// Define routes after session and passport initialization
app.use('/users', userRoutes);

// Sync database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
