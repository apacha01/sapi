class Response {
	constructor(code = 200, message = 'Response Message', content = {}, description = '', documentationURL = '') {
		this.code = code;
		this.message = message;
		this.content = content;
		this.description = description;
		this.documentationURL = documentationURL;
	}

	static HTTP_STATUS = {
		OK: { code: 200, msg: 'Ok.' },
		UNAUTHORIZED: { code: 401, msg: 'Unauthorized.' },
		NOT_FOUND: { code: 404, msg: 'Not found.' },
		ALREADY_EXISTS: { code: 409, msg: 'Conflict.' },
		UNPROCESSABLE_ENTITY: { code: 422, msg: 'Insufficient information.' },
		SERVER_ERROR: { code: 500, msg: 'Unexpected error.' }
	};
}


export default Response;