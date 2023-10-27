import express from 'express';
import { router as foodsRouter } from './routes/foods-routes.js';
import { router as loginRouter } from './routes/login-routes.js';
import { router as petsRouter } from './routes/pets-routes.js';
import { router as tokensRouter } from './routes/tokens-routes.js';
import { router as toysRouter } from './routes/toys-routes.js';
import { router as usersRouter } from './routes/users-routes.js';

const router = express.Router();

router
	.get('/', (req, res) => {
		res.send(
			{
				foods_url: 'https://DEPENDS_ON_HOSTING/api/v1/foods',
				login_url: 'https://DEPENDS_ON_HOSTING/api/v1/login',
				pets_url: 'https://DEPENDS_ON_HOSTING/api/v1/pets',
				tokens_url: 'https://DEPENDS_ON_HOSTING/api/v1/tokens',
				toys_url: 'https://DEPENDS_ON_HOSTING/api/v1/toys',
				users_url: 'https://DEPENDS_ON_HOSTING/api/v1/users'
			}
		);
	})
	.use('/foods', foodsRouter)
	.use('/login', loginRouter)
	.use('/pets', petsRouter)
	.use('/tokens', tokensRouter)
	.use('/toys', toysRouter)
	.use('/users', usersRouter);

export { router };