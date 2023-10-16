import Response from '../lib/response/Response.js';
import petsService from '../services/pets-service.js';

const getAllPets = (req, res, next) => {
	petsService.getAllPets()
		.then(result => {
			res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const getPetByName = (req, res, next) => {
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const createPet = (req, res, next) => {
	const { pet } = req.body;

	petsService.createPet(pet).then(result => {
		res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result, `Created pet ${result}`));
	}).catch(err => {
		next(err);
	});
};

const updatePet = (req, res, next) => {
	const { petName } = req.params;
	const { pet } = req.body;

	petsService.updatePet(petName, pet).then(result => {
		res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result, `Updated pet '${petName}'`));
	}).catch(err => {
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const { petName } = req.params;

	petsService.deletePetByName(petName).then(result => {
		res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result, `Deleted pet '${petName}'`));
	}).catch(err => {
		next(err);
	});
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };