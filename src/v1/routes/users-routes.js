import express from 'express';
import usersController from '../../controllers/users-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
const router = express.Router();

router
	.get('/', [auth, admin], usersController.getAllUsers)
	.get('/:username', [auth, admin], usersController.getUserByName)
	.post('/', [auth, admin], usersController.createUser)
	.put('/:username', [auth, admin], usersController.updateUserByName)
	.delete('/:username', [auth, admin], usersController.deleteUserByName);

export { router };