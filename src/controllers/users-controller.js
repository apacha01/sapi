import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import usersService from '../services/users-service.js';
import logger from '../lib/utils/logger.js';

const ulogger = logger.child({ model: 'User', layer: 'Controller' });

const getAllUsers = (req, res, next) => {
	ulogger.info('Calling service to get all users');
	usersService.getAllUsers().then(result => {
		ulogger.info('Sending response with all users');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, 'Failed to get users from service');
		next(err);
	});
};


const getUserByName = (req, res, next) => {
	const { username } = req.params;

	ulogger.info(`Calling service to get user with username '${username}'`);
	usersService.getUserByName(username).then(result => {
		ulogger.info(`Sending response with user '${username}'`);
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to get user with username '${username}' from service`);
		next(err);
	});
};

const createUser = (req, res, next) => {
	const user = req.body.user;

	ulogger.info('Calling service to create user');
	usersService.createUser(user).then(result => {
		ulogger.info('Sending response with user created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'User created.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, 'Service failed to create user');
		next(err);
	});
};

const updateUserByName = (req, res, next) => {
	const { user } = req.body;
	const { username } = req.params;

	ulogger.info(`Calling service to update user with username '${username}'`);
	usersService.updateUserByName(username, user).then(result => {
		ulogger.info('Sending response with user updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User updated.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to update user with username '${username}'`);
		next(err);
	});
};

const deleteUserByName = (req, res, next) => {
	const { username } = req.params;

	ulogger.info(`Calling service to delete user with name '${username}'`);
	usersService.deleteUserByName(username).then(result => {
		ulogger.info('Sending response with user deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User deleted.'));
	}).catch(err => {
		ulogger.debug({ error: err, stack: err.stack }, `Failed to delete user with username '${username}'`);
		next(err);
	});
};

export default { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };
export { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };