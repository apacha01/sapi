import { validateToken } from '../lib/utils/auth.js';

const auth = (req, res, next) => {
	const token = req.get('x-auth-token');

	try {
		const decodedData = validateToken(token);
		req.user = decodedData;
	} catch (error) {
		next(error);
	}

	next();
};

export default { auth };
export { auth };