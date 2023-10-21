import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import { isAdmin, validateToken } from '../lib/utils/auth.js';

const auth = (req, res, next) => {
	const token = req.get('x-auth-token');
	if (!token)
		next(new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Access Denied. No token provided.', true));

	try {
		const decodedData = validateToken(token);
		req.user = decodedData;
	} catch (error) {
		next(new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Invalid or expired JWT.', true));
	}

	next();
};

const admin = (req, res, next) => {
	const { user } = req;

	if (isAdmin(user))
		next();
	else
		next(new CustomError(HTTP_STATUS.FORBIDDEN.msg, HTTP_STATUS.FORBIDDEN.code, 'Permission denied.', true));
};

export default { auth, admin };
export { auth, admin };