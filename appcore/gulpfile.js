/*global -$ */
'use strict';
// generated on 2015-06-29 using generator-cos-project 0.0.2
var gulp = require('gulp');

// generated on 2015-06-29 using generator-cos-project 0.0.2
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');

var isProd = (process.env.NODE_ENV || 'development') === 'production';
var debug = false;

var srcDir = 'app/';
var destDir = 'static/app/';


if(!isProd){
    //css目录根目录中所有scss和css搬运
    gulp.task('styles', function () {

        gulp.src(srcDir + 'css/*.scss')
            .pipe($.sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                onError: console.error.bind(console, 'Sass error:')
            }))
            .pipe($.postcss([
                require('autoprefixer-core')({browsers: ['last 1 version']})
            ]))
            .pipe(gulp.dest(destDir + 'css'));

        gulp.src(srcDir + 'css/*.css')
            .pipe(gulp.dest(destDir + 'css'));
    });

    gulp.task('scripts', function(){
        var browserified = transform(function (filename) {
            var b = browserify(filename, {debug: debug});
            return b.bundle();
        });
        browserified.on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        });
        return gulp.src(srcDir + 'pages/*/*/index.js')
            .pipe(browserified)
            .pipe(gulp.dest(destDir + 'pages'));
    });
    gulp.task('lib', function(){
        //lib目录中所有文件
        gulp.src(srcDir + 'lib/*.js')
            .pipe(gulp.dest(destDir + 'lib'));
    });

    //images目录所有文件
    gulp.task('images', function () {
        return gulp.src(srcDir + 'images/**')
            // .pipe($.cache($.imagemin({
            //     progressive: true,
            //     interlaced: true,
            //     // don't remove IDs from SVGs, they are often used
            //     // as hooks for embedding and styling
            //     svgoPlugins: [{cleanupIDs: false}]
            // })))
            .pipe(gulp.dest(destDir + 'images'));
    });


    gulp.task('watch', ['build'], function(){
        gulp.watch(srcDir + 'css/**/*.scss', ['styles']);
        gulp.watch([
            srcDir + 'lib/*.js',
            srcDir + 'common/**/*.js',
            srcDir + 'common/**/*.jsx',
            srcDir + 'common/**/*.coffee',
            srcDir + 'common/**/*.html',
            srcDir + 'common/**/*.scss',
            srcDir + 'pages/**/*.js', 
            srcDir + 'pages/**/*.jsx',
            srcDir + 'pages/**/*.coffee',
            srcDir + 'pages/**/*.html',
            srcDir + 'pages/**/*.scss'
        ], ['scripts']);
        // gulp.watch([srcDir + 'lib/**/*.js', '!**/node_modules/**'], ['scripts']);
        gulp.watch(srcDir + 'images/**/*', ['images']);
        gulp.watch(srcDir + '*.*', ['extras']);
    });
}
else{
    //css目录根目录中所有scss和css搬运
    gulp.task('styles', function () {
        gulp.src(srcDir + 'css/*.scss')
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                onError: console.error.bind(console, 'Sass error:')
            }))
            .pipe($.postcss([
                require('autoprefixer-core')({browsers: ['last 1 version']})
            ]))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(destDir + 'css'));

        gulp.src(srcDir + 'css/*.css')
            .pipe(gulp.dest(destDir + 'css'));
    });

    gulp.task('scripts', function(){
        var browserified = transform(function (filename) {
            var b = browserify(filename, {debug: debug});
            return b.bundle();
        });
        browserified.on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        });
        return gulp.src(srcDir + 'pages/*/*/index.js')
            .pipe($.sourcemaps.init())
            .pipe(browserified)
            .pipe($.uglify())
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(destDir + 'pages'));
    });
    gulp.task('lib', function(){
        //lib目录中所有文件
        gulp.src(srcDir + 'lib/*.js')
            .pipe($.uglify())
            .pipe(gulp.dest(destDir + 'lib'));
    });

    //images目录所有文件
    gulp.task('images', function () {
        return gulp.src(srcDir + 'images/**')
            // .pipe($.cache($.imagemin({
            //     progressive: true,
            //     interlaced: true,
            //     // don't remove IDs from SVGs, they are often used
            //     // as hooks for embedding and styling
            //     svgoPlugins: [{cleanupIDs: false}]
            // })))
            .pipe(gulp.dest(destDir + 'images'));
    });
}

//其他酱油
gulp.task('extras', function () {
    return gulp.src([
        srcDir + '*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(destDir));
});

gulp.task('build', ['extras', 'styles', 'lib', 'scripts', 'images'], function () {
    return gulp.src(destDir + '**/*').pipe($.size({title: 'build', gzip: !debug}));
});

console.log('##################### 初始化gulp，环境env='+process.env.NODE_ENV+', isProd='+isProd);
gulp.task('default', function () {
    gulp.start('build');
});
