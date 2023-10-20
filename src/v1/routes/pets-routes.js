import express from 'express';
import petsController from '../../controllers/pets-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
const router = express.Router();

router
	.get('/', [auth], petsController.getAllPets)
	.get('/:petName', petsController.getPetByName)
	.post('/', [auth, admin], petsController.createPet)
	.put('/:petName', [auth, admin], petsController.updatePet)
	.delete('/:petName', [auth, admin], petsController.deletePetByName);

export { router };