import Response from '../lib/response/Response.js';
import petsService from '../services/pets-service.js';

const getAllPets = (req, res) => {
	petsService.getAllPets()
		.then(result => {
			if (result)
				res.status(200).json(new Response(
					Response.HTTP_STATUS.OK.code,
					Response.HTTP_STATUS.OK.msg
				));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new Response(
				Response.HTTP_STATUS.SERVER_ERROR.code,
				Response.HTTP_STATUS.SERVER_ERROR.msg,
				'There was an unexpected error while fetching all pets.'
			));
		});
};

const getPetByName = (req, res) => {
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			if (result)
				res.status(200).json(new Response(
					Response.HTTP_STATUS.OK.code,
					Response.HTTP_STATUS.OK.msg
				));
			else
				res.status(404).json(new Response(
					Response.HTTP_STATUS.NOT_FOUND.code,
					Response.HTTP_STATUS.NOT_FOUND.msg,
					`Pet with name '${name}' not found.`
				));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(new Response(
				Response.HTTP_STATUS.SERVER_ERROR.code,
				Response.HTTP_STATUS.SERVER_ERROR.msg,
				'There was an unexpected error while fetching all pets.'
			));
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