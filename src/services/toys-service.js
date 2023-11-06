import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Toy from '../models/Toy.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const tlogger = logger.child({ model: 'Toy', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('toys', logger);


const getAll = async () => {
	tlogger.info('Retrieving all toys from dal');
	return await findAll().then(toys => { tlogger.info('All toys retrieved, returning object'); return toys; });
};

const getOne = async (idOrName) => {
	tlogger.info(`Retrieving toy with name or id '${idOrName}' from dal`);
	let toy = await findById(idOrName) ?? await findByName(idOrName);
	tlogger.debug({ toy }, 'Retrieved toy.');

	if (!toy) {
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Toy with name or id '${idOrName}' not found.`,
			true
		);
	}

	tlogger.info('Toy retrieved, returning object');
	return toy;
};

const createOne = async (toy) => {
	tlogger.info('Creating toy with dal');
	const toCreateToken = new Toy(toy);
	const isValidToken = toCreateToken.isValid();

	tlogger.info('Validating toy');
	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);

	return await insertOne(toCreateToken).then(toy => { tlogger.info('Toy created, returning object'); return toy; });
};

const updateOne = async (idOrName, toy) => {
	tlogger.info(`Updating toy with name or id '${idOrName}' dal`);
	const updatedToken = new Toy(toy);

	tlogger.info('Validating toy');
	const isValidToken = updatedToken.isValid();
	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);

	const dbResponse = await updateById(idOrName, updatedToken) ?? await updateByName(idOrName, updatedToken);
	tlogger.info('Toy updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedToken = await deleteById(id);
	tlogger.info('Toy deleted, returning object');

	if (!deletedToken)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Toy with id '${id}' not found.`,
			true
		);

	return deletedToken;
};

export { getAll, getOne, createOne, updateOne, deleteOne };
export default { getAll, getOne, createOne, updateOne, deleteOne };