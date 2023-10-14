import ResponseOk from '../lib/response/ResponseOk.js';
import ResponseServerError from '../lib/response/ResponseServerError.js';
import ResponseNotFound from '../lib/response/ResponseNotFound.js';
import petsService from '../services/pets-service.js';

const getAllPets = (req, res) => {
	petsService.getAllPets()
		.then(result => {
			if (result)
				res.status(200).json(new ResponseOk());
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new ResponseServerError());
		});
};

const getPetByName = (req, res) => {
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			if (result)
				res.status(200).json(new ResponseOk());
			else
				res.status(404).json(new ResponseNotFound(`Pet with name '${name}' not found.`));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new ResponseServerError(`There was an unexpected error while fetching pet: ${name}.`));
		});
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