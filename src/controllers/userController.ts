import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, generateToken } from '../utils/auth';
import { Op } from 'sequelize';

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

    // Optionally, generate a token or perform any post-registration logic
    // const token = generateToken({ id: newUser.id, username: newUser.username });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
