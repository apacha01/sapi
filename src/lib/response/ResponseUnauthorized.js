import Response from './Response.js';

class ResponseUnauthorized extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.UNAUTHORIZED.code, Response.HTTP_STATUS.UNAUTHORIZED.msg, extra, fields, documentationURL);
	}
}

export default ResponseUnauthorized;