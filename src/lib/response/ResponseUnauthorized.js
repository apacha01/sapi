import Response from './Response.js';

class ResponseUnauthorized extends Response {
	constructor(content, extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.UNAUTHORIZED.code, Response.HTTP_STATUS.UNAUTHORIZED.msg, content, extra, fields, documentationURL);
	}
}

export default ResponseUnauthorized;