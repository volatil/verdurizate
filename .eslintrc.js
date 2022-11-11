module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jquery: true,
	},
	extends: ["standard-with-typescript", "airbnb"],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		// "eol-last": 0,
		"no-tabs": 0,
		"no-multi-spaces": ["error"],
		"no-console": 1,
		indent: [2, "tab"],
		quotes: [2, "double"],
		semi: [2, "always"],
		"linebreak-style": 0,
		"no-unused-vars": "off",
		"func-names": "off",
		"no-plusplus": 0,
		"space-in-parens": 0,
		"prefer-destructuring": 0,
		"no-restricted-globals": [
			"error",
			"event",
			"fdescribe",
		], // Quita el error para cuando usas 'location'
		"template-curly-spacing": 0, // Desactiva el espacio dentro de los parentesis before y after
		"import/extensions": 0, // Desactiva la alerta por importaciones de js
	},
};
