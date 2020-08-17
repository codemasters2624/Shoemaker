import express from 'express';

import router from './routes/router';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});
