import express from 'express';
import usersController from '../../controllers/users-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkUserExists = checkBodyParamExists('User');

router
	.get('/', [auth, admin], usersController.getAllUsers)
	.get('/:userIdOrName', [auth, admin], usersController.getUser)
	.post('/', [auth, admin, checkUserExists], usersController.createUser)
	.put('/:userIdOrName', [auth, admin, checkUserExists], usersController.updateUser)
	.delete('/:userId', [auth, admin], usersController.deleteUser);

export { router };