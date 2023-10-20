import users from '../../db/users.json' assert {type: "json"};

const checkCredentials = async (username, password) => {
	const user = users.find(u => u.username.localeCompare(username) === 0);
	return user && user.password.localeCompare(password) === 0 ? user : false;
};

export default { checkCredentials };
export { checkCredentials };