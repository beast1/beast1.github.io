var gulp = require('gulp'),
    //sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
//    cssnano = require('gulp-cssnano'),
//    rename = require('gulp-rename'),
//    del = require('del'),
//    imagemin = require('gulp-imagemin'),
//    pngquant = require('imagemin-pngquant'),
//    cashe = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less');

gulp.task('less', function() {
  return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/masonry/dist/masonry.pkgd.min.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});