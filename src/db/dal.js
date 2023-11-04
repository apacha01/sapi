import { ObjectId } from 'mongodb';
import HTTP_STATUS from '../lib/constants/http.js';
import CustomError from '../lib/errors/CustomError.js';
import db from './db.js';

const dal = (model = '', logger) => {
	const dalogger = logger.child({ model: model, layer: 'DAL' });

	const collection = db.collection(model);
	const modelName = model.substring(0, model.length - 1); // Remove the s from collection name

	return {
		async findAll(filters = {}) {
			dalogger.info(`Getting all ${model}`);
			return await collection.find(filters).toArray().catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to retrieve ${model}, error (${err.code}) ocurred`);
				throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while reading ${model}`);
			});
		},

		async findById(id) {
			dalogger.info(`Getting ${modelName} with id '${id}'`);
			return await collection.findOne({ _id: new ObjectId(id) })
				.catch(err => {
					dalogger.debug({ error: err, stack: err.stack }, `Unable to retrieve ${modelName} with id '${id}', error (${err.code}) ocurred`);
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error while getting data');
				});
		},

		async createOne(toCreateModel) {
			dalogger.info(`Creating ${modelName}`);
			return await collection.insertOne(toCreateModel, { willRetryWrite: false }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to create ${modelName}, error (${err.code}) ocurred`);
				if (err.code === 11000)
					throw new CustomError(
						HTTP_STATUS.ALREADY_EXISTS.msg,
						HTTP_STATUS.ALREADY_EXISTS.code,
						`${modelName} with name '${toCreateModel.name}' already exists.`,
						true
					);
				else
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while creating ${modelName}`, true);
			});
		},

		async updateById(id, toUpdateModel) {
			dalogger.info(`Updating ${modelName} with id ${id}`);
			return await collection.findOneAndUpdate({ _id: new ObjectId(id) }, toUpdateModel).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to update ${modelName} with id ${id}, error (${err.code}) ocurred`);
				if (err.code === 11000)
					throw new CustomError(
						HTTP_STATUS.ALREADY_EXISTS.msg,
						HTTP_STATUS.ALREADY_EXISTS.code,
						`${modelName} with name '${toUpdateModel.name}' already exists.`,
						true
					);
				else
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while updating ${modelName}`, true);
			});
		},

		async deleteById(id) {
			dalogger.info(`Deleting ${modelName} with id ${id}`);
			return await collection.findOneAndDelete({ _id: new ObjectId(id) }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to delete ${modelName} with id ${id}, error (${err.code}) ocurred`);
				throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while deleting ${modelName}`, true);
			});
		}
	};
};

export default dal;