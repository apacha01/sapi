import toys from '../../jsondb/toys.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Toy from '../models/Toy.js';


const getAllToys = async () => {
	return toys;
};

const getToyByName = async (name) => {
	const toy = toys.find(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (!toy)
		throw new CustomError(HTTP_STATUS.NOT_FOUND.msg, HTTP_STATUS.NOT_FOUND.code, `Toy '${name}' not found.`, true);
	return toy;
};

const createToy = async (toy) => {
	const toCreateToy = new Toy(toy);
	const isValidToy = toCreateToy.isValid();

	if (!isValidToy.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToy.errors}\n]`,
			true
		);

	if (toys.find(t => t.name.toLowerCase().localeCompare(toCreateToy.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Toy with name '${toCreateToy.name}' already exists.`,
			true
		);


	return toys[toys.push(toCreateToy) - 1];
};

const updateToyByName = async (name, toy) => {
	const updatedToy = new Toy(toy);
	const isValidToy = updatedToy.isValid();

	if (!isValidToy.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToy.errors}\n]`,
			true
		);

	let toUpdateToyIndex = toys.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (toUpdateToyIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Toy with name '${name}' not found.`,
			true
		);

	// if updatedToy.name is different from name and already exists can´t update
	if (name.toLowerCase().localeCompare(updatedToy.name.toLowerCase()) !== 0 && toys.find(t => t.name.toLowerCase().localeCompare(updatedToy.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Toy with name '${updatedToy.name}' already exists.`,
			true
		);

	toys[toUpdateToyIndex] = updatedToy;

	return toys[toUpdateToyIndex];
};

const deleteToyByName = async (name) => {
	const index = toys.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Toy with name '${name}' not found.`,
			true
		);

	return toys.splice(index, 1);
};

export { getAllToys, getToyByName, createToy, updateToyByName, deleteToyByName };
export default { getAllToys, getToyByName, createToy, updateToyByName, deleteToyByName };