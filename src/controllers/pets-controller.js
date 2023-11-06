import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import petsService from '../services/pets-service.js';
import logger from '../lib/utils/logger.js';

const plogger = logger.child({ model: 'Pet', layer: 'Controller' });

const getAllPets = (req, res, next) => {
	plogger.info('Calling service to get all pets');
	petsService.getAll()
		.then(result => {
			plogger.info('Sending response with all pets');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			plogger.debug({ error: err, stack: err.stack }, 'Failed to get pets from service');
			next(err);
		});
};

const getPet = (req, res, next) => {
	const { petIdOrName: idOrName } = req.params;

	plogger.info(`Calling service to get pet with id or name '${idOrName}'`);
	petsService.getOne(idOrName)
		.then(result => {
			plogger.info(`Sending response with pet '${idOrName}'`);
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			plogger.debug({ error: err, stack: err.stack }, `Failed to get pet with id or name '${idOrName}' from service`);
			next(err);
		});
};

const createPet = (req, res, next) => {
	const { pet } = req.body;

	plogger.info('Calling service to create pet');
	petsService.createOne(pet).then(result => {
		plogger.info('Sending response with pet created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, `Created pet ${result}`));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, 'Service failed to create pet');
		next(err);
	});
};

const updatePet = (req, res, next) => {
	const { petIdOrName: idOrName } = req.params;
	const { pet } = req.body;

	plogger.info(`Calling service to update pet with id or name '${idOrName}'`);
	petsService.updateOne(idOrName, pet).then(result => {
		plogger.info('Sending response with pet updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Updated pet '${idOrName}'`));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to update pet with id or name '${idOrName}'`);
		next(err);
	});
};

const deletePet = (req, res, next) => {
	const { petId: id } = req.params;

	plogger.info(`Calling service to delete pet with id '${id}'`);
	petsService.deleteOne(id).then(result => {
		plogger.info('Sending response with pet deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, `Deleted pet '${id}'`));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to delete pet with id '${id}'`);
		next(err);
	});
};

export { getAllPets, getPet, createPet, updatePet, deletePet };
export default { getAllPets, getPet, createPet, updatePet, deletePet };