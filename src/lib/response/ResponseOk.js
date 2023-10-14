import Response from './Response.js';

class ResponseOk extends Response {
	constructor(content, extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, content, extra, fields, documentationURL);
	}
}

export default ResponseOk;