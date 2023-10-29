import express from 'express';
import toysController from '../../controllers/toys-controller.js';
import { auth, admin } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkToyExists = checkBodyParamExists('Toy');

router
	.get('/', toysController.getAllToys)
	.get('/:toyName', toysController.getToyByName)
	.post('/', [auth, admin, checkToyExists], toysController.createToy)
	.put('/:toyName', [auth, admin, checkToyExists], toysController.updateToyByName)
	.delete('/:toyName', [auth, admin], toysController.deletePetByName);

export { router };