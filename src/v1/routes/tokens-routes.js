import express from 'express';
import tokensController from '../../controllers/tokens-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkTokenExists = checkBodyParamExists('Token');

router
	.get('/', tokensController.getAllTokens)
	.get('/:tokenName', tokensController.getTokenByName)
	.post('/', [auth, admin, checkTokenExists], tokensController.createToken)
	.put('/:tokenName', [auth, admin, checkTokenExists], tokensController.updateTokenByName)
	.delete('/:tokenName', [auth, admin], tokensController.deletePetByName);

export { router };