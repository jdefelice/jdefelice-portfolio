var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');

/* Source Paths */
var srcSass = 'src/sass'

/* Destination Paths */
var distCSS = 'dist/css';

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src(srcSass+'/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(distCSS))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(distCSS))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest(distCSS))
        .pipe(livereload());
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(srcSass+'/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);