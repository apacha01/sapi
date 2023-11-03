import express from 'express';
import cors from 'cors';
import './lib/utils/setup.js';
import helmet from 'helmet';
import errorHandler from './lib/errors/error-handler.js';
import pageNotFound from './middlewares/page-not-found.js';
import loggerMiddleware from './middlewares/http-logger.js';
import { router as v1Router } from './v1/v1-routes.js';
import logger from './lib/utils/logger.js';

process.on('unhandledRejection', errorHandler.handleError);
process.on('uncaughtException', errorHandler.handleError);


const PORT = process.env.PORT || 3000;

const app = express();

// Security Best Practices: https://expressjs.com/en/advanced/best-practice-security.html
app.disable('x-powered-by');
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// v1 Routes
app.use('/api/v1', v1Router);

app.use(pageNotFound);
app.use((error, request, response, next) => {
	errorHandler.handleError(error, response);
});

app.listen(PORT, () => {
	logger.info(`API is listening on port ${PORT}`);
});