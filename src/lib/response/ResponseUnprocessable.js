import Response from './Response.js';

class ResponseUnprocessable extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.UNPROCESSABLE_ENTITY.code, Response.HTTP_STATUS.UNPROCESSABLE_ENTITY.msg, extra, fields, documentationURL);
	}
}

export default ResponseUnprocessable;