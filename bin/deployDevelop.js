'use strict';
var gulp = require('gulp');
var gulpLoadPlugin = require('gulp-load-plugins');
var gulpKit = require('./deployKit');
var server = require('./server');

var srcDir = './dev/',
    destDir = './temp/';

var $ = gulpLoadPlugin();
var {shrinkDir, webpack, vnamed, buildSass, insertStyle, parseInclude} = gulpKit({
    srcDir : srcDir,
    destDir : destDir
});

var needWatch = true;

module.exports = () => {
    gulp.task('layout', () => {
        //装饰器
        gulp.src([srcDir + 'dec/*'])
            .pipe($.replace(/{{ ([\w]+) }}/g, '<%-$1%>'))
            .pipe(parseInclude())
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
            // .pipe($.postcss([
            //     autoprefixer({browsers: ['last 1 version']})
            // ]))
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
            .pipe(parseInclude())
            .pipe($.rename((f => ile){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(insertStyle())
            .pipe(gulp.dest(destDir + 'pages/'));
        //sass编译
    });
    gulp.task('pageScripts', () => {
        //commonjs用browserify打包
        gulp.src([srcDir + 'pages/*/*.js'])
            .pipe($.sourcemaps.init())
            .pipe(vnamed(srcDir + 'pages/'))
            .pipe(webpack(needWatch))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(destDir + 'static/pages/'))
            .pipe($.livereload());
    });
    gulp.task('pageResources', () => {
        gulp.src([srcDir + 'pages/*/*.scss'])
            .pipe(buildSass())
            .pipe(gulp.dest(destDir + 'static/pages/'))
            .pipe($.livereload());
        //其他渣渣资源
        gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.scss'])
            .pipe(gulp.dest(destDir + 'static/pages/'));
    });

    gulp.task('watch', ['server', 'build'], () => {
        gulp.watch([srcDir + 'static/**/*', '!' + srcDir + 'static/lib/'], ['static']);
        gulp.watch([srcDir + 'pages/*/**', '!**/*.js', '!**/*.html'], ['pageResources']);
        gulp.watch([srcDir + 'pages/*/index.html'], ['pages']);
    });

    gulp.task('build', ['layout','post','rootConfig','static','lib','pageScripts','pageResources'], () => {
        gulp.start('pages');
    });

    gulp.task('server', [], () => {
        server();
        $.livereload.listen();
    });
    gulp.start('watch');
}
