import foods from '../../jsondb/foods.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Food from '../models/Food.js';

const getAllFoods = async () => {
	return foods;
};

const getFoodByName = async (name) => {
	const food = foods.find(f => f.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (!food)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Food with name '${name}' not found.`,
			true
		);

	return food;
};

const createFood = async (food) => {
	const toCreateFood = new Food(food);
	const isValidFood = toCreateFood.isValid();

	// Check if food is valid
	if (!isValidFood.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidFood.errors}\n]`,
			true
		);

	if (foods.find(f => f.name.toLowerCase().localeCompare(food.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Food with name '${food.name}' already exists.`,
			true
		);

	return foods[foods.push(food) - 1];
};

const updateFood = async (name, food) => {
	const updatedFood = new Food(food);
	let toUpdateFoodIndex = foods.findIndex(f => f.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	// if food not found don't do anything
	if (toUpdateFoodIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Food with name '${name}' not found.`,
			true
		);

	// if updatedFood.name is different from name and already exists can´t update
	if (
		name.toLowerCase().localeCompare(updatedFood.name.toLowerCase()) !== 0
		&& foods.find(p => p.name.toLowerCase().localeCompare(updatedFood.name.toLowerCase()) === 0)
	)
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Food with name '${updatedFood.name}' already exists.`,
			true
		);

	// Check if food is valid
	const isValidFood = updatedFood.isValid();
	if (!isValidFood.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidFood.errors}\n]`,
			true
		);


	foods[toUpdateFoodIndex] = updatedFood;

	return toUpdateFoodIndex;
};

const deleteFoodByName = async (name) => {
	const index = foods.findIndex(f => f.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Food with name '${name}' not found.`,
			true
		);

	return foods.splice(index, 1);
};

export { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };
export default { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };