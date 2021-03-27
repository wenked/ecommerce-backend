import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import routes from './routes';

const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const app = express();

app.use(bodyParser.json());
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
