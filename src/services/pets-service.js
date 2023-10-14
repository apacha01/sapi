import pets from '../db/pets.json' assert { type: "json" };
import { copyPet } from '../utils/pets.js';

const getAllPets = async () => {
	return pets;
};

const getPetByName = async (name) => {
	return pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
};

const createPet = async (pet) => {
	let exists = pets.find(p => p.name.toLowerCase().localeCompare(pet.name.toLowerCase()) === 0);
	return exists === undefined ? pets[pets.push(pet) - 1] : {};
};

const updatePet = async (name, pet) => {
	let newPet = pets.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	const didCopy = copyPet(newPet, pet);

	const changedName = newPet.name.localeCompare(name) === 0;
	let exists;
	if (changedName)
		exists = pets.find(p => p.name.toLowerCase().localeCompare(newPet.name.toLowerCase()) === 0);

	return didCopy && !exists ? newPet : {};
};

const deletePetByName = async (name) => {
	const index = pets.indexOf({ name });
	return index != -1 ? pets.splice(index, 1) : [];
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };