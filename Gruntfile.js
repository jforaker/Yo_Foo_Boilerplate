/*
 * Generated on 2014-12-31
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function (grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({

		config: {
			src: 'src',
			dist: 'dist',
			vendor: 'bower_components'
		},

		concat: {
			all: {
				src: [
					'<%= config.vendor %>/jquery/dist/jquery.js',
					'<%= config.vendor %>/bootstrap/dist/js/bootstrap.min.js',
					'<%= config.src %>/js/*.js'
				],
				dest: '<%= config.dist %>/assets/js/scripts.js'
			}
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'<%= config.dist %>/assets/css/styles.css': '<%= config.src %>/less/main.less'
				}
			}
		},

		watch: {
			assemble: {
				files: ['<%= config.src %>/{content,data,templates,assets}/{,*/}*.{md,hbs,yml}'],
				tasks: ['assemble']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.dist %>/{,*/}*.html',
					'<%= config.dist %>/assets/{,*/}*.css',
					'<%= config.dist %>/assets/{,*/}*.js',
					'<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			},
			js: {
				files: ['<%= config.src %>/js/*.js', '<%= config.vendor %>/**/*.js'],
				tasks: ['concat']
			},
			styles: {
				files: ['<%= config.src %>/less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true,
					livereload: true
				}
			}
		},

		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'<%= config.dist %>'
					]
				}
			}
		},

		assemble: {
			pages: {
				options: {
					flatten: true,
					assets: '<%= config.dist %>/assets',
					layout: '<%= config.src %>/templates/layouts/default.hbs',
					data: '<%= config.src %>/data/*.{json,yml}',
					partials: '<%= config.src %>/templates/partials/*.hbs',
					plugins: ['assemble-contrib-anchors', 'assemble-contrib-permalinks', 'assemble-contrib-sitemap', 'assemble-contrib-toc'],
				},
				files: {
					'<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
				}
			}
		},

		copy: {
			bootstrap: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/',
				src: '**',
				dest: '<%= config.dist %>/assets/'
			},
			theme: {
				expand: true,
				cwd: 'src/assets/',
				src: '**',
				dest: '<%= config.dist %>/assets/css/'
			}
		},

		// Before generating any new files,
		// remove any previously-created files.
		clean: ['<%= config.dist %>/**/*.{html,xml}']

	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('server', [
		'build',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean',
		'copy',
		'assemble',
		'concat',
		'less'
	]);

	grunt.registerTask('default', [
		'build'
	]);

};
