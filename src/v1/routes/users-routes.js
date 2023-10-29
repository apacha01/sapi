import express from 'express';
import usersController from '../../controllers/users-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkUserExists = checkBodyParamExists('User');

router
	.get('/', [auth, admin], usersController.getAllUsers)
	.get('/:username', [auth, admin], usersController.getUserByName)
	.post('/', [auth, admin, checkUserExists], usersController.createUser)
	.put('/:username', [auth, admin, checkUserExists], usersController.updateUserByName)
	.delete('/:username', [auth, admin], usersController.deleteUserByName);

export { router };