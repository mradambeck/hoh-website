'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

  // run browserify to use module syntax in JS:
  grunt.loadNpmTasks('grunt-browserify');

	var options = {
		config: {
			src: './grunt/*.js',
		},
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			serve: {
				script: 'keystone.js',
				options: {
					ignore: ['node_modules/**'],
				},
			},
		},

    browserify: {
      all: {
        files: {
          'public/js/bundle.js': ['public/js/index.js']
        },
        options: {
          watch: true,
          browserifyOptions: {
            debug: true
          }
        }
      }
    }
	};

	var configs = require('load-grunt-configs')(grunt, options);

	// Project configuration.
	grunt.initConfig(configs);


	grunt.registerTask('dev', ['sass', 'browserify', 'watch']);


	// default option to connect server
	grunt.registerTask('default', [
		'concurrent:dev',
	]);

};
