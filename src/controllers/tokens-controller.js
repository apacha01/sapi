import tokensService from '../services/tokens-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';

const tlogger = logger.child({ model: 'Token', layer: 'Controller' });

const getAllTokens = (req, res, next) => {
	tlogger.info('Calling service to get all tokens');
	tokensService.getAll()
		.then(result => {
			tlogger.info('Sending response with all tokens');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			tlogger.debug({ error: err, stack: err.stack }, 'Failed to get tokens from service');
			next(err);
		});
};

const getToken = (req, res, next) => {
	const { tokenIdOrName: idOrName } = req.params;

	tlogger.info(`Calling service to get token with id or name '${idOrName}'`);
	tokensService.getOne(idOrName).then(result => {
		tlogger.info(`Sending response with token '${idOrName}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to get token with id or name '${idOrName}' from service`);
		next(err);
	});
};

const createToken = (req, res, next) => {
	const { token } = req.body;

	tlogger.info('Calling service to create token');
	tokensService.createOne(token).then(result => {
		tlogger.info('Sending response with token created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Token created.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, 'Service failed to create token');
		next(err);
	});
};

const updateToken = (req, res, next) => {
	const { tokenIdOrName: idOrName } = req.params;
	const { token } = req.body;

	tlogger.info(`Calling service to update token with id or name '${idOrName}'`);
	tokensService.updateOne(idOrName, token).then(result => {
		tlogger.info('Sending response with token updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token updated.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to update token with id or name '${idOrName}'`);
		next(err);
	});
};

const deleteToken = (req, res, next) => {
	const { tokenId: id } = req.params;

	tlogger.info(`Calling service to delete token with id '${id}'`);
	tokensService.deleteOne(id).then(result => {
		tlogger.info('Sending response with token deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token deleted.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to delete token with id '${id}'`);
		next(err);
	});
};

export { getAllTokens, getToken, createToken, updateToken, deleteToken };
export default { getAllTokens, getToken, createToken, updateToken, deleteToken };