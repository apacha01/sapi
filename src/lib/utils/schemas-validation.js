// https://ajv.js.org/guide/managing-schemas.html#compiling-during-initialization
import Ajv from 'ajv';
import addFormat from 'ajv-formats';
import betterAjvErrors from 'better-ajv-errors';

// Schemas
import foodSchema from '../../schemas/foods-schema.json' assert {type: 'json'};
import petSchema from '../../schemas/pets-schema.json' assert {type: 'json'};
import tokenSchema from '../../schemas/tokens-schema.json' assert {type: 'json'};
import toySchema from '../../schemas/toys-schema.json' assert {type: 'json'};
import userSchema from '../../schemas/users-schema.json' assert {type: 'json'};

const ajv = new Ajv({ allErrors: true });
addFormat(ajv, ['uri', 'password']);

// Validation functions
const validateFood = ajv.compile(foodSchema);
const validatePet = ajv.compile(petSchema);
const validateToken = ajv.compile(tokenSchema);
const validateToy = ajv.compile(toySchema);
const validateUser = ajv.compile(userSchema);

// Errors function
const betterFoodErrors = (food, errors) => betterAjvErrors(foodSchema, food, errors, { format: 'js' });
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
	validateFood, validatePet, validateToken, validateToy, validateUser,
	betterFoodErrors, betterPetErrors, betterTokenErrors, betterToyErrors, betterUserErrors
};
export {
	isValidModel,
	validateFood, validatePet, validateToken, validateToy, validateUser,
	betterFoodErrors, betterPetErrors, betterTokenErrors, betterToyErrors, betterUserErrors
};