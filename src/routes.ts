import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
	return res.json({ test: 'koe' });
});

export default routes;
