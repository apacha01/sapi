import express from 'express';
import foodsController from '../../controllers/foods-controller.js';
import { admin, auth } from '../../middlewares/auth.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkFoodParamExists = checkBodyParamExists('Food');

router
	.get('/', foodsController.getAllFoods)
	.get('/:foodIdOrName', foodsController.getFoodByIdOrName)
	.post('/', [auth, admin, checkFoodParamExists], foodsController.createFood)
	.put('/:foodIdOrName', [auth, admin, checkFoodParamExists], foodsController.updateFoodByIdOrName)
	.delete('/:foodIdOrName', [auth, admin], foodsController.deleteFoodByIdOrName);

export { router };