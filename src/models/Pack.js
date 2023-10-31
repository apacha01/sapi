import { isValidModel, validatePack, betterPackErrors } from '../lib/utils/schemas-validation.js';

class Food {
	constructor({ name, pets, foods, description }) {
		this.name = name;
		this.pets = pets;
		this.foods = foods;
		this.description = description;
	}

	isValid() {
		return isValidModel(this, validatePack, betterPackErrors);
	}
}

export default Food;