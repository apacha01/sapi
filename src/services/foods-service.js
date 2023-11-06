import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Food from '../models/Food.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const flogger = logger.child({ model: 'Food', layer: 'Service' });
const { deleteById, findAll, findById, findByName, insertOne, updateById, updateByName } = dal('foods', logger);

const getAll = async () => {
	flogger.info('Retrieving all foods from dal');
	return await findAll().then(foods => { flogger.info('All foods retrieved, returning object'); return foods; });
};

const getOne = async (idOrName) => {
	flogger.info(`Retrieving food with name or id '${idOrName}' from dal`);
	let food = await findById(idOrName) ?? await findByName(idOrName);
	flogger.debug({ food }, 'Retrieved food.');

	if (!food) {
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Food with name or id '${idOrName}' not found.`,
			true
		);
	}

	flogger.info('Food retrieved, returning object');
	return food;
};

const createOne = async (food) => {
	flogger.info('Creating food with dal');
	const toCreateFood = new Food(food);
	const isValidFood = toCreateFood.isValid();

	flogger.info('Validating food');
	if (!isValidFood.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidFood.errors}\n]`,
			true
		);

	return await insertOne(toCreateFood).then(food => { flogger.info('Food created, returning object'); return food; });
};

const updateOne = async (idOrName, food) => {
	flogger.info(`Updating food with name or id '${idOrName}' dal`);
	const updatedFood = new Food(food);

	flogger.info('Validating food');
	const isValidFood = updatedFood.isValid();
	if (!isValidFood.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidFood.errors}\n]`,
			true
		);

	const dbResponse = await updateById(idOrName, updatedFood) ?? await updateByName(idOrName, updatedFood);
	flogger.info('Food updated, returning object');

	return dbResponse;
};

const deleteOne = async (id) => {
	const deletedFood = await deleteById(id);
	flogger.info('Food deleted, returning object');

	if (!deletedFood)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Food with id '${id}' not found.`,
			true
		);

	return deletedFood;
};

export { getAll, getOne, createOne, updateOne, deleteOne };
export default { getAll, getOne, createOne, updateOne, deleteOne };