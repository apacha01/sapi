// https://ajv.js.org/guide/managing-schemas.html#compiling-during-initialization
import Ajv from 'ajv';
import addFormat from 'ajv-formats';
import betterAjvErrors from 'better-ajv-errors';
import logger from './logger.js';
import fs from 'fs/promises';
import HTTP_STATUS from '../constants/http.js';
import CustomError from '../errors/CustomError.js';

const slogger = logger.child({ layer: 'Schemas' });

// Schemas
const handleSchemaError = (err, model) => {
	slogger.debug({ error: err, stack: err.stack }, `Error reading ${model} schema`);
	throw new CustomError(HTTP_STATUS.SERVER_ERROR.msg, HTTP_STATUS.SERVER_ERROR.code, `Error getting ${model} schema.`, false);
};

const foodSchema = await fs.readFile('./src/schemas/foods-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'foods');});
const packSchema = await fs.readFile('./src/schemas/packs-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'packs');});
const petSchema = await fs.readFile('./src/schemas/pets-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'pets');});
const tokenSchema = await fs.readFile('./src/schemas/tokens-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'tokens');});
const toySchema = await fs.readFile('./src/schemas/toys-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'toys');});
const userSchema = await fs.readFile('./src/schemas/users-schema.json', { encoding: 'utf-8' }).catch(err => {handleSchemaError(err, 'users');});

const ajv = new Ajv({ allErrors: true });
addFormat(ajv, ['uri', 'password']);

// Validation functions
const validateFood = ajv.compile(JSON.parse(foodSchema));
const validatePack = ajv.compile(JSON.parse(packSchema));
const validatePet = ajv.compile(JSON.parse(petSchema));
const validateToken = ajv.compile(JSON.parse(tokenSchema));
const validateToy = ajv.compile(JSON.parse(toySchema));
const validateUser = ajv.compile(JSON.parse(userSchema));

// Errors function
const betterFoodErrors = (food, errors) => betterAjvErrors(foodSchema, food, errors, { format: 'js' });
const betterPackErrors = (pet, errors) => betterAjvErrors(packSchema, pet, errors, { format: 'js' });
const betterPetErrors = (pet, errors) => betterAjvErrors(petSchema, pet, errors, { format: 'js' });
const betterTokenErrors = (token, errors) => betterAjvErrors(tokenSchema, token, errors, { format: 'js' });
const betterToyErrors = (toy, errors) => betterAjvErrors(toySchema, toy, errors, { format: 'js' });
const betterUserErrors = (user, errors) => betterAjvErrors(userSchema, user, errors, { format: 'js' });

// Validation with Error function
const isValidModel = (model, validationFunction, errorsFunction) => {
	const isValid = validationFunction(model);
	let errors = [];
	if (!isValid) {
		errors = errorsFunction(model, validationFunction.errors).map(errorInfo => {
			let errorString = `\n\tERROR: ${errorInfo.error}`;
			errorString += errorInfo.suggestion ? `. SUGGESTION: ${errorInfo.suggestion}` : '';
			return errorString;
		});
	}
	return { isValid, errors };
};

export default {
	isValidModel,
	validateFood, validatePack, validatePet, validateToken, validateToy, validateUser,
	betterFoodErrors, betterPackErrors, betterPetErrors, betterTokenErrors, betterToyErrors, betterUserErrors
};
export {
	isValidModel,
	validateFood, validatePack, validatePet, validateToken, validateToy, validateUser,
	betterFoodErrors, betterPackErrors, betterPetErrors, betterTokenErrors, betterToyErrors, betterUserErrors
};