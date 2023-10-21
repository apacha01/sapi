import loginService from '../services/login-service.js';
import { generateToken } from '../lib/utils/auth.js';
import HTTP_STATUS from '../lib/constants/http.js';

const checkCredentials = (req, res, next) => {
	const { username, password } = req.body;

	loginService.checkCredentials(username, password).then(result => {
		if (result)
			res.status(HTTP_STATUS.OK.code).json({ token: generateToken(result.username, result.role) });
	}).catch(err => {
		next(err);
	});
};

export default { checkCredentials };
export { checkCredentials };