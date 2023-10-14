import Response from './Response.js';

class ResponseOk extends Response {
	constructor(extra, fields, documentationURL) {
		super(Response.HTTP_STATUS.OK.code, Response.HTTP_STATUS.OK.msg, extra, fields, documentationURL);
	}
}

export default ResponseOk;