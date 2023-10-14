import Response from './Response.js';

class ResponseAlreadyExists extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.ALREADY_EXISTS.code, Response.HTTP_STATUS.ALREADY_EXISTS.msg, extra, fields, documentationURL);
	}
}

export default ResponseAlreadyExists;