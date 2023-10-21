import express from 'express';
import { router as v1PetsRouter } from './v1/routes/pets-routes.js';
import { router as v1TokensRouter } from './v1/routes/tokens-routes.js';
import { router as v1LoginRouter } from './v1/routes/login-routes.js';
import { router as v1UsersRouter } from './v1/routes/users-routes.js';
import { errorHandler, logger, pageNotFound } from './middlewares/error-handler.js';
import dotenv from 'dotenv';
import pino from 'pino-http';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(pino());
app.use(express.json());

// v1 Routes
app.use('/api/v1/pets', v1PetsRouter);
app.use('/api/v1/tokens', v1TokensRouter);
app.use('/api/v1/login', v1LoginRouter);
app.use('/api/v1/users', v1UsersRouter);

app.use(pageNotFound);
app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});