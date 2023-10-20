import jwt from 'jsonwebtoken';
import ROLES from '../constants/roles.js';

const generateToken = (username, role) => {
	const token = jwt.sign({ user: username, role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
	return token;
};

const validateToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

const isAdmin = (user) => {
	return ROLES.ADMIN.localeCompare(user?.role) === 0;
};

const isUser = (user) => {
	return ROLES.USER.localeCompare(user?.role) === 0;
};

export default { generateToken, validateToken, isAdmin, isUser };
export { generateToken, validateToken, isAdmin, isUser };