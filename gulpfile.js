var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function(){
    return gulp.src('app/public/sass/estilo.sass')
    .pipe(sass(/*{outputStyle: 'compressed'}*/).on('error', sass.logError))
    .pipe(gulp.dest('app/public/css'));
});

gulp.task('watch', function(){
    gulp.watch('app/public/sass/**/*.sass', ['sass']);
});