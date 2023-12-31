import { isValidModel, validateUser, betterUserErrors } from '../lib/utils/schemas-validation.js';

class User {
	constructor({ name, password, role }) {
		this.name = name;
		this.password = password;
		this.role = role;
	}

	isValid() {
		return isValidModel(this, validateUser, betterUserErrors);
	}
}

export default User;