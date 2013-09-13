module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    target1:{
       files:{
        //'build/foo.min.js':['src/foo.js']
        }
         }
    },
    
    less: {
    	options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	  development: {
	    options: {
	      paths: ["public/css"]
	    },
	    files: {
	      "public/css/core.css": "public/less/core.less"
	    }
	  },
	  production: {
	    options: {
	      paths: ["public/css"],
	      yuicompress: true
	    },
	    files: {
	       "public/css/core.css": "public/less/core.less"
	    }
	  }
	},
	
	
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less']);

};