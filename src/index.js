import express from 'express';
import { router as v1PetsRouter } from './v1/routes/pets-routes.js';
import { router as v1TokensRouter } from './v1/routes/tokens-routes.js';
import { errorHandler, logger, pageNotFound } from './middlewares/error-handler.js';
import pino from 'pino-http';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(pino());
app.use(express.json());

// v1 Routes
app.use('/api/v1/pets', v1PetsRouter);
app.use('/api/v1/tokens', v1TokensRouter);

app.use(pageNotFound);
app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});