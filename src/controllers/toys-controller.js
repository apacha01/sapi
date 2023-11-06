import toysService from '../services/toys-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';

const tlogger = logger.child({ model: 'Toy', layer: 'Controller' });

const getAllToys = (req, res, next) => {
	tlogger.info('Calling service to get all toys');
	toysService.getAll()
		.then(result => {
			tlogger.info('Sending response with all toys');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			tlogger.debug({ error: err, stack: err.stack }, 'Failed to get toys from service');
			next(err);
		});
};

const getToy = (req, res, next) => {
	const { toyIdOrName: idOrName } = req.params;

	tlogger.info(`Calling service to get toy with id or name '${idOrName}'`);
	toysService.getOne(idOrName).then(result => {
		tlogger.info(`Sending response with toy '${idOrName}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to get toy with id or name '${idOrName}' from service`);
		next(err);
	});
};

const createToy = (req, res, next) => {
	const { toy } = req.body;

	tlogger.info('Calling service to create toy');
	toysService.createOne(toy).then(result => {
		tlogger.info('Sending response with toy created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Toy created.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, 'Service failed to create toy');
		next(err);
	});
};

const updateToy = (req, res, next) => {
	const { toyIdOrName: idOrName } = req.params;
	const { toy } = req.body;

	tlogger.info(`Calling service to update toy with id or name '${idOrName}'`);
	toysService.updateOne(idOrName, toy).then(result => {
		tlogger.info('Sending response with toy updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy updated.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to update toy with id or name '${idOrName}'`);
		next(err);
	});
};

const deleteToy = (req, res, next) => {
	const { toyId: id } = req.params;

	tlogger.info(`Calling service to delete toy with id '${id}'`);
	toysService.deleteOne(id).then(result => {
		tlogger.info('Sending response with toy deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy deleted.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to delete toy with id '${id}'`);
		next(err);
	});
};

export { getAllToys, getToy, createToy, updateToy, deleteToy };
export default { getAllToys, getToy, createToy, updateToy, deleteToy };