import express from 'express';

import router from './routes/router';

import mysql from 'mysql2';

let con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'shoemaker',
});

con.connect((error) => {
	if (error) {
		throw error;
	}

	console.log('Connected with database!');
});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});
