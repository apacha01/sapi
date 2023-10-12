import express from 'express';
import { createPet, deletePetByName, getAllPets, getPetByName, updatePet } from '../../controllers/pets-controller.js';
const router = express.Router();

router
	.get('/', getAllPets)
	.get('/:petId', getPetByName)
	.post('/', createPet)
	.patch('/:petId', updatePet)
	.delete('/:petId', deletePetByName);

export { router };