import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import packsService from '../services/packs-service.js';
import logger from '../lib/utils/logger.js';

const plogger = logger.child({ model: 'Pack', layer: 'Controller' });

const getAllPacks = (req, res, next) => {
	plogger.info('Calling service to get all packs');
	packsService.getAllPacks().then(result => {
		plogger.info('Sending response with all packs');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, 'Failed to get packs from service');
		next(err);
	});
};

const getPackByName = (req, res, next) => {
	const { packName: name } = req.params;

	plogger.info(`Calling service to get pack with name '${name}'`);
	packsService.getPackByName(name).then(result => {
		plogger.info(`Sending response with pack '${name}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to get pack with name '${name}' from service`);
		next(err);
	});
};

const createPack = (req, res, next) => {
	const { pack } = req.body;

	plogger.info('Calling service to create pack');
	packsService.createPack(pack).then(result => {
		plogger.info('Sending response with pack created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Pack created'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, 'Service failed to create pack');
		next(err);
	});
};

const updatePack = (req, res, next) => {
	const { packName: name } = req.params;
	const { pack } = req.body;

	plogger.info(`Calling service to update pack with name '${name}'`);
	packsService.updatePack(name, pack).then(result => {
		plogger.info('Sending response with pack updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack updated'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to update pack with name '${name}'`);
		next(err);
	});
};

const deletePackByName = (req, res, next) => {
	const { packName: name } = req.params;

	plogger.info(`Calling service to delete pack with name '${name}'`);
	packsService.deletePackByName(name).then(result => {
		plogger.info('Sending response with pack deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack deleted'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to delete pack with name '${name}'`);
		next(err);
	});
};

export { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };
export default { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };