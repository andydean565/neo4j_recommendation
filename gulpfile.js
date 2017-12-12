//----------- REQUIRES -----------//

//gulp
var gulp = require('gulp'),
  minify = require('gulp-minify'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  gulpif = require('gulp-if');


var fs = require('fs');

//----------- VARIABLES -----------//

//config file
var config = JSON.parse(fs.readFileSync('./gulp-config.json'));

//----------- TASKS -----------//

//bundle js pkgs
gulp.task('bundleJS_pkg', function () {bundle("pkgs", "js");});

//bundle css pkgs
gulp.task('bundleSCSS_pkg', function () {bundle("pkgs","css");});

//bundle js src
gulp.task('bundleJS_src', function () {bundle("src","js");});

//bundle css src
gulp.task('bundleSCSS_src', function () {bundle("src","css");});

//bundle js all
gulp.task('bundleJS_all', function () {bundleAll("js");});

//bundle css all
gulp.task('bundleCSS_all', function () {bundleAll("css");});

//bundle all
gulp.task('bundle_all', function () {
  bundle("pkgs", "js");
  bundle("pkgs", "css");
  bundle("src", "js");
  bundle("src", "css");
  bundleAll("js");
  bundleAll("css");
});



//watch
gulp.task('watch', function () {
  //js pkgs
  gulp.watch(config.pkgs.js, ['bundleJS_pkg']);
  //css pkgs
  gulp.watch(config.pkgs.css, ['bundleSCSS_pkg']);
  //js src
  gulp.watch(config.src.js, ['bundleJS_src']);
  //css src
  gulp.watch(config.src.css, ['bundleSCSS_src']);
  //js all
  gulp.watch(createBundle("js"), ['bundleJS_all']);
  //css all
  gulp.watch(createBundle("css"), ['bundleCSS_all']);
});

//default
gulp.task('default', ['bundle_all', 'watch']);

//----------- FUNCTIONS -----------//

//bundle src and pkgs
function bundle(kind, type){
  console.log("bundle : " + kind + "|" + type);
  //get js pkgs
  return gulp.src(config[kind][type])
  //catch error
  .on('error', catchTaskError)
  //if css convert from scss to css
  .pipe(gulpif((type == "css"), sass()))
  //bundle to one file
  .pipe(concat(config.dist[kind] + '.' + type))
  //if css save file and clean
  .pipe(gulpif((type == "css"), gulp.dest(config.dist.loc + "/" + type)))
  .pipe(gulpif((type == "css"), cleanCSS()))
  .pipe(gulpif((type == "css"), rename(config.dist[kind] + '.min.' + type)))
  //else js
  .pipe(gulpif((type == "js"), minify({ ext:{src:('.' + type), min:('.min.' + type)}})))
  //set bundle location
  .pipe(gulp.dest(config.dist.loc + "/" + type))
}

//bundle all
function bundleAll(type){
  return gulp.src(createBundle(type))
  .pipe(concat('bundle.' + type))
  //if css save file and clean
  .pipe(gulpif((type == "css"), gulp.dest(config.dist.loc + "/" + type)))
  .pipe(gulpif((type == "css"), cleanCSS()))
  .pipe(gulpif((type == "css"), rename("bundle" + '.min.' + type)))
  //else js
  .pipe(gulpif((type == "js"), minify({ ext:{src:('.' + type), min:('.min.' + type)}})))
  .pipe(gulp.dest(config.dist.loc + "/" + type))
}

function createBundle(type){
  var bundle = [
    config.dist.loc + "/" + type + "/" + config.dist.pkgs + ".min." + type,
    config.dist.loc + "/" + type + "/" + config.dist.src + ".min." + type
  ];
  return bundle;
}

function catchTaskError(e){
  console.log(error.toString())
  this.emit('end')
}
