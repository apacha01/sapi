import { validatePet, betterPetErrors } from '../lib/utils/schemas-validation.js';

class Pet {
	constructor({ name, tier_info, sprites, abilities, ability_trigger, ability_target, type, stats, packs }) {
		this.name = name.replaceAll(' ', '_');
		this.tier_info = tier_info;
		this.sprites = sprites;
		this.abilities = abilities;
		this.ability_trigger = ability_trigger;
		this.ability_target = ability_target;
		this.type = type;
		this.stats = stats;
		this.packs = packs;
	}

	isValid() {
		const isValid = validatePet(this);
		let errors = [];
		if (!isValid) {
			errors = betterPetErrors(this, validatePet.errors).map(errorInfo => {
				let errorString = `\n\tERROR: ${errorInfo.error}`;
				errorString += errorInfo.suggestion ? `. SUGGESTION: ${errorInfo.suggestion}` : '';
				return errorString;
			});
		}
		return { isValid, errors };
	}
}

export default Pet;