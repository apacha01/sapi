import crypto from 'node:crypto';

const encrypt = (password) => {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16);
		crypto.scrypt(password, salt, 32, (err, dk) => {
			if (err) reject(err);
			else resolve(Buffer.concat([salt, dk]).toString('hex'));
		});
	});
};

const verify = (password, hash) => {
	return new Promise((resolve, reject) => {
		const hashBuffer = Buffer.from(hash, 'hex');
		const key = hashBuffer.subarray(16, hashBuffer.length);
		const salt = hashBuffer.subarray(0, 16);

		crypto.scrypt(password, salt, 32, (err, dk) => {
			if (err) reject(err);
			resolve(crypto.timingSafeEqual(key, dk));
		});
	});
};

export default { encrypt, verify };
export { encrypt, verify };