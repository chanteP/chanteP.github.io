var gulp = require('gulp');

gulp.task('layout', function(){
    return gulp.src(['dev/dec/*.html'])
        .pipe(gulp.dest('built/_layout/'));
});


gulp.task('default', ['layout']);
gulp.start('default');
