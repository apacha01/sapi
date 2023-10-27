import express from 'express';
import foodsController from '../../controllers/foods-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
const router = express.Router();

router
	.get('/', foodsController.getAllFoods)
	.get('/:foodName', foodsController.getFoodByName)
	.post('/', [auth, admin], foodsController.createFood)
	.put('/:foodName', [auth, admin], foodsController.updateFood)
	.delete('/:foodName', [auth, admin], foodsController.deleteFoodByName);

export { router };