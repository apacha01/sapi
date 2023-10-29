import { isValidModel, validatePet, betterPetErrors } from '../lib/utils/schemas-validation.js';

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
		return isValidModel(this, validatePet, betterPetErrors);
	}
}

export default Pet;