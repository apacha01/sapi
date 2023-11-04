import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import foodsService from '../services/foods-service.js';
import logger from '../lib/utils/logger.js';

const flogger = logger.child({ model: 'Food', layer: 'Controller' });

const getAllFoods = (req, res, next) => {

	flogger.info('Calling service to get all foods');
	foodsService.getAllFoods()
		.then(result => {
			flogger.info('Sending response with all foods');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			flogger.debug({ error: err, stack: err.stack }, 'Failed to get foods from service');
			next(err);
		});
};

const getFoodByName = (req, res, next) => {
	const { foodName: name } = req.params;

	flogger.info(`Calling service to get food with name '${name}'`);
	foodsService.getFoodByName(name)
		.then(result => {
			flogger.info(`Sending response with food '${name}'`);
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			flogger.debug({ error: err, stack: err.stack }, `Failed to get food with name '${name}' from service`);
			next(err);
		});
};

const createFood = (req, res, next) => {
	const { food } = req.body;

	flogger.info('Calling service to create food');
	foodsService.createFood(food).then(result => {
		flogger.info('Sending response with food created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Food created.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, 'Service failed to create food');
		next(err);
	});
};

const updateFood = (req, res, next) => {
	const { foodName: name } = req.params;
	const { food } = req.body;

	flogger.info(`Calling service to update food with name '${name}'`);
	foodsService.updateFood(name, food).then(result => {
		flogger.info('Sending response with food updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food updated.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, `Failed to update food with name '${name}'`);
		next(err);
	});
};

const deleteFoodByName = (req, res, next) => {
	const { foodName: name } = req.params;

	flogger.info(`Calling service to delete food with name '${name}'`);
	foodsService.deleteFoodByName(name).then(result => {
		flogger.info('Sending response with food deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food deleted.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, `Failed to delete food with name '${name}'`);
		next(err);
	});
};

export { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };
export default { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };