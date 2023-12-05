import { isValidModel, validateFood, betterFoodErrors } from '../lib/utils/schemas-validation.js';

class Food {
	constructor({ name, shop_tier, sources, effect, perk, sprites, price }) {
		this.name = name;
		this.shop_tier = shop_tier;
		this.sources = sources;
		this.effect = effect;
		this.perk = perk;
		this.sprites = sprites;
		this.price = price;
	}

	isValid() {
		return isValidModel(this, validateFood, betterFoodErrors);
	}
}

export default Food;