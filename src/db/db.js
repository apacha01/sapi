import { MongoClient } from 'mongodb';
import logger from '../lib/utils/logger.js';

const dblogger = logger.child({ layer: 'Database' });

// https://mongodb.github.io/node-mongodb-native/6.2/interfaces/ConnectionPoolOptions.html
const client = new MongoClient(
	process.env.MONGODB_URL,
	{
		maxPoolSize: 20,
		maxIdleTimeMS: 10 * 60 * 1000,
		maxConnecting: 5,
		waitQueueTimeoutMS: 10000
	}
);

client.on('error', (err) => {
	dblogger.error({ error: err, stack: err.stack }, 'Error on database client');
});

const connection = await client.connect().catch(err => {
	dblogger.error({ error: err, stack: err.stack }, 'Error while connecting to database');
});

const db = connection.db(process.env.MONGODB_DB_NAME);

export default db;