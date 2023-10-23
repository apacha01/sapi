import tokens from '../../db/tokens.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';


const getAllTokens = async () => {
	return tokens;
};

const getTokenByName = async (name) => {
	const token = tokens.find(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (!token)
		throw new CustomError(HTTP_STATUS.NOT_FOUND.msg, HTTP_STATUS.NOT_FOUND.code, `User '${name}' not found.`, true);
	return token;
};

const createToken = async (token) => {
	if (!token)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			'Token can\'t be undefined or null.',
			true
		);

	// validate with schemas
	// if not valid -> throw error

	token.name = token.name.replaceAll(' ', '_');
	if (tokens.find(t => t.name.toLowerCase().localeCompare(token.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Token with name '${token.name}' already exists.`,
			true
		);


	return tokens[tokens.push(token) - 1];
};

const updateTokenByName = async (name, token) => {
	let toUpdateTokenIndex = tokens.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (toUpdateTokenIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Token with name '${name}' not found.`,
			true
		);

	token.name = token.name.replaceAll(' ', '_');
	// if token.name is different from name and already exists can´t update
	if (name.toLowerCase().localeCompare(token.name.toLowerCase()) !== 0 && tokens.find(t => t.name.toLowerCase().localeCompare(token.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Token with name '${token.name}' already exists.`,
			true
		);

	// check if token is valid with schema
	// throw error if not valid

	tokens[toUpdateTokenIndex] = token;

	return tokens[toUpdateTokenIndex];
};

const deleteTokenByName = async (name) => {
	const index = tokens.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pet with name '${name}' not found.`,
			true
		);

	return tokens.splice(index, 1);
};

export { getAllTokens, getTokenByName, createToken, updateTokenByName, deleteTokenByName };
export default { getAllTokens, getTokenByName, createToken, updateTokenByName, deleteTokenByName };