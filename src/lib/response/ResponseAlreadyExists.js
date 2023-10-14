import Response from './Response.js';

class ResponseAlreadyExists extends Response {
	constructor(content, extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.ALREADY_EXISTS.code, Response.HTTP_STATUS.ALREADY_EXISTS.msg, content, extra, fields, documentationURL);
	}
}

export default ResponseAlreadyExists;