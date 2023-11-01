import tokens from '../../jsondb/tokens.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Token from '../models/Token.js';


const getAllTokens = async () => {
	return tokens;
};

const getTokenByName = async (name) => {
	const token = tokens.find(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (!token)
		throw new CustomError(HTTP_STATUS.NOT_FOUND.msg, HTTP_STATUS.NOT_FOUND.code, `Token '${name}' not found.`, true);
	return token;
};

const createToken = async (token) => {
	const toCreateToken = new Token(token);
	const isValidToken = toCreateToken.isValid();

	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);


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
	const updatedToken = new Token(token);
	let toUpdateTokenIndex = tokens.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	// if undefined don't do anything
	if (toUpdateTokenIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Token with name '${name}' not found.`,
			true
		);

	// if token.name is different from name and already exists can´t update
	if (name.toLowerCase().localeCompare(updatedToken.name.toLowerCase()) !== 0 && tokens.find(t => t.name.toLowerCase().localeCompare(updatedToken.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Token with name '${updatedToken.name}' already exists.`,
			true
		);

	const isValidToken = updatedToken.isValid();
	if (!isValidToken.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidToken.errors}\n]`,
			true
		);

	tokens[toUpdateTokenIndex] = updatedToken;

	return tokens[toUpdateTokenIndex];
};

const deleteTokenByName = async (name) => {
	const index = tokens.findIndex(t => t.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);
	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Token with name '${name}' not found.`,
			true
		);

	return tokens.splice(index, 1);
};

export { getAllTokens, getTokenByName, createToken, updateTokenByName, deleteTokenByName };
export default { getAllTokens, getTokenByName, createToken, updateTokenByName, deleteTokenByName };