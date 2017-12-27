'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const fontmin = require('gulp-fontmin');
const path = require('path');

const DEST_DIR = 'docs';
const SRC_DIR = 'src';
const SRC_GLOB_SCSS = path.join(SRC_DIR, '**/*.scss');
const SRC_GLOB_FONT = path.join(SRC_DIR, '**/*.ttf');

const SASS_OPTIONS = {
  // https://github.com/sass/node-sass
  indentType: 'space',
  indentWidth: 2,
  linefeed: 'lf',
  omitSourceMapUrl: false,
  outputStyle: 'compact', // 'nested', 'expanded', 'compressed'
};
var WATCH_OPTIONS = {
  // https://github.com/shama/gaze
  mode: 'auto',
  interval: 200,
  debounceDelay: 500,
};


function taskCSS() {
  return gulp.src( SRC_GLOB_SCSS )
    .pipe( sass(SASS_OPTIONS).on('error', sass.logError) )
    .pipe( gulp.dest(DEST_DIR) )
  ;
}
function taskFont() {
  // limited character ranges
  const TEXT = 'Carolyn Kepes';

  var handler = fontmin({
    text: TEXT,
  });

  return gulp.src( SRC_GLOB_FONT )
    .pipe( handler )
    .pipe( gulp.dest(DEST_DIR) )
  ;
}
function taskWatch() {
  gulp.watch(SRC_GLOB_SCSS, WATCH_OPTIONS,  taskCSS );
  gulp.watch(SRC_GLOB_FONT, WATCH_OPTIONS,  taskFont );
}

const taskBuild = gulp.parallel(
  taskCSS,
  taskFont
);


gulp.task('css', taskCSS);
gulp.task('font', taskFont);
gulp.task('watch', taskWatch);
gulp.task('build', taskBuild);

gulp.task('default', taskBuild);
