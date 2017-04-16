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
    less = require('gulp-less'),
    pug = require('gulp-pug');

gulp.task('less', function() {
  return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src([
    'libs/jquery/dist/jquery.min.js',
    'libs/masonry/dist/masonry.pkgd.min.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('pug', function () {
  return gulp
    .src('pug/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('html'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: '../beast1.github.io'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('css/**/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
  gulp.watch('works/1 layout src/less/**/*.less', ['less']);
  gulp.watch('works/1 layout src/css/*.css', browserSync.reload);
  gulp.watch('works/1 layout src/*.html', browserSync.reload);
  gulp.watch('works/1 layout src/js/**/*.js', browserSync.reload);
});