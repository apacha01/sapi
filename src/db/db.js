import { MongoClient } from 'mongodb';
import logger from '../lib/utils/logger.js';
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';

const dblogger = logger.child({ layer: 'Database' });

// https://mongodb.github.io/node-mongodb-native/6.2/interfaces/ConnectionPoolOptions.html
const client = new MongoClient(
	process.env.MONGODB_URL,
	{
		maxPoolSize: 20,
		maxIdleTimeMS: 10 * 60 * 1000, // 10 minutes
	}
);

client.on('error', (err) => {
	dblogger.error({ error: err, stack: err.stack }, 'Error on database client');
	throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error on database client', false);
});

const db = await client.connect()
	.then(conn => {
		dblogger.info('Connected to database');
		return conn.db(process.env.MONGODB_DB_NAME);
	})
	.catch(err => {
		dblogger.error({ error: err, stack: err.stack }, 'Error while connecting to database');
		throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Couldn\'t connect to database', false);
	});

export default db;