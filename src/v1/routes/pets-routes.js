import express from 'express';
import petsController from '../../controllers/pets-controller.js';
const router = express.Router();

router
	.get('/', petsController.getAllPets)
	.get('/:petName', petsController.getPetByName)
	.post('/', petsController.createPet)
	.put('/:petName', petsController.updatePet)
	.delete('/:petName', petsController.deletePetByName);

export { router };