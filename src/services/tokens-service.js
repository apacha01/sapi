import tokens from '../../db/tokens.json' assert { type: "json" };
import CustomError from '../lib/errors/CustomError.js';
import Response from '../lib/response/Response.js';

const getAllTokens = async () => {
	return tokens;
};

export { getAllTokens }
export default { getAllTokens }