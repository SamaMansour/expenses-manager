import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: Express.User; 
}

export const ensureAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    // If not authenticated, redirect to login page or send an appropriate response
    res.redirect('/users/login'); 
};
