import tokensService from '../services/tokens-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';

const getAllTokens = (req, res, next) => {
	tokensService.getAllTokens()
		.then(result => {
			res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

export { getAllTokens };
export default { getAllTokens };