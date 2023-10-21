import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import usersService from '../services/users-service.js';

const getAllUsers = (req, res, next) => {
	usersService.getAllUsers().then((result) => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch((err) => {
		next(err);
	});
};


const getUserByName = (req, res, next) => {
	const username = req.params.username;

	usersService.getUserByName(username).then((result) => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch((err) => {
		next(err);
	});
};

const createUser = (req, res, next) => {
	const user = req.body.user;

	usersService.createUser(user).then((result) => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User created.'));
	}).catch((err) => {
		next(err);
	});
};

const updateUserByName = (req, res, next) => {
	const user = req.body.user;
	const name = req.params.username;

	usersService.updateUserByName(name, user).then((result) => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User updated.'));
	}).catch((err) => {
		next(err);
	});
};

const deleteUserByName = (req, res, next) => {
	const name = req.params.username;

	usersService.deleteUserByName(name).then((result) => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'User deleted.'));
	}).catch((err) => {
		next(err);
	});
};

export default { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };
export { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName };