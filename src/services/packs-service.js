import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Pack from '../models/Pack.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const plogger = logger.child({ model: 'Pack', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('packs', logger);

const getAll = async () => {
	plogger.info('Retrieving all packs from dal');
	return await findAll().then(packs => { plogger.info('All packs retrieved, returning object'); return packs; });
};

const getOne = async (idOrName) => {
	plogger.info(`Retrieving pack with name or id '${idOrName}' from dal`);
	let pack = await findById(idOrName) ?? await findByName(idOrName);
	plogger.debug({ pack }, 'Retrieved pack.');

	if (!pack) {
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pack with name or id '${idOrName}' not found.`,
			true
		);
	}

	plogger.info('Pack retrieved, returning object');
	return pack;
};

const createOne = async (pack) => {
	plogger.info('Creating pack with dal');
	const toCreatePack = new Pack(pack);
	const isValidPack = toCreatePack.isValid();

	plogger.info('Validating pack');
	if (!isValidPack.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPack.errors}\n]`,
			true
		);

	return await insertOne(toCreatePack).then(pack => { plogger.info('Pack created, returning object'); return pack; });
};

const updateOne = async (idOrName, pack) => {
	plogger.info(`Updating pack with name or id '${idOrName}' dal`);
	const updatedPack = new Pack(pack);

	plogger.info('Validating pack');
	const isValidPack = updatedPack.isValid();
	if (!isValidPack.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPack.errors}\n]`,
			true
		);

	const dbResponse = await updateById(idOrName, updatedPack) ?? await updateByName(idOrName, updatedPack);
	plogger.info('Pack updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedPack = await deleteById(id);
	plogger.info('Pack deleted, returning object');

	if (!deletedPack)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pack with id '${id}' not found.`,
			true
		);

	return deletedPack;
};

export { getAll, getOne, createOne, updateOne, deleteOne };
export default { getAll, getOne, createOne, updateOne, deleteOne };