module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"plugin/assets/css/base.css": "plugin/assets/scss/base.scss"
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-sass");
}