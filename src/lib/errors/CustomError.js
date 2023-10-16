// https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices

function CustomError(name, httpCode, description, isOperational) {
	Error.call(this);
	Error.captureStackTrace(this);
	this.name = name;
	this.httpCode = httpCode;
	this.description = description;
	this.isOperational = isOperational;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

export default CustomError;