module.exports = {
	root: true,
	'env': { 'browser': false, 'node': true, 'es6': true },
	extends: ['eslint:recommended'],
	ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	rules: {
		'semi': ['error', 'always'],
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'no-trailing-spaces': 'error',
	}
};