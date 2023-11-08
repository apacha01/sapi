import HTTP_STATUS from '../constants/http.js';
import Response from '../response/Response.js';
import logger from '../utils/logger.js';

const handleError = (error, response = undefined) => {
	logger.error(error, error.description ?? error.message);

	if (response) {
		if (error instanceof SyntaxError)
			return response.status(HTTP_STATUS.BAD_REQUEST.code).json(
				new Response(HTTP_STATUS.BAD_REQUEST.code, HTTP_STATUS.BAD_REQUEST.msg, {}, 'Only JSON requests are admitted.')
			);

		if (error.isOperational) {
			// Get error url from constant
			const url = HTTP_STATUS[Object.keys(HTTP_STATUS).find(key => HTTP_STATUS[key].code === error.httpCode)].url;

			return response.status(error.httpCode).json(
				new Response(error.httpCode, error.name, {}, error.description, url)
			);
		}

		if (!error.isOperational)
			return response.status(HTTP_STATUS.SERVER_ERROR.code).json(
				new Response(HTTP_STATUS.SERVER_ERROR.code, HTTP_STATUS.SERVER_ERROR.msg, {}, 'There was an unexpected error.', HTTP_STATUS.SERVER_ERROR.url)
			);
	}

	if (!error.isOperational)
		process.exit(1);

};

export default { handleError };