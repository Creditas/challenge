/**
 * Module Dependencies
 */

var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

var sourceFolder = './src';
var publicFolder = './public';


/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });

  	gulp.watch("src/less/*.less", ['less']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("src/*.html", ['minify-html']);

});

gulp.task('scripts', function() {
  console.log(path.join(publicFolder, '/js/app.js'));

  browserify({ debug: true })
    .transform(babelify)
    .require("./src/js/app.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(fs.createWriteStream("public/js/app.js"));
})

gulp.task('less', function () {
  return gulp.src( sourceFolder + '/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }).on("error", function(err) {
      console.log(err);
    }))
    .pipe(gulp.dest(path.join(publicFolder, '/css')));
});

gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(publicFolder))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'node_modules/',
      'src'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['src/**/*.*'], reload);
});


gulp.task('serve', ['minify-html', 'less', 'scripts', 'nodemon'], function () {
  
});