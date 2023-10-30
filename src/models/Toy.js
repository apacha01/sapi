import { isValidModel, validateToy, betterToyErrors } from '../lib/utils/schemas-validation.js';

class Toy {
	constructor({ name, tier_info, source, ability_trigger, abilities, sprites }) {
		this.name = name.replaceAll(' ', '_');
		this.tier_info = tier_info;
		this.source = source;
		this.abilities = abilities;
		this.ability_trigger = ability_trigger;
		this.sprites = sprites;
	}

	isValid() {
		return isValidModel(this, validateToy, betterToyErrors);
	}
}

export default Toy;