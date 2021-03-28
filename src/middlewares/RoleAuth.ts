import { NextFunction, Request, Response } from 'express';

export const RoleAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAdmin) {
		return res.status(400).json({ error: 'User not authorized' });
	}

	return next();
};
