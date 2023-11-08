const HTTP_STATUS = {
	OK: { code: 200, msg: 'Ok.', url: '#' },
	CREATED: { code: 201, msg: 'Created.', url: '#' },
	BAD_REQUEST: { code: 400, msg: 'Bad Request.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#400-bad-request' },
	UNAUTHORIZED: { code: 401, msg: 'Unauthorized.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#401-unauthorized' },
	FORBIDDEN: { code: 403, msg: 'Forbidden.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#403-forbidden' },
	NOT_FOUND: { code: 404, msg: 'Not found.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#404-not-found' },
	ALREADY_EXISTS: { code: 409, msg: 'Conflict.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#409-conflict' },
	UNPROCESSABLE_ENTITY: { code: 422, msg: 'Insufficient information.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#422-insufficient-information' },
	SERVER_ERROR: { code: 500, msg: 'Unexpected error.', url: 'https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#500-server-error' }
};

export default HTTP_STATUS;