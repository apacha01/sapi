import users from '../../jsondb/users.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import { encrypt, verify } from '../lib/utils/encryption.js';
import User from '../models/User.js';

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
	const toCreateUser = new User(user);
	const isValidUser = toCreateUser.isValid();

	if (!isValidUser.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidUser.errors}\n]`,
			true
		);

	if (users.find(u => u.username.localeCompare(toCreateUser.username) === 0)) {
		throw new CustomError(HTTP_STATUS.ALREADY_EXISTS.msg, HTTP_STATUS.ALREADY_EXISTS.code, `User with username '${toCreateUser.username}' already exists.`, true);
	}

	const password = await encrypt(toCreateUser.password).catch(err => {
		console.error(err);
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error hashing user password.', false);
	});

	toCreateUser.password = password;

	return users[users.push(toCreateUser) - 1];
};

const updateUserByName = async (name, user) => {
	const updatedUser = new User(user);
	const isValidUser = updatedUser.isValid();

	if (!isValidUser.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidUser.errors}\n]`,
			true
		);

	let toUpdateUserIndex = users.findIndex(u => u.username.localeCompare(name) === 0);
	// if undefined don't do anything
	if (toUpdateUserIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`User '${name}' not found.`,
			true
		);

	// if pet.name is different from name and already exists can´t update
	if (name.localeCompare(updatedUser.username) !== 0 && users.find(u => u.username.localeCompare(updatedUser.username) === 0)) {
		throw new CustomError(HTTP_STATUS.ALREADY_EXISTS.msg, HTTP_STATUS.ALREADY_EXISTS.code, `User '${updatedUser.username}' already exists.`, true);
	}

	// if password changed, encrypt it again
	const isPasswordEqual = await verify(updatedUser.password, users[toUpdateUserIndex].password).catch(err => {
		console.error(err);
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error verifying user password.', false);
	});
	if (!isPasswordEqual) {
		user.password = await encrypt(user.password).catch(err => {
			console.error(err);
			throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error hashing user password.', false);
		});
	}

	users[toUpdateUserIndex] = user;

	return users[toUpdateUserIndex];
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