/**
 * standard gulp build file for browser client projects
 */

'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    del = require('del'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    map = require('map-stream'),
    fs = require('vinyl-fs'),
    env = process.env.NODE_ENV || 'development';

gutil.log('env =', env);

var errorHandler = function(err) {
    gutil.beep();
    console.log( err );
};

var paths = {
    src: 'app/*/*.js',
    scss: 'app/assets/scss/*.scss',
    tests: 'test/*/*.js',
    bin: 'bin/*.js',
    build: env === 'production' ? 'dist/' : 'build/'
};

gulp.task('jshint', function() {
    gulp.src([ paths.src, paths.tests, paths.bin ] )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('mocha', function() {
    gulp.src( paths.tests )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( mocha({ reporter:'spec' }) );
});

gulp.task('test', [ 'mocha', 'jshint' ] );

gulp.task('clean', function(cb) {
    del([ paths.build ], cb);
});

gulp.task('html', function() {
    var filterIndex = function(file, cb) {
        var contents = file.contents.toString().replace('{{ENV}}', env);
        // gutil.log('copy file: ', contents);
        file.contents = new Buffer( contents );

        cb( null, file );
    };

    // filter the index page to set the env
    gulp.src('app/index.html')
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe(map( filterIndex ))
        .pipe(gulp.dest( paths.build ));
});

gulp.task('compass', function() {
    gulp.src([ paths.scss ])
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( compass({
            project: path.join( __dirname, 'app/assets' ),
            css:'css',
            sass:'scss',
            image:'images'
        }))
        .pipe(gulp.dest( 'build/assets/css' ));
});

gulp.task('assets', function() {
    gulp.src(
        [
            'app/assets/images/**', 
            'app/assets/svg/*', 
            'app/assets/fonts/**'
        ], { base:'app' } )
        .pipe( gulp.dest( paths.build ) );
});

gulp.task('script', function() {
    // just the entry point
    gulp.src( 'app/controllers/ApplicationFactory.js' )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( browserify( { debug: env === 'development' } ) )
        .pipe( concat('app.js') )
        .pipe( gulpif( env === 'production', uglify() ))
        .pipe( gulp.dest( paths.build ) );
});

// create a deploy that minifies the build
gulp.task('build', [ 'script', 'html', 'compass', 'assets' ]);

gulp.task('watch', function () {
    gulp.watch([ paths.src, paths.tests ], [ 'test' ]);
    gulp.watch([ paths.scss, 'app/assets/scss/**/*.scss' ], [ 'compass' ]);
    gulp.watch([ 'app/index.html' ], [ 'html' ]);
    gulp.watch([ paths.src ], [ 'script' ]);
});

gulp.task('default', [ 'test', 'build' ]);

