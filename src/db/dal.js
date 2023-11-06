import { ObjectId } from 'mongodb';
import HTTP_STATUS from '../lib/constants/http.js';
import CustomError from '../lib/errors/CustomError.js';
import db from './db.js';

const dal = (model = '', logger) => {
	const dalogger = logger.child({ model: model, layer: 'DAL' });

	const collection = db.collection(model);
	const modelName = model.substring(0, model.length - 1); // Remove the s from collection name
	const modelNameFirstUpper = modelName[0].toUpperCase() + modelName.substring(1, modelName.length);

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

			let oid;
			try {
				oid = new ObjectId(id);
			} catch (error) {
				dalogger.warn(`Invalid id '${id}. Must be a 24 character hex string, 12 byte Uint8Array, or an integer'`);
				return null;
			}

			return await collection.findOne({ _id: oid })
				.catch(err => {
					dalogger.debug({ error: err, stack: err.stack }, `Unable to retrieve ${modelName} with id '${id}', error (${err.code}) ocurred`);
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error while getting data');
				});
		},

		async findByName(name) {
			dalogger.info(`Getting ${modelName} with name '${name}'`);
			return await collection.findOne({ name })
				.catch(err => {
					dalogger.debug({ error: err, stack: err.stack }, `Unable to retrieve ${modelName} with name '${name}', error (${err.code}) ocurred`);
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, 'Error while getting data');
				});
		},

		async insertOne(toCreateModel) {
			dalogger.info(`Creating ${modelName}`);
			return await collection.insertOne(toCreateModel, { willRetryWrite: false }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to create ${modelName}, error (${err.code}) ocurred`);
				if (err.code === 11000)
					throw new CustomError(
						HTTP_STATUS.ALREADY_EXISTS.msg,
						HTTP_STATUS.ALREADY_EXISTS.code,
						`${modelNameFirstUpper} with name or id '${toCreateModel.name}' already exists.`,
						true
					);
				else
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while creating ${modelName}`, true);
			});
		},

		async updateById(id, toUpdateModel) {
			dalogger.info(`Updating ${modelName} with id '${id}'`);

			let oid;
			try {
				oid = new ObjectId(id);
			} catch (error) {
				dalogger.warn(`Invalid id '${id}. Must be a 24 character hex string, 12 byte Uint8Array, or an integer'`);
				return null;
			}

			return await collection.findOneAndUpdate({ _id: oid }, { $set: toUpdateModel }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to update ${modelName} with id ${id}, error (${err.code}) ocurred`);
				if (err.code === 11000)
					throw new CustomError(
						HTTP_STATUS.ALREADY_EXISTS.msg,
						HTTP_STATUS.ALREADY_EXISTS.code,
						`${modelNameFirstUpper} with name '${toUpdateModel.name}' already exists.`,
						true
					);
				else
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while updating ${modelName}`, true);
			});
		},

		async updateByName(name, toUpdateModel) {
			dalogger.info(`Updating ${modelName} with name '${name}'`);
			return await collection.findOneAndUpdate({ name }, { $set: toUpdateModel }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to update ${modelName} with name ${name}, error (${err.code}) ocurred`);
				if (err.code === 11000)
					throw new CustomError(
						HTTP_STATUS.ALREADY_EXISTS.msg,
						HTTP_STATUS.ALREADY_EXISTS.code,
						`${modelNameFirstUpper} with name or name '${toUpdateModel.name}' already exists.`,
						true
					);
				else
					throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while updating ${modelName}`, true);
			});
		},

		async deleteById(id) {
			dalogger.info(`Deleting ${modelName} with id '${id}'`);

			let oid;
			try {
				oid = new ObjectId(id);
			} catch (error) {
				dalogger.warn(`Invalid id '${id}. Must be a 24 character hex string, 12 byte Uint8Array, or an integer'`);
				return null;
			}

			return await collection.findOneAndDelete({ _id: oid }).catch(err => {
				dalogger.debug({ error: err, stack: err.stack }, `Unable to delete ${modelName} with id ${id}, error (${err.code}) ocurred`);
				throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error while deleting ${modelName}`, true);
			});
		}
	};
};

export default dal;