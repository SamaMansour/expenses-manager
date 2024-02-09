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

app.set('view engine', 'ejs');

// Set the directory where the views are stored
const path = require('path');
app.set('views', path.join(__dirname, 'views'));


// Define routes after session and passport initialization
app.use('/users', userRoutes);


app.get('/register', (req, res) => {
  res.render('register', { errors: [] }); // Initially, no errors
});

app.post('/register', (req, res) => {
  // After form submission, attempt user registration
  // If there are errors, re-render the registration page with error messages
  const errors: string | any[] = []; // Assume this array is filled based on validation results
  
  if (errors.length) {
    res.render('register', { errors });
  } else {
    // Proceed with registration logic and redirect or render as needed
  }
});

app.get('/login', (req, res) => {
  res.render('login', { errors: [] }); // Initially, no errors
});

app.post('/login', (req, res) => {
  // After form submission, attempt user login
  // If there are errors (e.g., wrong credentials), re-render the login page with error messages
  const errors: string | any[] = []; // Assume this array gets filled based on authentication results
  
  if (errors.length) {
    res.render('login', { errors });
  } else {
    // Proceed with login logic (e.g., setting session cookies) and redirect
  }
});



// Sync database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
