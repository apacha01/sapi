import toysService from '../services/toys-service.js';
import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';

const getAllToys = (req, res, next) => {
	toysService.getAllToys()
		.then(result => {
			res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
		})
		.catch((err) => {
			next(err);
		});
};

const getToyByName = (req, res, next) => {
	const name = req.params.toyName;

	toysService.getToyByName(name).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch(err => {
		next(err);
	});
};

const createToy = (req, res, next) => {
	const toy = req.body.toy;

	toysService.createToy(toy).then(result => {
		res.status(HTTP_STATUS.CREATED.code).json(new Response(HTTP_STATUS.CREATED.code, HTTP_STATUS.CREATED.msg, result, 'Toy created.'));
	}).catch(err => {
		next(err);
	});
};

const updateToyByName = (req, res, next) => {
	const name = req.params.toyName;
	const toy = req.body.toy;

	toysService.updateToyByName(name, toy).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy updated.'));
	}).catch(err => {
		next(err);
	});
};

const deletePetByName = (req, res, next) => {
	const name = req.params.toyName;

	toysService.deleteToyByName(name).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Toy deleted.'));
	}).catch(err => {
		next(err);
	});
};

export { getAllToys, getToyByName, createToy, updateToyByName, deletePetByName };
export default { getAllToys, getToyByName, createToy, updateToyByName, deletePetByName };