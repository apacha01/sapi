import Response from '../lib/response/Response.js';

const logger = (err, req, res, next) => {
	req.log.error(err);
	next(err);
};

const pageNotFound = (req, res, next) => {
	const url = req.originalUrl;
	res.status(Response.HTTP_STATUS.NOT_FOUND.code).json(
		new Response(Response.HTTP_STATUS.NOT_FOUND.code, Response.HTTP_STATUS.NOT_FOUND.msg, {}, `Page with path '${url}' not found.`)
	);
	next();
};

const errorHandler = (err, req, res, next) => {
	// express.json() middleware
	if (err instanceof SyntaxError)
		res.status(400).json(new Response(400, 'Parse error.', {}, 'Incorrect JSON object sended.'));
	// Custom errors
	else if (err.isOperational)
		res.status(err.httpCode).json(new Response(err.httpCode, err.name, {}, err.description));
	// Unknown error
	else
		res.status(Response.HTTP_STATUS.SERVER_ERROR.code).json(
			new Response(Response.HTTP_STATUS.SERVER_ERROR.code, Response.HTTP_STATUS.SERVER_ERROR.msg, {}, 'There was an unexpected error.')
		);
};

export { errorHandler, pageNotFound, logger };