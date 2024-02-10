import User from '../models/user';
import { hashPassword, generateToken } from '../utils/auth';
import { Op } from 'sequelize';

import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user with the same email or username
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
    if (existingUser) {
      return res.status(400).send('Email or username is already in use.');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ username, email, password: hashedPassword });

   

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
          return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
      }

      // User authenticated, generate a token
      const payload = { id: user.id, email: user.email }; // Customize payload as needed
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' }); // Adjust secret and expiration

      res.json({ message: 'Login successful', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
