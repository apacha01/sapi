import loginService from '../services/login-service.js';
import { generateToken } from '../lib/utils/auth.js';
import Response from '../lib/response/Response.js';

const checkCredentials = (req, res, next) => {
	const { username, password } = req.body;

	loginService.checkCredentials(username, password).then(result => {
		if (result)
			res.status(Response.HTTP_STATUS.OK.code).json({ token: generateToken(result.username, result.role) });
	}).catch(err => {
		next(err);
	});
};

export default { checkCredentials };
export { checkCredentials };