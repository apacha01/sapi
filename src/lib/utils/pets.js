const petFields = [
	{ atr: 'name' },
	{ atr: 'tier_info', sub_atrs: ['tier', 'url'] },
	{ atr: 'images', sub_atrs: ['standard', 'classic'] },
	{ atr: 'abilities', sub_atrs: ['l1Ability', 'l2Ability', 'l3Ability'] },
	{ atr: 'ability_trigger', sub_atrs: ['trigger', 'url'] },
	{ atr: 'n_triggers' },
	{ atr: 'base_stats', sub_atrs: ['hp', 'atk'] },
	{ atr: 'packs' }
];

const copyPet = (to, from) => {
	if (!to || !from) return undefined;

	to.name = from.name;
	to.tier_info = from.tier_info;
	to.images = from.images;
	to.abilities = from.abilities;
	to.ability_trigger = from.ability_trigger;
	to.n_triggers = from.n_triggers;
	to.base_stats = from.base_stats;
	to.packs = from.packs;

	return to;
};

const checkPetAttributes = (pet) => {
	if (!pet) return petFields.map(f => f.atr);

	const missingFields = [];
	petFields.forEach(field => {
		// Check property
		if (!Object.prototype.hasOwnProperty.call(pet, field.atr) || !pet[field.atr]) {
			missingFields.push(field.atr);
			if (field.sub_atrs) missingFields.push(...field.sub_atrs);
		}
		// If property has sub properties
		else if (field.sub_atrs) {
			field.sub_atrs.forEach(subField => {
				// Check each sub property
				if (!Object.prototype.hasOwnProperty.call(pet[field.atr], subField) || !pet[field.atr][subField]) {
					missingFields.push(`${field.atr}: ${subField}`);
				}
			});
		}
	});

	return missingFields;
};

export { copyPet, checkPetAttributes };