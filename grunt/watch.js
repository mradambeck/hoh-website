module.exports = {
	express: {
		files: [
			'keystone.js',
			'public/js/lib/**/*.{js,json}',
		],
		tasks: ['concurrent:dev'],
	},
	sass: {
		files: ['public/styles/**/*.scss'],
		tasks: ['sass'],
	},
  browserify: {
    files: [
      'public/js/index.js',
      'public/js/modules/*.js'
    ],
    tasks: ['browserify'],
  },
	livereload: {
		files: [
			'public/styles/**/*.css',
      'public/js/index.js',
      'public/js/modules/*.js'
		],
		options: {
			livereload: true,
		},
	},
};
