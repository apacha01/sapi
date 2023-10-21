import pets from '../../db/pets.json' assert { type: "json" };
import { checkPetAttributes, copyPet } from '../lib/utils/pets.js';
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';

const getAllPets = async () => {
	return pets;
};

const getPetByName = async (name) => {
	const pet = pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (!pet)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name '${name}' not found.`,
			true
		);

	return pet;
};

const createPet = async (pet) => {
	if (!pet)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`Pet can't be undefined or null.`,
			true
		);
	// Check if pet is valid
	const missingFields = checkPetAttributes(pet);
	if (missingFields.length > 0)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All attributes must contain valid data. Missing fields [${missingFields.toString()}].`,
			true
		);

	pet.name = pet.name.replaceAll(' ', '_');

	if (pets.find(p => p.name.toLowerCase().localeCompare(pet.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pet with name '${pet.name}' already exists.`,
			true
		);

	return pets[pets.push(pet) - 1];
};

const updatePet = async (name, pet) => {
	let toUpdatePet = pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (!toUpdatePet)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name '${name}' not found.`,
			true
		);

	// if pet.name is different from name and already exists can´t update
	if (name.toLowerCase().localeCompare(pet.name.toLowerCase()) !== 0 && pets.find(p => p.name.toLowerCase().localeCompare(pet.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pet with name '${pet.name}' already exists.`,
			true
		);

	// Check if pet is valid
	const missingFields = checkPetAttributes(pet);
	if (missingFields.length > 0)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All attributes must contain valid data. Missing fields [${missingFields.toString()}].`,
			true
		);

	pet.name = pet.name.replaceAll(' ', '_');

	copyPet(toUpdatePet, pet);

	return toUpdatePet;
};

const deletePetByName = async (name) => {
	const index = pets.findIndex(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name '${name}' not found.`,
			true
		);

	return pets.splice(index, 1);
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };