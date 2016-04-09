var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var exec = require('child_process').exec;

function errorLogHandler(msg){
    gutil.log(gutil.colors.red(msg));
    gutil.beep();
}

gulp.task('less', function () {
    gulp.src('./src/colour-mixer.less')
    .pipe(less({
        compress: false
    })).on('error', errorLogHandler)
    .pipe(gulp.dest('./styles'));
});

gulp.task('watch', function() {
    gulp.watch("./src/*.less", ['less']);
    //gulp.watch("./scripts/*", ['']);;
});

gulp.task('server', function() {
    exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task(
	'default', 
	[	'server',
        'less',
		'watch'
	]);