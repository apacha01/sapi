import HTTP_STATUS from '../lib/constants/http.js';
import CustomError from '../lib/errors/CustomError.js';

const checkBodyParamExists = (param = '') => {
	return (req, res, next) => {
		if (!req.body[param.toLowerCase()])
			next(new CustomError(
				HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
				HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
				`${param} can't be undefined or null. Check if property '${param.toLowerCase()}' is set.`,
				true));
		next();
	};
};

export { checkBodyParamExists };