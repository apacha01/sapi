import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import usersService from '../services/users-service.js';
import logger from '../lib/utils/logger.js';

const ulogger = logger.child({ model: 'User', layer: 'Controller' });

const getAllUsers = (req, res, next) => {
	ulogger.info('Calling service to get all users');
	usersService.getAll()
		.then(result => {
			ulogger.info('Sending response with all users');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		}).catch(err => {
			ulogger.debug({ error: err, stack: err.stack }, 'Failed to get users from service');
			next(err);
		});
};

const getUser = (req, res, next) => {
	const { userIdOrName: idOrName } = req.params;

	ulogger.info(`Calling service to get user with id or name '${idOrName}'`);
	usersService.getOne(idOrName).then(result => {
		ulogger.info(`Sending response with user '${idOrName}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to get user with id or name '${idOrName}' from service`);
		next(err);
	});
};

const createUser = (req, res, next) => {
	const { user } = req.body;

	ulogger.info('Calling service to create user');
	usersService.createOne(user).then(result => {
		ulogger.info('Sending response with user created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'User created.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, 'Service failed to create user');
		next(err);
	});
};

const updateUser = (req, res, next) => {
	const { user } = req.body;
	const { userIdOrName: idOrName } = req.params;

	ulogger.info(`Calling service to update user with id or name '${idOrName}'`);
	usersService.updateOne(idOrName, user).then(result => {
		ulogger.info('Sending response with user updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User updated.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to update user with id or name '${idOrName}'`);
		next(err);
	});
};

const deleteUser = (req, res, next) => {
	const { userId: id } = req.params;

	ulogger.info(`Calling service to delete user with id '${id}'`);
	usersService.deleteOne(id).then(result => {
		ulogger.info('Sending response with user deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User deleted.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to delete user with id '${id}'`);
		next(err);
	});
};

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
export { getAllUsers, getUser, createUser, updateUser, deleteUser };