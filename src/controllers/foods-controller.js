import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import foodsService from '../services/foods-service.js';
import logger from '../lib/utils/logger.js';

const flogger = logger.child({ model: 'Food', layer: 'Controller' });

const getAllFoods = (req, res, next) => {

	flogger.info('Calling service to get all foods');
	foodsService.getAll()
		.then(result => {
			flogger.info('Sending response with all foods');
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			flogger.debug({ error: err, stack: err.stack }, 'Failed to get foods from service');
			next(err);
		});
};

const getFoodByIdOrName = (req, res, next) => {
	const { foodIdOrName: idOrName } = req.params;

	flogger.info(`Calling service to get food with name '${idOrName}'`);
	foodsService.getOne(idOrName)
		.then(result => {
			flogger.info(`Sending response with food '${idOrName}'`);
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch(err => {
			flogger.debug({ error: err, stack: err.stack }, `Failed to get food with id or name '${idOrName}' from service`);
			next(err);
		});
};

const createFood = (req, res, next) => {
	const { food } = req.body;

	flogger.info('Calling service to create food');
	foodsService.createOne(food).then(result => {
		flogger.info('Sending response with food created');
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Food created.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, 'Service failed to create food');
		next(err);
	});
};

const updateFoodByIdOrName = (req, res, next) => {
	const { foodIdOrName: idOrName } = req.params;
	const { food } = req.body;

	flogger.info(`Calling service to update food with id or name '${idOrName}'`);
	foodsService.updateOne(idOrName, food).then(result => {
		flogger.info('Sending response with food updated');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food updated.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, `Failed to update food with id or name '${idOrName}'`);
		next(err);
	});
};

const deleteFoodByIdOrName = (req, res, next) => {
	const { foodIdOrName: idOrName } = req.params;

	flogger.info(`Calling service to delete food with id or name '${idOrName}'`);
	foodsService.deleteOne(idOrName).then(result => {
		flogger.info('Sending response with food deleted');
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food deleted.'));
	}).catch(err => {
		flogger.debug({ error: err, stack: err.stack }, `Failed to delete food with id or name '${idOrName}'`);
		next(err);
	});
};

export { getAllFoods, getFoodByIdOrName, createFood, updateFoodByIdOrName, deleteFoodByIdOrName };
export default { getAllFoods, getFoodByIdOrName, createFood, updateFoodByIdOrName, deleteFoodByIdOrName };