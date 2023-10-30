import express from 'express';
import foodsController from '../../controllers/foods-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkFoodParamExists = checkBodyParamExists('Food');

router
	.get('/', foodsController.getAllFoods)
	.get('/:foodName', foodsController.getFoodByName)
	.post('/', [auth, admin, checkFoodParamExists], foodsController.createFood)
	.put('/:foodName', [auth, admin, checkFoodParamExists], foodsController.updateFood)
	.delete('/:foodName', [auth, admin], foodsController.deleteFoodByName);

export { router };