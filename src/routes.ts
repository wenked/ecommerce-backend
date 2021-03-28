import { Router, Request, Response } from 'express';
import {
	Login,
	Me,
	Register,
	UpdateEcommerceUser,
} from './controllers/EcommerceUserController';
import { validateToken } from './middlewares/Auth';

const routes = Router();

routes.get('/me', validateToken, Me);
routes.get('/teste', validateToken, (req: Request, res: Response) => {
	return res.json('teste');
});
routes.post('/register', Register);
routes.post('/login', Login);
routes.post('/updateuser', validateToken, UpdateEcommerceUser);
export default routes;
