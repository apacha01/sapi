import ResponseNotFound from '../lib/response/ResponseNotFound.js';

const notFound = (req, res) => {
	const url = req.originalUrl;
	res.status(404).json(new ResponseNotFound(`Page with path '${url}' not found.`));
};

export { notFound };
export default { notFound };