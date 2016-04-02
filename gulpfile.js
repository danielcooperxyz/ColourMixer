var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

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

gulp.task(
	'default', 
	[	'less',
		'watch'
	]);