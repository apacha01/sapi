import express from 'express';
import packsController from '../../controllers/packs-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkPackExists = checkBodyParamExists('Pack');

router
	.get('/', packsController.getAllPacks)
	.get('/:packName', packsController.getPackByName)
	.post('/', [auth, admin, checkPackExists], packsController.createPack)
	.put('/:packName', [auth, admin, checkPackExists], packsController.updatePack)
	.delete('/:packName', [auth, admin], packsController.deletePackByName);

export { router };