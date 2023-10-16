import express from 'express';
import { router as v1PetsRouter } from './v1/routes/pets-routes.js';
import errorsController from './controllers/error-controller.js';
import pino from 'pino-http';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(pino());

// v1 Routes
app.use('/api/v1/pets', v1PetsRouter);
app.use('*', errorsController.notFound);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});