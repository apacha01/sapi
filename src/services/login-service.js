import HTTP_STATUS from '../lib/constants/http.js';
import CustomError from '../lib/errors/CustomError.js';
import { verify } from '../lib/utils/encryption.js';
import logger from '../lib/utils/logger.js';
import dal from '../db/dal.js';

const llogger = logger.child({ model: 'Login', layer: 'Service' });
const { findByName } = dal('users', logger);

const checkCredentials = async (name, password) => {
	llogger.info(`Getting user with name '${name}'`);
	const user = await findByName(name);
	llogger.debug({ user }, 'User retrieved');

	if (!user)
		throw new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Wrong name or password.', true);

	llogger.info('Verifying user with password');
	const passwordsMatch = await verify(password, user.password).catch(err => {
		llogger.debug({ error: err, stack: err.stack }, 'Error verifying user password');
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error verifying user password.', true);
	});

	if (!passwordsMatch)
		throw new CustomError(HTTP_STATUS.UNAUTHORIZED.msg, HTTP_STATUS.UNAUTHORIZED.code, 'Wrong name or password.', true);

	return user;
};

export default { checkCredentials };
export { checkCredentials };