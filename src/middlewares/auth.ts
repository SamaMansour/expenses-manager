import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Assuming the token is sent in the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        // Add the user payload to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
