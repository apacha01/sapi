import express from 'express';
import petsController from '../../controllers/pets-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkPetExists = checkBodyParamExists('Pet');

router
	.get('/', petsController.getAllPets)
	.get('/:petName', petsController.getPetByName)
	.post('/', [auth, admin, checkPetExists], petsController.createPet)
	.put('/:petName', [auth, admin, checkPetExists], petsController.updatePet)
	.delete('/:petName', [auth, admin], petsController.deletePetByName);

export { router };