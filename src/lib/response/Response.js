class Response {
	constructor(code = 200, message = 'Response Message', content = {}, description = '', documentationURL = '') {
		this.code = code;
		this.message = message;
		this.content = content;
		this.description = description;
		this.documentationURL = documentationURL;
	}
}


export default Response;