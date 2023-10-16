import pets from '../../db/pets.json' assert { type: "json" };
import { checkPetAttributes, copyPet } from '../lib/utils/pets.js';

const getAllPets = async () => {
	return pets;
};

const getPetByName = async (name) => {
	return pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
};

const createPet = async (pet) => {
	// Check if pet is valid
	const missingFields = checkPetAttributes(pet);
	if (missingFields.length > 0)
		return missingFields;

	pet.name = pet.name.replaceAll(' ', '_');

	let exists = pets.find(p => p.name.toLowerCase().localeCompare(pet.name.toLowerCase()) === 0);
	return exists === undefined ? pets[pets.push(pet) - 1] : undefined;
};

const updatePet = async (name, pet) => {
	let toUpdatePet = pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (!toUpdatePet) return null;

	// if pet.name is different from name and already exists can´t update
	if (name.toLowerCase().localeCompare(pet.name.toLowerCase()) !== 0
		&& pets.find(p => p.name.toLowerCase().localeCompare(pet.name.toLowerCase()) === 0))
		return undefined;

	// Check if pet is valid
	const missingFields = checkPetAttributes(pet);
	if (missingFields.length > 0)
		return missingFields;

	pet.name = pet.name.replaceAll(' ', '_');

	copyPet(toUpdatePet, pet);

	return toUpdatePet;
};

const deletePetByName = async (name) => {
	const index = pets.findIndex(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	return index != -1 ? pets.splice(index, 1) : [];
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };