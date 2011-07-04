var fs = require('fs');
var sys = require('sys');
var uglify = require('uglify-js');
var jsmin = require('jsmin').jsmin;

var path = './public/javascripts/';

// List files you'd like to minify but leave as separate files
var minify = ['laughtrack',
						'bookmarklet'];

// Run through a complete build process. Concat and Minify JS & CSS files
namespace('build', function() {
	desc('Complete concat and minify process for a build release.');
	task('min', [], function(params) {	
			
		// Minify JS files and write to original files
		minify.forEach(function(file, i) {
			var code = fs.readFileSync(path+file+'.js').toString();
			var min = fs.openSync(path+file+'.min.js', 'w+');
			fs.writeSync(min, jsmin(code));
		});
	});
});
