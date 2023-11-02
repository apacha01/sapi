import loginService from '../services/login-service.js';
import { generateToken } from '../lib/utils/auth.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';

const llogger = logger.child({ model: 'Login', layer: 'Controller' });

const checkCredentials = (req, res, next) => {
	const { username, password } = req.body;

	llogger.info('Calling service to verify if user credentials are correct');
	loginService.checkCredentials(username, password).then(result => {
		llogger.debug('Result: ', result);
		if (result)
			res.status(HTTP_STATUS.OK.code).json({ token: generateToken(result.username, result.role) });
	}).catch(err => {
		llogger.error(`Failed to verify user '${username}'`);
		next(err);
	});
};

export default { checkCredentials };
export { checkCredentials };