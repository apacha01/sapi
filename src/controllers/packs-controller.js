import Response from '../lib/response/Response.js';
import HTTP_STATUS from '../lib/constants/http.js';
import packsService from '../services/packs-service.js';

const getAllPacks = (req, res, next) => {
	packsService.getAllPacks().then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch((err) => {
		next(err);
	});
};

const getPackByName = (req, res, next) => {
	const { packName: name } = req.params;

	packsService.getPackByName(name).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result));
	}).catch((err) => {
		next(err);
	});
};

const createPack = (req, res, next) => {
	const { pack } = req.body;

	packsService.createPack(pack).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack created'));
	}).catch(err => {
		next(err);
	});
};

const updatePack = (req, res, next) => {
	const { packName } = req.params;
	const { pack } = req.body;

	packsService.updatePack(packName, pack).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack updated'));
	}).catch(err => {
		next(err);
	});
};

const deletePackByName = (req, res, next) => {
	const { packName } = req.params;

	packsService.deletePackByName(packName).then(result => {
		res.status(HTTP_STATUS.OK.code).json(new Response(HTTP_STATUS.OK.code, HTTP_STATUS.OK.msg, result, 'Pack deleted'));
	}).catch(err => {
		next(err);
	});
};

export { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };
export default { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };