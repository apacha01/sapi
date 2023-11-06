import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Token from '../models/Token.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const tlogger = logger.child({ model: 'Token', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('tokens', logger);

const getAll = async () => {
	tlogger.info('Retrieving all tokens from dal');
	return await findAll().then(tokens => { tlogger.info('All tokens retrieved, returning object'); return tokens; });
};

const getOne = async (idOrName) => {
	tlogger.info(`Retrieving token with name or id '${idOrName}' from dal`);
	let token = await findById(idOrName) ?? await findByName(idOrName);
	tlogger.debug({ token }, 'Retrieved token.');

	if (!token) {
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Token with name or id '${idOrName}' not found.`,
			true
		);
	}

	tlogger.info('Token retrieved, returning object');
	return token;
};

const createOne = async (token) => {
	tlogger.info('Creating token with dal');
	const toCreateToken = new Token(token);
	const isValidToken = toCreateToken.isValid();

	tlogger.info('Validating token');
	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);

	return await insertOne(toCreateToken).then(token => { tlogger.info('Token created, returning object'); return token; });
};

const updateOne = async (idOrName, token) => {
	tlogger.info(`Updating token with name or id '${idOrName}' dal`);
	const updatedToken = new Token(token);

	tlogger.info('Validating token');
	const isValidToken = updatedToken.isValid();
	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);

	const dbResponse = await updateById(idOrName, updatedToken) ?? await updateByName(idOrName, updatedToken);
	tlogger.info('Token updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedToken = await deleteById(id);
	tlogger.info('Token deleted, returning object');

	if (!deletedToken)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Token with id '${id}' not found.`,
			true
		);

	return deletedToken;
};

export { getAll, getOne, createOne, updateOne, deleteOne };
export default { getAll, getOne, createOne, updateOne, deleteOne };