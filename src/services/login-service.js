import users from '../../db/users.json' assert {type: "json"};
import HTTP_STATUS from '../lib/constants/http.js';

const checkCredentials = async (username, password) => {
	const user = users.find(u => u.username.localeCompare(username) === 0);
	if (user && user.password.localeCompare(password) === 0)
		return user;
	else
		throw new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Wrong username or password.', true);
};

export default { checkCredentials };
export { checkCredentials };