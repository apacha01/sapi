import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';

const pageNotFound = (req, res) => {
	const url = req.originalUrl;
	return res.status(HTTP_STATUS.NOT_FOUND.code).json(
		new Response(HTTP_STATUS.NOT_FOUND.code, HTTP_STATUS.NOT_FOUND.msg, {}, `Page with path '${url}' not found.`)
	);
};

export default pageNotFound;