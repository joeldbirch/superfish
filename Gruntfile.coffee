module.exports = (grunt) ->

	# Project configuration.
	grunt.initConfig

		pkg: grunt.file.readJSON('package.json')
		banner: """
						/*
						 * <%= pkg.title || pkg.name %> - v<%= pkg.version %>
						 * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>
						 *
						 * Dual licensed under the MIT and GPL licenses:
						 *	http://www.opensource.org/licenses/mit-license.php
						 *	http://www.gnu.org/licenses/gpl.html
						 */

;
						"""
		# Task configuration.
		clean:
			files: [
				'dist'
				'test/specs/**/*.js'
			]


		concat:
			options:
				banner: '<%= banner %>'
				stripBanners: true

			dist:
				src: ['src/js/<%= pkg.name %>.js']
				dest: 'dist/js/<%= pkg.name %>.js'


		uglify:
			options:
				banner: '<%= banner %>'

			dist:
				src: '<%= concat.dist.dest %>'
				dest: 'dist/js/<%= pkg.name %>.min.js'

		copy:
			dist:
				files: [
					{ expand: true, cwd: 'src', src: ['css/**'], dest: 'dist/' }
					{ expand: true, cwd: 'src', src: ['js/hoverIntent.js','js/supersubs.js','js/jquery.js'], dest: 'dist/' }
				]

		jshint:
			src:
				options:
					jshintrc: 'src/.jshintrc'

				src: ['src/**/<%= pkg.name %>.js']


		watch:
			js:
				files: '<%= jshint.src.src %>'
				tasks: ['jshint:src']
			style:
				files: 'src/**/*.css'
				tasks: ['copy']


		coffee:
			compile:
				expand: true
				cwd: ''
				src: 'test/**/*.coffee'
				ext: '.js'


		jasmine:
			customTemplate:
				src: [
					'src/**/*.js'
					'!src/**/jquery.js'
				]
				options:
					specs: 'test/specs/*Test.js'
					helpers: 'test/helpers/**/*.js'
					vendor: 'src/js/jquery.js'
					template: 'test/fixtures/menu.tmpl'
					styles: 'src/css/superfish.css'
					keepRunner: false



	# These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jasmine')
	grunt.loadNpmTasks('grunt-contrib-coffee')

	# Default task.
	grunt.registerTask('test', ['coffee', 'jasmine', 'clean'] )
	grunt.registerTask('default', ['jshint', 'test', 'clean', 'concat', 'copy', 'uglify'])