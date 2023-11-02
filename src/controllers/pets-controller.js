import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import petsService from '../services/pets-service.js';

const getAllPets = (req, res, next) => {
	petsService.getAllPets()
		.then(result => {
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const getPetByName = (req, res, next) => {
	const { petName: name } = req.params;

	petsService.getPetByName(name)
		.then(result => {
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const createPet = (req, res, next) => {
	const { pet } = req.body;

	petsService.createPet(pet).then(result => {
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, `Created pet ${result}`));
	}).catch(err => {
		next(err);
	});
};

const updatePet = (req, res, next) => {
	const { petName } = req.params;
	const { pet } = req.body;

	petsService.updatePet(petName, pet).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Updated pet '${petName}'`));
	}).catch(err => {
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const { petName } = req.params;

	petsService.deletePetByName(petName).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Deleted pet '${petName}'`));
	}).catch(err => {
		next(err);
	});
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };