import logger from '../lib/utils/logger.js';

const loggerMiddleware = (req, res, next) => {
	logger.info(`From: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} - Method: ${req.method} - To: ${req.url}`);
	next();
};

export default loggerMiddleware;