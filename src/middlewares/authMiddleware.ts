import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };

            req.user = await User.findById(decoded.id).select('-password') as IUser;
            next();
            return; // Add return to prevent further execution
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
            return; // Add return to prevent further execution
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return; // Add return to prevent further execution
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: `User role ${req.user?.role} is not authorized to access this route` });
            return; // Add return to prevent further execution
        }
        next();
    };
};
