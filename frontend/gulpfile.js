var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch("*").on("change", reload);
});

gulp.task("build", function () {
  return gulp.src("src/app/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("src/build"));
});
