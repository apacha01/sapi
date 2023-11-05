import express from 'express';
import loginController from '../../controllers/login-controller.js';
import { checkBodyParamExists } from '../../middlewares/check-body-params.js';
const router = express.Router();

const checkUsernameExists = checkBodyParamExists('Name');
const checkPasswordExists = checkBodyParamExists('Password');

router
	.post('/', [checkUsernameExists, checkPasswordExists], loginController.checkCredentials);

export default { router };
export { router };