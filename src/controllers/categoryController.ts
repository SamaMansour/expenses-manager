import { Request, Response } from 'express';
import { Category } from '../models/category';

export const listCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user; // Assuming req.user is populated by authentication middleware
    const categories = await Category.findAll({
      where: { userId }
    });
    res.render('categories/list', { categories });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const showCreateForm = (req: Request, res: Response): void => {
  res.render('categories/create');
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = 7;
    await Category.create({ name, userId });
    res.redirect('/categories');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const showEditForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render('categories/edit', { category });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const editCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    await Category.update({ name }, {
      where: { id: req.params.id }
    });
    res.redirect('/categories');
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render('categories/detail', { category });
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};
