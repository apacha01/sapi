import Response from './Response.js';

class ResponseServerError extends Response {
	constructor(content, extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.SERVER_ERROR.code, Response.HTTP_STATUS.SERVER_ERROR.msg, content, extra, fields, documentationURL);
	}
}

export default ResponseServerError;