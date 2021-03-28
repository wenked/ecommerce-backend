import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { EcommerceUser } from '../entity/EcommerceUser';

declare global {
	namespace Express {
		interface Request {
			userID: number;
		}
	}
}

interface userPayload {
	email: string;
	id: number;
	iat: number;
}

export const createTokens = (ecommerceUser: EcommerceUser) => {
	const acessToken = sign(
		{ email: ecommerceUser.email, id: ecommerceUser.id },
		'lembrademudar',
		{ expiresIn: 86400 }
	);

	return acessToken;
};

export const validateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const acessToken = req.cookies['access-token'];

	if (!acessToken)
		return res.status(400).json({ error: 'User not authenticated' });

	try {
		const validToken = verify(acessToken, 'lembrademudar') as userPayload;
		console.log(validToken);
		if (validToken) {
			req.userID = validToken.id;

			return next();
		}
	} catch (err) {
		return res.status(400).json({ error: err });
	}
};
