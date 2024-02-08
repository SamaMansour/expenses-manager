import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = generateToken(user);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
