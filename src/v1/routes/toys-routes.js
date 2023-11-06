import express from 'express';
import toysController from '../../controllers/toys-controller.js';
import { auth, admin } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkToyExists = checkBodyParamExists('Toy');

router
	.get('/', toysController.getAllToys)
	.get('/:toyIdOrName', toysController.getToy)
	.post('/', [auth, admin, checkToyExists], toysController.createToy)
	.put('/:toyIdOrName', [auth, admin, checkToyExists], toysController.updateToy)
	.delete('/:toyId', [auth, admin], toysController.deleteToy);

export { router };