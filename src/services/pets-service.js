import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Pet from '../models/Pet.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const plogger = logger.child({ model: 'Pet', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('pets', logger);

const getAll = async () => {
	plogger.info('Retrieving all pets from dal');
	return await findAll().then(pets => { plogger.info('All pets retrieved, returning object'); return pets; });
};

const getOne = async (idOrName) => {
	plogger.info(`Retrieving pet with name or id '${idOrName}' from dal`);
	let pet = await findById(idOrName) ?? await findByName(idOrName);
	plogger.debug({ pet }, 'Retrieved pet.');

	if (!pet) {
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name or id '${idOrName}' not found.`,
			true
		);
	}

	plogger.info('Pet retrieved, returning object');
	return pet;
};

const createOne = async (pet) => {
	plogger.info('Creating pet with dal');
	const toCreatePet = new Pet(pet);
	const isValidPet = toCreatePet.isValid();

	plogger.info('Validating pet');
	if (!isValidPet.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPet.errors}\n]`,
			true
		);

	return await insertOne(toCreatePet).then(pet => { plogger.info('Pet created, returning object'); return pet; });
};

const updateOne = async (idOrName, pet) => {
	plogger.info(`Updating pet with name or id '${idOrName}' dal`);
	const updatedPet = new Pet(pet);

	plogger.info('Validating pet');
	const isValidPet = updatedPet.isValid();
	if (!isValidPet.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPet.errors}\n]`,
			true
		);

	const dbResponse = await updateById(idOrName, updatedPet) ?? await updateByName(idOrName, updatedPet);
	plogger.info('Pet updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedPet = await deleteById(id);
	plogger.info('Pet deleted, returning object');

	if (!deletedPet)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with id '${id}' not found.`,
			true
		);

	return deletedPet;
};

export { getAll, getOne, createOne, updateOne, deleteOne };
export default { getAll, getOne, createOne, updateOne, deleteOne };