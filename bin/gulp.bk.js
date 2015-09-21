/*jshint node:true */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer-core');
var path = require('path');
var named = require('vinyl-named');

var srcDir = 'app/';
var destDir = 'temp/static/';
var webInfDir = 'WEB-INF/';
var webappDir = './';
var env = process.env.NODE_ENV || 'development';

var webpack = function(){
    return $.webpack({
        watch: true,
        context : path.join(__dirname, srcDir),
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style!css' },
                { test: /\.html$/, loader: 'html' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                {
                  test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel'
                }
            ]
        },
        resolve:{
            extensions: ["", ".json", ".js", ".coffee", ".ls", ".jsx", ".scss", ".css", ".html"]
        },
        resolveLoader: {
              modulesDirectories: [
                  path.join(__dirname, './node_modules')
              ]
        }
    });
};
var vnamed = function(base){
    return named(function(file){
        return path.relative(__dirname + '/' + base, file.path).replace(/\.[\w]*$/, '');
    })
}

gulp.task('styles', function () {
    gulp.src(srcDir + 'fonts/**')
        .pipe(gulp.dest(destDir + 'fonts'));
    return gulp.src(srcDir + 'css/*.scss')
        .pipe($.sass({
            outputStyle: 'nested', // libsass doesn't support expanded yet
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            autoprefixer({browsers: ['last 1 version']})
        ]))
        .pipe(gulp.dest(destDir + 'css'))
        .pipe($.livereload());
});

gulp.task('scripts', function(){
    return gulp.src([srcDir + 'pages/**/*.page.js'])
        .pipe(vnamed(srcDir + 'pages/'))
        .pipe(webpack())
        .pipe(gulp.dest(destDir + 'pages'))
        .pipe($.livereload());
});

//lib文件夹输出
gulp.task('lib', function(){
    gulp.src([srcDir + 'lib/*/index.js'])
        .pipe(vnamed(srcDir + 'lib/'))
        .pipe(webpack())
        .pipe($.rename(function(file){
            var filename;
            filename = file.dirname;
            file.dirname = '';
            file.basename = file.basename.replace(/index/, filename);
        }))
        .pipe(gulp.dest(destDir + 'lib'))
        .pipe($.livereload());
    return gulp.src(srcDir + 'lib/*.js')
        .pipe(gulp.dest(destDir + 'lib'));
});

gulp.task('images', function () {
    return gulp.src(srcDir + 'images/**/*')
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        }))
        .pipe(gulp.dest(destDir + 'images'));
});

gulp.task('extras', function () {
    return gulp.src([
        srcDir + '*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(destDir));
});

gulp.task('watch', [], function(){
    require('./bin/server');
    $.livereload.listen();
    gulp.start('build');

    gulp.watch(srcDir + 'css/**/*.scss', ['styles']);
    gulp.watch(srcDir + 'images/**/*', ['images']);
    gulp.watch(srcDir + '*.*', ['extras']);
});

// var buildTasks = env === 'production' ? ['styles', 'scripts', 'lib'] : ['extras', 'styles', 'scripts', 'lib', 'images'];
var buildTasks = ['scripts', 'lib', 'images', 'styles', 'extras'];
gulp.task('build', buildTasks, function () {
    return gulp.src(destDir + '**/*').pipe($.size({title: 'build', gzip: true}));
});


gulp.task('default', function () {
    gulp.start('build');
});
