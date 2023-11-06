import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import { encrypt } from '../lib/utils/encryption.js';
import User from '../models/User.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const llogger = logger.child({ model: 'User', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('users', logger);

const getAll = async () => {
	llogger.info('Retrieving all users from dal');
	return await findAll().then(users => { llogger.info('All users retrieved, returning object'); return users; });
};

const getOne = async (idOrName) => {
	llogger.info(`Retrieving user with name or id '${idOrName}' from dal`);
	let user = await findById(idOrName) ?? await findByName(idOrName);
	llogger.debug({ user }, 'Retrieved user.');

	if (!user)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`User with name or id '${idOrName}' not found.`,
			true
		);

	llogger.info('User retrieved, returning object');
	return user;
};

const createOne = async (user) => {
	llogger.info('Creating user with dal');
	const toCreateUser = new User(user);
	const isValidUser = toCreateUser.isValid();

	llogger.info('Validating User');
	if (!isValidUser.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidUser.errors}\n]`,
			true
		);

	llogger.info('Encrypting user password');
	const password = await encrypt(toCreateUser.password).catch(err => {
		llogger.debug({ error: err, stack: err.stack }, 'Error encrypting user password');
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error encrypting user password.', true);
	});

	toCreateUser.password = password;

	return await insertOne(toCreateUser).then(user => { llogger.info('User created, returning object'); return user; });
};

const updateOne = async (idOrName, user) => {
	llogger.info(`Updating user with name or id '${idOrName}' dal`);
	const updatedUser = new User(user);
	const isValidUser = updatedUser.isValid();

	llogger.info('Validating User');
	if (!isValidUser.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidUser.errors}\n]`,
			true
		);

	llogger.info('Encrypting user password');
	const password = await encrypt(updatedUser.password).catch(err => {
		llogger.debug({ error: err, stack: err.stack }, 'Error encrypting user password');
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error encrypting user password.', true);
	});

	updatedUser.password = password;

	const dbResponse = await updateById(idOrName, updatedUser) ?? await updateByName(idOrName, updatedUser);
	llogger.info('User updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedUser = await deleteById(id);
	llogger.info('User deleted, returning object');

	if (!deletedUser)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`User with id '${id}' not found.`,
			true
		);

	return deletedUser;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
export { getAll, getOne, createOne, updateOne, deleteOne };