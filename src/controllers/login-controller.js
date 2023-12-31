import loginService from '../services/login-service.js';
import { generateToken } from '../lib/utils/auth.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';
import Response from '../lib/response/Response.js';

const llogger = logger.child({ model: 'Login', layer: 'Controller' });

const checkCredentials = (req, res, next) => {
	const { name, password } = req.body;

	llogger.info('Calling service to verify if user credentials are correct');
	loginService.checkCredentials(name, password).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, { token: generateToken(result.name, result.role) }));
	}).catch(err => {
		llogger.debug({ error: err, stack: err.stack }, `Failed to verify user '${name}'`);
		next(err);
	});
};

export default { checkCredentials };
export { checkCredentials };