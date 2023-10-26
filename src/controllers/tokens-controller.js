import tokensService from '../services/tokens-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';

const getAllTokens = (req, res, next) => {
	tokensService.getAllTokens()
		.then(result => {
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const getTokenByName = (req, res, next) => {
	const name = req.params.tokenName;

	tokensService.getTokenByName(name).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		next(err);
	});
};

const createToken = (req, res, next) => {
	const token = req.body.token;

	tokensService.createToken(token).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token created.'));
	}).catch(err => {
		next(err);
	});
};

const updateTokenByName = (req, res, next) => {
	const name = req.params.tokenName;
	const token = req.body.token;

	tokensService.updateTokenByName(name, token).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token updated.'));
	}).catch(err => {
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const name = req.params.tokenName;

	tokensService.deleteTokenByName(name).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Token deleted.'));
	}).catch(err => {
		next(err);
	});
};

export { getAllTokens, getTokenByName, createToken, updateTokenByName, deletePetByName };
export default { getAllTokens, getTokenByName, createToken, updateTokenByName, deletePetByName };