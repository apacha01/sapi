import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino-http';
import helmet from 'helmet';
import { errorHandler, logger, pageNotFound } from './middlewares/error-handler.js';
import { router as v1Router } from './v1/v1-routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Security Best Practices: https://expressjs.com/en/advanced/best-practice-security.html
app.disable('x-powered-by');
app.use(helmet());

app.use(cors());
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