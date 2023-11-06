import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import packsService from '../services/packs-service.js';
import logger from '../lib/utils/logger.js';

const plogger = logger.child({ model: 'Pack', layer: 'Controller' });

const getAllPacks = (req, res, next) => {
	plogger.info('Calling service to get all packs');
	packsService.getAll().then(result => {
		plogger.info('Sending response with all packs');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, 'Failed to get packs from service');
		next(err);
	});
};

const getPack = (req, res, next) => {
	const { packIdOrName: idOrName } = req.params;

	plogger.info(`Calling service to get pack with id or name '${idOrName}'`);
	packsService.getOne(idOrName).then(result => {
		plogger.info(`Sending response with pack '${idOrName}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to get pack with id or name '${idOrName}' from service`);
		next(err);
	});
};

const createPack = (req, res, next) => {
	const { pack } = req.body;

	plogger.info('Calling service to create pack');
	packsService.createOne(pack).then(result => {
		plogger.info('Sending response with pack created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Pack created'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, 'Service failed to create pack');
		next(err);
	});
};

const updatePack = (req, res, next) => {
	const { packIdOrName: idOrName } = req.params;
	const { pack } = req.body;

	plogger.info(`Calling service to update pack with id or name '${idOrName}'`);
	packsService.updateOne(idOrName, pack).then(result => {
		plogger.info('Sending response with pack updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack updated'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to update pack with id or name '${idOrName}'`);
		next(err);
	});
};

const deletePack = (req, res, next) => {
	const { packId: id } = req.params;

	plogger.info(`Calling service to delete pack with id '${id}'`);
	packsService.deleteOne(id).then(result => {
		plogger.info('Sending response with pack deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack deleted'));
	}).catch(err => {
		plogger.debug({ error: err, stack: err.stack }, `Failed to delete pack with id '${id}'`);
		next(err);
	});
};

export { getAllPacks, getPack, createPack, updatePack, deletePack };
export default { getAllPacks, getPack, createPack, updatePack, deletePack };