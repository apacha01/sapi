import users from '../../db/users.json' assert {type: "json"};

const checkCredentials = async (username, password) => {
	const user = users.find(u => u.username.localeCompare(username) === 0);
	if (user && user.password.localeCompare(password) === 0)
		return user;
	else
		throw new CustomError(Response.HTTP_STATUS.UNAUTHORIZED.msg, Response.HTTP_STATUS.UNAUTHORIZED.code, 'Wrong username or password.', true);
};

export default { checkCredentials };
export { checkCredentials };