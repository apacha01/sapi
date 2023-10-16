import express from 'express';
import tokensController from '../../controllers/tokens-controller.js';
const router = express.Router();

router
	.get('/', tokensController.getAllTokens)
	.get('/:tokenName', (req, res) => { res.json({ msg: 'getByName' }); })
	.post('/', (req, res) => { res.json({ msg: 'post' }); })
	.put('/:tokenName', (req, res) => { res.json({ msg: 'put' }); })
	.delete('/:tokenName', (req, res) => { res.json({ msg: 'delete' }); });

export { router };