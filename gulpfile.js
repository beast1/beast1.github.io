var gulp         = require('gulp'),
    scss         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
//    rename       = require('gulp-rename'),
//    del          = require('del'),
//    imagemin     = require('gulp-imagemin'),
//    pngquant     = require('imagemin-pngquant'),
//    cashe        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    less         = require('gulp-less'),
    pug          = require('gulp-pug');

gulp.task('less', function() {
  return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scss', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('stylesLib', function() {
  return gulp.src([
    'libs/GridLoadingEffects/css/component.css',
  ])
    .pipe(cssnano())
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('scriptsLib', function() {
  return gulp.src([
//    'libs/jquery/dist/jquery.min.js',
    'libs/jquery-smooth-scroll/jquery.smooth-scroll.min.js',
    'libs/slick-carousel/slick/slick.min.js',
    'libs/masonry/dist/masonry.pkgd.min.js',
    //GridLoadingEffects
    'libs/GridLoadingEffects/js/modernizr.custom.js',
    'libs/GridLoadingEffects/js/masonry.pkgd.min.js',
    'libs/GridLoadingEffects/js/imagesloaded.js',
    'libs/GridLoadingEffects/js/classie.js',
    'libs/GridLoadingEffects/js/AnimOnScroll.js',
    //endGridLoadingEffects
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

gulp.task('watch', ['browser-sync', 'scriptsLib', 'stylesLib'], function() {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('css/**/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
  gulp.watch('works/1 layout src/less/**/*.less', ['less']);
  gulp.watch('works/1 layout src/css/*.css', browserSync.reload);
  gulp.watch('works/1 layout src/*.html', browserSync.reload);
  gulp.watch('works/1 layout src/js/**/*.js', browserSync.reload);
});