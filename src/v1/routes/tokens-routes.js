import express from 'express';
import tokensController from '../../controllers/tokens-controller.js';
const router = express.Router();

router
	.get('/', tokensController.getAllTokens)
	.get('/:tokenName', tokensController.getTokenByName)
	.post('/', tokensController.createToken)
	.put('/:tokenName', tokensController.updateTokenByName)
	.delete('/:tokenName', tokensController.deletePetByName);

export { router };