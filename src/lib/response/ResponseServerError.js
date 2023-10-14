import Response from './Response.js';

class ResponseServerError extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.SERVER_ERROR.code, Response.HTTP_STATUS.SERVER_ERROR.msg, extra, fields, documentationURL);
	}
}

export default ResponseServerError;