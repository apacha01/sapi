import express from 'express';
import petsController from '../../controllers/pets-controller.js';
const router = express.Router();

router
	.get('/', petsController.getAllPets)
	.get('/:petId', petsController.getPetByName)
	.post('/', petsController.createPet)
	.patch('/:petId', petsController.updatePet)
	.delete('/:petId', petsController.deletePetByName);

export { router };