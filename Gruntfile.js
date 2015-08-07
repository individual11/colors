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
       		'public/js/app-ck.js':['public/js/plugins/jquery.fullscreen-min.js',
       								'public/js/plugins/retina-1.1.0.min.js',
       								'public/js/plugins/jquery.touchwipe.min.js',
       								'public/js/plugins/jquery.mobile-events.min.js',
       								'public/js/plugins/jquery.jplayer.min.js', 
       								'public/js/variables.js',  
       								'public/js/colors.js',
       								'public/js/app.js','public/js/sammy-app.js']
        	}
        }
    },
    
    less: {
    	options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
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

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less']);

};