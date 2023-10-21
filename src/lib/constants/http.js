const HTTP_STATUS = {
	OK: { code: 200, msg: 'Ok.' },
	UNAUTHORIZED: { code: 401, msg: 'Unauthorized.' },
	FORBIDDEN: { code: 403, msg: 'Forbidden.' },
	NOT_FOUND: { code: 404, msg: 'Not found.' },
	ALREADY_EXISTS: { code: 409, msg: 'Conflict.' },
	UNPROCESSABLE_ENTITY: { code: 422, msg: 'Insufficient information.' },
	SERVER_ERROR: { code: 500, msg: 'Unexpected error.' }
};

export default HTTP_STATUS;