import users from '../../db/users.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';

const getAllUsers = async () => {
	return users;
};

const getUserByName = async (name) => {
	const user = users.find(u => u.username.localeCompare(name) === 0);
	if (user)
		return user;
	else
		throw new CustomError(HTTP_STATUS.NOT_FOUND.msg, HTTP_STATUS.NOT_FOUND.code, `User '${user.username}' not found.`, true);
};

const createUser = async (user) => {
	// TODO: validate user with ajv & json schema
	if (users.find(u => u.username.localeCompare(user.username) === 0)) {
		throw new CustomError(HTTP_STATUS.ALREADY_EXISTS.msg, HTTP_STATUS.ALREADY_EXISTS.code, `User with username '${user.username}' already exists.`, true);
	}

	return users[users.push(user) - 1];
};

const updateUserByName = async (name, user) => {
	// TODO: validate user with ajv & json schema

	let toUpdateUser = users.find(u => u.username.localeCompare(name) === 0);
	// if undefined don't do anything
	if (!toUpdateUser)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`User '${name}' not found.`,
			true
		);

	// if pet.name is different from name and already exists can´t update
	if (name.localeCompare(user.username) !== 0 && users.find(u => u.username.localeCompare(user.username) === 0)) {
		throw new CustomError(HTTP_STATUS.ALREADY_EXISTS.msg, HTTP_STATUS.ALREADY_EXISTS.code, `User '${user.username}' already exists.`, true);
	}

	toUpdateUser = user;

	return toUpdateUser;
};

const deleteUserByName = async (name) => {
	const index = users.findIndex(u => u.username.localeCompare(name) === 0);

	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`User '${name}' not found.`,
			true
		);

	return users.splice(index, 1);
};

export default { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };
export { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };