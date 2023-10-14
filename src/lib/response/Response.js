class Response {
	constructor(code = 200, message = 'Error Message', extra = '', fields = [], documentationURL = '') {
		this.code = code;
		this.message = message;
		this.extra = extra;
		this.fields = fields;
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

	get code() { return this.code; }
	get message() { return this.message; }
	get extra() { return this.extra; }
	get fields() { return this.fields; }
	get documentationURL() { return this.documentationURL; }

	set code(code) { this.code = code; }
	set message(message) { this.message = message; }
	set extra(extra) { this.extra = extra; }
	set fields(fields) { this.fields = fields; }
	set documentationURL(documentationURL) { this.documentationURL = documentationURL; }
}


export default Response;