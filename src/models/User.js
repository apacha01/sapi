import { isValidModel, validateUser, betterUserErrors } from '../lib/utils/schemas-validation.js';

class User {
	constructor({ username, password, role }) {
		this.username = username;
		this.password = password;
		this.role = role;
	}

	isValid() {
		return isValidModel(this, validateUser, betterUserErrors);
	}
}

export default User;