const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync");
const connect = require('gulp-connect-php');
const svgSprite = require('gulp-svg-sprite');

function styles(cb) {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoPrefixer({
            /*browsers: ['last 2 versions'],*/
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    connect.server({}, function (){
        browserSync( {
            /*  Pour le PHP on utilise un proxy
            *   Remplacer le USER et le NOMPROJET
            *  genre "localhost/~etu01/rpni3/rpni3-crs2/" */

            //DOIT SUPPRIMER NODE_MODULES POUR CHANGER DE PLATEFORME
            //Macos
            proxy: "http://localhost:8888/AUTOMNE%202019/RPNI3/EXERCICES/TP1_coeur_atout/01_travail/coeur-atout/"
            //Windows
            //proxy: "http://localhost/AUTOMNE%202019/RPNI3/EXERCICES/TP1_coeur_atout/01_travail/coeur-atout/"
        });
    });

    gulp.watch('./*.php').on("change",browserSync.reload);
    gulp.watch('./*.html').on("change",browserSync.reload);
    gulp.watch('./js/**/*.js').on("change",browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
    cb();
}


var config = {
    mode: {
        css: true, // Create a «css» sprite
        // view: true, // Create a «view» sprite
        // defs: true, // Create a «defs» sprite
        // symbol: true, // Create a «symbol» sprite
        //  stack: true // Create a «stack» sprite
    }
};

function sprite(){
    return gulp.src('./assets/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./assets'));
}

function defaut(cb){
    console.log("allo");
    // place code for your default task here
    cb();
}

exports.default=defaut;
exports.styles=styles;
exports.watch=watch;
exports.sprite=sprite;