import { isValidModel, validateToken, betterTokenErrors } from '../lib/utils/schemas-validation.js';

class Token {
	constructor({ name, tier_info, sprites, abilities, summoned_from, stats, notes = null }) {
		this.name = name.replaceAll(' ', '_');
		this.tier_info = tier_info;
		this.sprites = sprites;
		this.abilities = abilities;
		this.summoned_from = summoned_from;
		this.stats = stats;
		this.notes = notes;
	}

	isValid() {
		return isValidModel(this, validateToken, betterTokenErrors);
	}
}

export default Token;