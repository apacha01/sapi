import toys from '../../db/toys.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';


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
	if (!toy)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			'Toy can\'t be undefined or null.',
			true
		);

	// validate with schemas
	// if not valid -> throw error

	toy.name = toy.name.replaceAll(' ', '_');
	if (toys.find(t => t.name.toLowerCase().localeCompare(toy.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Toy with name '${toy.name}' already exists.`,
			true
		);


	return toys[toys.push(toy) - 1];
};

const updateToyByName = async (name, toy) => {
	let toUpdateToyIndex = toys.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (toUpdateToyIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Toy with name '${name}' not found.`,
			true
		);

	// if toy.name is different from name and already exists can´t update
	toy.name = toy.name.replaceAll(' ', '_');
	if (name.toLowerCase().localeCompare(toy.name.toLowerCase()) !== 0 && toys.find(t => t.name.toLowerCase().localeCompare(toy.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Toy with name '${toy.name}' already exists.`,
			true
		);

	// check if toy is valid with schema
	// throw error if not valid

	toys[toUpdateToyIndex] = toy;

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