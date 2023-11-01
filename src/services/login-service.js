import users from '../../jsondb/users.json' assert {type: "json"};
import HTTP_STATUS from '../lib/constants/http.js';
import CustomError from '../lib/errors/CustomError.js';
import { verify } from '../lib/utils/encryption.js';

const checkCredentials = async (username, password) => {
	const user = users.find(u => u.username.localeCompare(username) === 0);
	if (!user)
		throw new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Wrong username or password.', true);

	const passwordsMatch = await verify(password, user.password).catch(err => {
		console.error(err);
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error verifying user password.', false);
	});
	if (!passwordsMatch)
		throw new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Wrong username or password.', true);

	return user;
};

export default { checkCredentials };
export { checkCredentials };