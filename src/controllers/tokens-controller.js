import tokensService from '../services/tokens-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import logger from '../lib/utils/logger.js';

const tlogger = logger.child({ model: 'Token', layer: 'Controller' });

const getAllTokens = (req, res, next) => {
	tlogger.info('Calling service to get all tokens');
	tokensService.getAllTokens()
		.then(result => {
			tlogger.info('Sending response with all tokens');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			tlogger.debug({ error: err, stack: err.stack }, 'Failed to get tokens from service');
			next(err);
		});
};

const getTokenByName = (req, res, next) => {
	const name = req.params.tokenName;

	tlogger.info(`Calling service to get token with name '${name}'`);
	tokensService.getTokenByName(name).then(result => {
		tlogger.info(`Sending response with token '${name}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to get token with name '${name}' from service`);
		next(err);
	});
};

const createToken = (req, res, next) => {
	const token = req.body.token;

	tlogger.info('Calling service to create token');
	tokensService.createToken(token).then(result => {
		tlogger.info('Sending response with token created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Token created.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, 'Service failed to create token');
		next(err);
	});
};

const updateTokenByName = (req, res, next) => {
	const name = req.params.tokenName;
	const token = req.body.token;

	tlogger.info(`Calling service to update token with name '${name}'`);
	tokensService.updateTokenByName(name, token).then(result => {
		tlogger.info('Sending response with token updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token updated.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to update token with name '${name}'`);
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const name = req.params.tokenName;

	tlogger.info(`Calling service to delete token with name '${name}'`);
	tokensService.deleteTokenByName(name).then(result => {
		tlogger.info('Sending response with token deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token deleted.'));
	}).catch(err => {
		tlogger.debug({ error: err, stack: err.stack }, `Failed to delete token with name '${name}'`);
		next(err);
	});
};

export { getAllTokens, getTokenByName, createToken, updateTokenByName, deletePetByName };
export default { getAllTokens, getTokenByName, createToken, updateTokenByName, deletePetByName };