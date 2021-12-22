module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: [ 'eslint:recommended', 'plugin:vue/essential' ],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: [ 'html', 'vue' ],
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [ 'error', 'tab' ],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'no-mixed-spaces-and-tabs': [ 0 ],
		// eqeqeq : 'error',
		'brace-style': 'error',
		'key-spacing': [ 'error', { beforeColon: true } ],
		'no-duplicate-imports': 'error',
		'space-before-function-paren': [ 'error', 'always' ],
		'keyword-spacing': [ 'error', { before: true } ],
		'comma-dangle': [ 'error', 'never' ] //禁止拖尾逗号
	}
};
