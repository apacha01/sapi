import express from 'express';
import { router as v1PetsRouter } from './v1/routes/pets-routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// v1 Routes
app.use('/api/v1/pets', v1PetsRouter);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});