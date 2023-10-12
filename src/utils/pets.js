const copyPet = (to, from) => {
	if (!from || !from.name
		|| !from.tier_info || !from.tier_info.tier || !from.tier_info.url
		|| !from.images || !from.images.standard || !from.images.classic
		|| !from.abilities || !from.abilities.l1Ability || !from.abilities.l3Ability || !from.abilities.l3Ability
		|| !from.ability_trigger || !from.ability_trigger.trigger || !from.ability_trigger.url
		|| !from.n_triggers
		|| !from.base_stats || !from.base_stats.hp || !from.base_stats.atk
		|| !from.packs
	)
		return false;

	to.name = from.name;
	to.tier_info = from.tier_info;
	to.images = from.images;
	to.abilities = from.abilities;
	to.ability_trigger = from.ability_trigger;
	to.n_triggers = from.n_triggers;
	to.base_stats = from.base_stats;
	to.packs = from.packs;
	return true;
};

export { copyPet };