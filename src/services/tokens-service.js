import tokens from '../../db/tokens.json' assert { type: "json" };
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';


const getAllTokens = async () => {
	return tokens;
};

export { getAllTokens }
export default { getAllTokens }