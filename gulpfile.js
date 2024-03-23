var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

function css_style(done) {
    gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('style.scss'))
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console)) //отслеживание события и запись в консоль
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
    done();
}

// ** - все папки; * - все файлы

function watchFiles() {
    gulp.watch("./scss/**/*", css_style);
    gulp.watch("./**/*.html", browserReload);
   // gulp.watch("./**/*.js", browserReload)
}

function sync (done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    })
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}


gulp.task('default', gulp.parallel(css_style, watchFiles, sync));

// gulp.task(css_style);