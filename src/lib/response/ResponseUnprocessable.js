import Response from './Response.js';

class ResponseUnprocessable extends Response {
	constructor(content, extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.UNPROCESSABLE_ENTITY.code, Response.HTTP_STATUS.UNPROCESSABLE_ENTITY.msg, content, extra, fields, documentationURL);
	}
}

export default ResponseUnprocessable;