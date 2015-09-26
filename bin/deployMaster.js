'use strict';
var gulp = require('gulp');
var gulpLoadPlugin = require('gulp-load-plugins');
var gulpKit = require('./deployKit');


var srcDir = './dev/',
    destDir = './temp/';

var $ = gulpLoadPlugin();
var kit = gulpKit({
    srcDir : srcDir,
    destDir : destDir
});
// var {shrinkDir, webpack, vnamed, buildSass, insertStyle, parseInclude};
var shrinkDir = kit.shrinkDir, 
    webpack = kit.webpack, 
    vnamed = kit.vnamed, 
    buildSass = kit.buildSass, 
    insertStyle = kit.insertStyle, 
    parseInclude = kit.parseInclude;

var needWatch = false;

module.exports = () => {
    gulp.task('layout', () => {
        //装饰器
        gulp.src([srcDir + 'dec/*'])
            .pipe(gulp.dest(destDir + '_layouts/'));
        gulp.src([srcDir + 'includes/*'])
            .pipe(gulp.dest(destDir + '_includes/'));
    });
    gulp.task('post', () => {
        //菠萝格
        return gulp.src(['posts/**'])
            .pipe(gulp.dest(destDir + '_posts/'));
    });
    gulp.task('rootConfig', () => {
        //根目录配置文件
        return gulp.src(['root/*'])
            .pipe(gulp.dest(destDir));
    });
    gulp.task('static', () => {
        //css
        gulp.src([srcDir + 'static/css/*.scss'])
            .pipe(buildSass())
            .pipe(gulp.dest(destDir + 'static/css/'));
        //其他所有
        gulp.src([srcDir + 'static/**/*', '!' + srcDir + 'static/lib/', '!' + srcDir + 'static/css/'])
            .pipe(gulp.dest(destDir + 'static/'));
    });
    gulp.task('lib', () => {
        //lib下面
        gulp.src([srcDir + 'static/lib/*/index.js'])
            .pipe($.sourcemaps.init())
            .pipe(vnamed(srcDir + 'static/lib'))
            .pipe(webpack(needWatch))
            .pipe($.rename(shrinkDir))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(destDir + 'static/lib'));
        gulp.src([srcDir + 'static/lib/*.js'])
            .pipe(gulp.dest(destDir + 'static/lib'));
    });

    gulp.task('pages', ['pageResources'], () => {
        //一个页面对应一个文件夹
        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.header([
                '---',
                'layout: page',
                '---',
                ''
                ].join('\n'), {}))
            .pipe(parseInclude())
            .pipe($.rename((file) => {
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(insertStyle())
            .pipe(gulp.dest(destDir + 'pages/'));
        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.header([
                '---',
                'layout: main',
                '---',
                ''
                ].join('\n'), {}))
            .pipe(insertStyle())
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest(destDir));
    });
    gulp.task('pageScripts', () => {
        //commonjs用browserify打包
        gulp.src([srcDir + 'pages/*/*.js'])
            .pipe($.sourcemaps.init())
            .pipe(vnamed(srcDir + 'pages/'))
            .pipe(webpack(needWatch))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(destDir + 'static/pages/'));
    });
    gulp.task('pageResources', () => {
        gulp.src([srcDir + 'pages/*/*.scss'])
            .pipe(buildSass())
            .pipe(gulp.dest(destDir + 'static/pages/'));
        //其他渣渣资源
        gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.scss'])
            .pipe(gulp.dest(destDir + 'static/pages/'));
    });

    gulp.task('build', ['layout','post','rootConfig','static','lib','pageScripts','pageResources'], () => {
        gulp.start('pages');
    });

    gulp.start('build');
}
