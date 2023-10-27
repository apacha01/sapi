import pets from '../../db/pets.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Pet from '../models/Pet.js';

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
	const toCreatePet = new Pet(pet);
	const isValidPet = toCreatePet.isValid();

	// Check if pet is valid
	if (!isValidPet.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPet.errors}\n]`,
			true
		);

	if (pets.find(p => p.name.toLowerCase().localeCompare(toCreatePet.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pet with name '${pet.name}' already exists.`,
			true
		);

	return pets[pets.push(pet) - 1];
};

const updatePet = async (name, pet) => {
	const updatedPet = new Pet(pet);
	let toUpdatePetIndex = pets.findIndex(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	// if pet not found don't do anything
	if (toUpdatePetIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name '${name}' not found.`,
			true
		);

	// if updatedPet.name is different from name and already exists can´t update
	if (
		name.toLowerCase().localeCompare(updatedPet.name.toLowerCase()) !== 0
		&& pets.find(p => p.name.toLowerCase().localeCompare(updatedPet.name.toLowerCase()) === 0)
	)
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pet with name '${updatedPet.name}' already exists.`,
			true
		);

	// Check if pet is valid
	const isValidPet = updatedPet.isValid();
	if (!isValidPet.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPet.errors}\n]`,
			true
		);


	pets[toUpdatePetIndex] = updatedPet;

	return toUpdatePetIndex;
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