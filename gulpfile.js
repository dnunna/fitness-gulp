'use strict';

var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var sass = require('gulp-sass');
var css = require('gulp-w3c-css');
const babel = require('gulp-babel');
const beautify = require('gulp-beautify');
var watch = require('gulp-watch');

//extra gulp options
var about = require('gulp-about');
const headerComment = require('gulp-header-comment');
var dateFormat = require('dateformat');
var now = new Date();


//*******************gulp html task***************************
// This will check all the html files and if there are any errors in format it will display in terminal
gulp.task('htmlhint', function() {
  gulp.src("*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});


//*****************gulp scss and css tasks*********************
// This is a task created for check the sass files in sass direc and convert them to css files and place them in assets/css folder
gulp.task('sass', function() {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

// This is a task created for watching sass files in sass direc and run the sass function if there are any changes
gulp.task('watchsass', function() {
  gulp.watch('./assets/sass/*.scss', ['sass']);
});

gulp.task('css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watchcss', function() {
  gulp.watch('./assets/css/*.css', ['css']);
});



//********************gulp js tasks**********************
//this task will convert the files(presets) into es2015 files
gulp.task('babeljs', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/babeljs'));
});


//this task will format the js files for indent_size
gulp.task('beautifyjs', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(beautify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./build/beautifyjs'));
});


//*******************EXTRA GULP OPTIONS**************************
//this task will get the information about the application from package.json file
gulp.task('about', function() {
  return gulp.src('package.json')
    .pipe(about({
      keys: ['name', 'version', 'author'], // properties to pick from the source
      inject: { // custom properties to inject
        buildDate: dateFormat(now)
      }
    }))
    .pipe(gulp.dest('./build/about')); // writes dist/about.json
});

//this task will the header comments to all the .js files
gulp.task('headerComment', function() {
  gulp.src('./assets/js/*.js')
    .pipe(headerComment(`
          License: MIT
          Name: fitness-gulp
          Version: 1.0.0
  `))
    .pipe(gulp.dest('./build/headerjs'))
});

gulp.task('default', ['sass', 'watchsass', 'css', 'watchcss', 'babeljs', 'beautifyjs']);
