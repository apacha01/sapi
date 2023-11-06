import express from 'express';
import petsController from '../../controllers/pets-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkPetExists = checkBodyParamExists('Pet');

router
	.get('/', petsController.getAllPets)
	.get('/:petIdOrName', petsController.getPet)
	.post('/', [auth, admin, checkPetExists], petsController.createPet)
	.put('/:petIdOrName', [auth, admin, checkPetExists], petsController.updatePet)
	.delete('/:petId', [auth, admin], petsController.deletePet);

export { router };