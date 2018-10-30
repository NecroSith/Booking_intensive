var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch');

gulp.task('server', ['styles'], function() {
    browserSync.init({
        server: {baseDir: './app/'}
    });
    watch('./app/**/*.html', './app/**/*.js').on('change', browserSync.reload);
    watch('./app/**/*.less', function() {
        gulp.start('styles');
    });

});

gulp.task('styles', function() {
    return gulp.src('./app/less/main.less')
                .pipe(plumber({
                    errorHandler: notify.onError(function(err) {
                        return {
                            title: 'Styles',
                            sound: false,
                            message: err.message
                        }
                    })
                }))
                .pipe(sourcemaps.init())
                .pipe(less())
                .pipe(autoprefixer({
                    browsers: ['last 4 versions'],
                    cascade: false
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./app/css/'))
                .pipe(browserSync.stream())
});

gulp.task('default', ['server']);
