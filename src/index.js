import express from 'express';
import { errorHandler, logger, pageNotFound } from './middlewares/error-handler.js';
import dotenv from 'dotenv';
import pino from 'pino-http';
import { router as v1Router } from './v1/v1-routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(pino());
app.use(express.json());

// v1 Routes
app.use('/api/v1', v1Router);

app.use(pageNotFound);
app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});