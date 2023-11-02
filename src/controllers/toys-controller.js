import toysService from '../services/toys-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';

const tlogger = logger.child({ model: 'Toy', layer: 'Controller' });

const getAllToys = (req, res, next) => {
	tlogger.info('Calling service to get all toys');
	toysService.getAllToys()
		.then(result => {
			tlogger.info('Sending response with all toys');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			tlogger.error('Failed to get toys from service');
			next(err);
		});
};

const getToyByName = (req, res, next) => {
	const name = req.params.toyName;

	tlogger.info(`Calling service to get toy with name '${name}'`);
	toysService.getToyByName(name).then(result => {
		tlogger.info(`Sending response with toy '${name}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		tlogger.error(`Failed to get toy with name '${name}' from service`);
		next(err);
	});
};

const createToy = (req, res, next) => {
	const toy = req.body.toy;

	tlogger.info('Calling service to create toy');
	toysService.createToy(toy).then(result => {
		tlogger.info('Sending response with toy created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Toy created.'));
	}).catch(err => {
		tlogger.error('Service failed to create toy');
		next(err);
	});
};

const updateToyByName = (req, res, next) => {
	const name = req.params.toyName;
	const toy = req.body.toy;

	tlogger.info(`Calling service to update toy with name '${name}'`);
	toysService.updateToyByName(name, toy).then(result => {
		tlogger.info('Sending response with toy updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy updated.'));
	}).catch(err => {
		tlogger.info(`Failed to update toy with name '${name}'`);
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const name = req.params.toyName;

	tlogger.info(`Calling service to delete toy with name '${name}'`);
	toysService.deleteToyByName(name).then(result => {
		tlogger.info('Sending response with toy deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy deleted.'));
	}).catch(err => {
		tlogger.info(`Failed to delete toy with name '${name}'`);
		next(err);
	});
};

export { getAllToys, getToyByName, createToy, updateToyByName, deletePetByName };
export default { getAllToys, getToyByName, createToy, updateToyByName, deletePetByName };