import petsService from '../services/pets-service.js';

const getAllPets = (req, res) => {
	petsService.getAllPets()
		.then(result => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({});
		});
};

const getPetByName = (req, res) => {
	res.send('Get a pet');
};

const createPet = (req, res) => {
	res.send('Create a new pet');
};

const updatePet = (req, res) => {
	res.send('Update a pet');
};

const deletePetByName = (req, res) => {
	res.send('Delete a pet');
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };