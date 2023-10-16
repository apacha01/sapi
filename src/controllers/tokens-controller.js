import tokensService from '../services/tokens-service.js';
import Response from '../lib/response/Response.js';

const getAllTokens = (req, res, next) => {
	tokensService.getAllTokens()
		.then(result => {
			res.status(200).json(new Response(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

export { getAllTokens };
export default { getAllTokens };