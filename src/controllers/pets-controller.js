import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import petsService from '../services/pets-service.js';
import logger from '../lib/utils/logger.js';

const plogger = logger.child({ model: 'Pet', layer: 'Controller' });

const getAllPets = (req, res, next) => {
	plogger.info('Calling service to get all pets');
	petsService.getAllPets()
		.then(result => {
			plogger.info('Sending response with all pets');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			plogger.error('Failed to get pets from service');
			next(err);
		});
};

const getPetByName = (req, res, next) => {
	const { petName: name } = req.params;

	plogger.info(`Calling service to get pet with name '${name}'`);
	petsService.getPetByName(name)
		.then(result => {
			plogger.info(`Sending response with pet '${name}'`);
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			plogger.error(`Failed to get pet with name '${name}' from service`);
			next(err);
		});
};

const createPet = (req, res, next) => {
	const { pet } = req.body;

	plogger.info('Calling service to create pet');
	petsService.createPet(pet).then(result => {
		plogger.info('Sending response with pet created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, `Created pet ${result}`));
	}).catch(err => {
		plogger.error('Service failed to create pet');
		next(err);
	});
};

const updatePet = (req, res, next) => {
	const { petName: name } = req.params;
	const { pet } = req.body;

	plogger.info(`Calling service to update pet with name '${name}'`);
	petsService.updatePet(name, pet).then(result => {
		plogger.info('Sending response with pet updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Updated pet '${name}'`));
	}).catch(err => {
		plogger.info(`Failed to update pet with name '${name}'`);
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const { petName: name } = req.params;

	plogger.info(`Calling service to delete pet with name '${name}'`);
	petsService.deletePetByName(name).then(result => {
		plogger.info('Sending response with pet deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Deleted pet '${name}'`));
	}).catch(err => {
		plogger.info(`Failed to delete pet with name '${name}'`);
		next(err);
	});
};

export { getAllPets, getPetByName, createPet, updatePet, deletePetByName };
export default { getAllPets, getPetByName, createPet, updatePet, deletePetByName };