module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"plugin/assets/css/style.css": "plugin/assets/scss/style.scss"
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.registerTask("default", ["sass"]);
}