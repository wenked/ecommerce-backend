import { Router } from 'express';
import {
	Login,
	Logout,
	Me,
	Register,
	UpdateEcommerceUser,
} from './controllers/EcommerceUserController';
import {
	AddItem,
	ItemsList,
	RemoveItem,
	UpdateItem,
} from './controllers/ItemController';
import { validateToken } from './middlewares/Auth';
import { RoleAuth } from './middlewares/RoleAuth';

const routes = Router();

routes.get('/me', validateToken, Me);
routes.get('/itemslist', ItemsList);
routes.post('/additem', validateToken, RoleAuth, AddItem);
routes.post('/register', Register);
routes.post('/login', Login);
routes.get('/logout', validateToken, Logout);
routes.post('/updateuser', validateToken, UpdateEcommerceUser);
routes.post('/removeitem', validateToken, RemoveItem);
routes.post('/updateitem', validateToken, RoleAuth, UpdateItem);
export default routes;
