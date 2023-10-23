import express from 'express';
import tokensController from '../../controllers/tokens-controller.js';
import auth, { admin } from '../../middlewares/auth.js';
const router = express.Router();

router
	.get('/', tokensController.getAllTokens)
	.get('/:tokenName', tokensController.getTokenByName)
	.post('/', [auth, admin], tokensController.createToken)
	.put('/:tokenName', [auth, admin], tokensController.updateTokenByName)
	.delete('/:tokenName', [auth, admin], tokensController.deletePetByName);

export { router };