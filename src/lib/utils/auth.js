import jwt from 'jsonwebtoken';
import CustomError from '../errors/CustomError.js';
import Response from '../response/Response.js';

const generateToken = (username, role) => {
	const token = jwt.sign({ user: username, role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
	return token;
};

const validateToken = (token) => {
	if (!token)
		throw new CustomError(Response.HTTP_STATUS.UNAUTHORIZED.msg, Response.HTTP_STATUS.UNAUTHORIZED.code, 'Access Denied. No token provided.', true);

	let decoded = null;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		throw new CustomError(Response.HTTP_STATUS.UNAUTHORIZED.msg, Response.HTTP_STATUS.UNAUTHORIZED.code, 'Invalid or expired JWT.', true);
	}

	return decoded;
};

export default { generateToken, validateToken };
export { generateToken, validateToken };