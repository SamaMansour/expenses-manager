// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import { Category } from '../models/category';

export async function createCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const userId = 8; // Assuming req.user is populated by Passport.js after successful authentication
    
    try {
        const newCategory = await Category.create({ name, userId });
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category' });
    }
}

export async function listCategories(req: Request, res: Response): Promise<void> {
    const userId =  8;
    
    try {
        const categories = await Category.findAll({ where: { userId } });
        res.render('categories/list', { categories }); // For web applications
        // Or for APIs: res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
}

// Implement updateCategory, getCategory, and deleteCategory similarly, ensuring each operation is scoped to the authenticated user.
