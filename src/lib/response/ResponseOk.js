import Response from './Response.js';

class ResponseOk extends Response {
	constructor(content, extra, documentationURL) {
		super(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, content, extra, documentationURL);
	}
}

export default ResponseOk;