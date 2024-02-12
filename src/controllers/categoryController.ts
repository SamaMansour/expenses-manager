import { Request, Response } from 'express';
import Category from '../models/category';

export async function createCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const userId = (req.user as any).id;

    
    try {
        const newCategory = await Category.create({ name, userId });
        res.status(201).json(newCategory); // Respond with the newly created category object
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category' });
    }
}

export async function listCategories(req: Request, res: Response): Promise<void> {
    try {
        const categories = await Category.findAll();
        res.json(categories); // Respond with the list of categories as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
}


export async function editCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        category.name = name;
        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating category' });
    }
}


export async function getCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching category' });
    }
}

