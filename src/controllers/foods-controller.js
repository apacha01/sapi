import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import foodsService from '../services/foods-service.js';

const getAllFoods = (req, res, next) => {
	foodsService.getAllFoods()
		.then(result => {
			res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const getFoodByName = (req, res, next) => {
	const { foodName: name } = req.params;

	foodsService.getFoodByName(name)
		.then(result => {
			res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const createFood = (req, res, next) => {
	const { food } = req.body;

	foodsService.createFood(food).then(result => {
		res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food created.'));
	}).catch(err => {
		next(err);
	});
};

const updateFood = (req, res, next) => {
	const { foodName } = req.params;
	const { food } = req.body;

	foodsService.updateFood(foodName, food).then(result => {
		res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food updated.'));
	}).catch(err => {
		next(err);
	});
};

const deleteFoodByName = (req, res, next) => {
	const { foodName } = req.params;

	foodsService.deleteFoodByName(foodName).then(result => {
		res.status(200).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Food deleted.'));
	}).catch(err => {
		next(err);
	});
};

export { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };
export default { getAllFoods, getFoodByName, createFood, updateFood, deleteFoodByName };