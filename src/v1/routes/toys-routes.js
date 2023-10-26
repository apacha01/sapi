import express from 'express';
import toysController from '../../controllers/toys-controller.js';
import { auth, admin } from '../../middlewares/auth.js';
const router = express.Router();

router
	.get('/', toysController.getAllToys)
	.get('/:toyName', toysController.getToyByName)
	.post('/', [auth, admin], toysController.createToy)
	.put('/:toyName', [auth, admin], toysController.updateToyByName)
	.delete('/:toyName', [auth, admin], toysController.deletePetByName);

export { router };