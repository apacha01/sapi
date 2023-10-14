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
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			if (result)
				res.status(200).json(result);
			else
				res.status(404).json({ err: 404, msg: `Pet with name '${name}' not found.` });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ err: 500, msg: 'Something unexpected happened.' });
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