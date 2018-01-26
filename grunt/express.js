module.exports = {
	options: {
		port: process.env.PORT || 3000,
	},
	dev: {
		options: {
			script: 'keystone.js',
			debug: true,
		},
	},
};
