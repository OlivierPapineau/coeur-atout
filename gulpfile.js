const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create();

function styles(cb) {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoPrefixer({
            /*browsers: ['last 2 versions'],*/
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    browserSync.init({
        server:{
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
    cb();
}

function defaut(cb){
    console.log("allo");
    // place code for your default task here
    cb();
}

exports.default=defaut;
exports.styles=styles;
exports.watch=watch;