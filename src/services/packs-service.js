import packs from '../../jsondb/packs.json' assert {type: 'json'};
import CustomError from '../lib/errors/CustomError.js';
import HTTP_STATUS from '../lib/constants/http.js';
import Pack from '../models/Pack.js';

const getAllPacks = async () => {
	return packs;
};

const getPackByName = async (name) => {
	const pack = packs.find(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (!pack)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pack with name '${name}' not found.`,
			true
		);

	return pack;
};

const createPack = async (pack) => {
	const toCreatePack = new Pack(pack);
	const isValidPack = toCreatePack.isValid();

	// Check if pack is valid
	if (!isValidPack.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPack.errors}\n]`,
			true
		);

	if (packs.find(p => p.name.toLowerCase().localeCompare(toCreatePack.name.toLowerCase()) === 0))
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pack with name '${pack.name}' already exists.`,
			true
		);

	return packs[packs.push(pack) - 1];
};

const updatePack = async (name, pack) => {
	const updatedPack = new Pack(pack);
	let toUpdatePackIndex = packs.findIndex(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	// if pack not found don't do anything
	if (toUpdatePackIndex === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pack with name '${name}' not found.`,
			true
		);

	// if updatedPack.name is different from name and already exists can´t update
	if (
		name.toLowerCase().localeCompare(updatedPack.name.toLowerCase()) !== 0
		&& packs.find(p => p.name.toLowerCase().localeCompare(updatedPack.name.toLowerCase()) === 0)
	)
		throw new CustomError(
			HTTP_STATUS.ALREADY_EXISTS.msg,
			HTTP_STATUS.ALREADY_EXISTS.code,
			`Pack with name '${updatedPack.name}' already exists.`,
			true
		);

	// Check if pack is valid
	const isValidPack = updatedPack.isValid();
	if (!isValidPack.isValid)
		throw new CustomError(
			HTTP_STATUS.UNPROCESSABLE_ENTITY.msg,
			HTTP_STATUS.UNPROCESSABLE_ENTITY.code,
			`All properties must contain valid data.\n[${isValidPack.errors}\n]`,
			true
		);


	packs[toUpdatePackIndex] = updatedPack;

	return toUpdatePackIndex;
};

const deletePackByName = async (name) => {
	const index = packs.findIndex(p => p.name.toLowerCase().localeCompare(name.toLowerCase()) === 0);

	if (index === -1)
		throw new CustomError(
			HTTP_STATUS.NOT_FOUND.msg,
			HTTP_STATUS.NOT_FOUND.code,
			`Pack with name '${name}' not found.`,
			true
		);

	return packs.splice(index, 1);
};

export { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };
export default { getAllPacks, getPackByName, createPack, updatePack, deletePackByName };