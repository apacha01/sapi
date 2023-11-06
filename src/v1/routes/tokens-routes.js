import express from 'express';
import tokensController from '../../controllers/tokens-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkTokenExists = checkBodyParamExists('Token');

router
	.get('/', tokensController.getAllTokens)
	.get('/:tokenIdOrName', tokensController.getToken)
	.post('/', [auth, admin, checkTokenExists], tokensController.createToken)
	.put('/:tokenIdOrName', [auth, admin, checkTokenExists], tokensController.updateToken)
	.delete('/:tokenId', [auth, admin], tokensController.deleteToken);

export { router };