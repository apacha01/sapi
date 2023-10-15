import ResponseAlreadyExists from '../lib/response/ResponseAlreadyExists.js';
import ResponseNotFound from '../lib/response/ResponseNotFound.js';
import ResponseOk from '../lib/response/ResponseOk.js';
import ResponseServerError from '../lib/response/ResponseServerError.js';
import ResponseUnprocessable from '../lib/response/ResponseUnprocessable.js';
import petsService from '../services/pets-service.js';

const getAllPets = (req, res) => {
	petsService.getAllPets()
		.then(result => {
			if (result)
				res.status(200).json(new ResponseOk(result));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new ResponseServerError({}, 'There was an unexpected error while fetching all pets'));
		});
};

const getPetByName = (req, res) => {
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			if (result)
				res.status(200).json(new ResponseOk(result));
			else
				res.status(404).json(new ResponseNotFound({}, `Pet with name '${name}' not found.`));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new ResponseServerError({}, `There was an unexpected error while fetching pet: ${name}.`));
		});
};

const createPet = (req, res) => {
	const { pet } = req.body;

	petsService.createPet(pet).then(result => {
		if (!result)
			res.status(409).json(new ResponseAlreadyExists({}, `The pet with the name ${pet.name} already exists`));
		else if (Array.isArray(result))
			res.status(422).json(new ResponseUnprocessable({}, 'Missing fields. All attributes must be complete with valid values.', result));
		else
			res.status(200).json(new ResponseOk(result, 'Created'));
	}).catch(err => {
		console.error(err);
		res.status(500).json(new ResponseServerError({}, `There was an unexpected error while creating pet: ${JSON.stringify(pet)}.`));
	});
};

const updatePet = (req, res) => {
	res.send('Update a pet');
};

const deletePetByName = (req, res) => {
	res.send('Delete a pet');
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };