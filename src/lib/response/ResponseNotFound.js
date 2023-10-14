import Response from './Response.js';

class ResponseNotFound extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.NOT_FOUND.code, Response.HTTP_STATUS.NOT_FOUND.msg, extra, fields, documentationURL);
	}
}

export default ResponseNotFound;