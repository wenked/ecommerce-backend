import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://127.0.0.1',
			'http://104.142.122.231',
		],
		credentials: true,
		exposedHeaders: ['access-token'],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(routes);

(async () => {
	try {
		await createConnection();

		app.listen(process.env.PORT, () => {
			console.log(`Server is up and listening on port ${process.env.PORT}.`);
		});
	} catch (err) {
		console.log(err);
	}
})();
