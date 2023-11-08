import express from 'express';
import { router as foodsRouter } from './routes/foods-routes.js';
import { router as loginRouter } from './routes/login-routes.js';
import { router as packsRouter } from './routes/packs-routes.js';
import { router as petsRouter } from './routes/pets-routes.js';
import { router as tokensRouter } from './routes/tokens-routes.js';
import { router as toysRouter } from './routes/toys-routes.js';
import { router as usersRouter } from './routes/users-routes.js';

const router = express.Router();

router
	.get('/', (req, res) => {
		res.send(
			{
				foods_url: 'https://HOSTING/api/v1/foods',
				login_url: 'https://HOSTING/api/v1/login',
				packs_url: 'https://HOSTING/api/v1/packs',
				pets_url: 'https://HOSTING/api/v1/pets',
				tokens_url: 'https://HOSTING/api/v1/tokens',
				toys_url: 'https://HOSTING/api/v1/toys',
				users_url: 'https://HOSTING/api/v1/users'
			}
		);
	})
	.use('/foods', foodsRouter)
	.use('/login', loginRouter)
	.use('/packs', packsRouter)
	.use('/pets', petsRouter)
	.use('/tokens', tokensRouter)
	.use('/toys', toysRouter)
	.use('/users', usersRouter);

export { router };