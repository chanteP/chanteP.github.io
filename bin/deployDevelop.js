var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserify = require('browserify');
var through2 = require('through2');
var autoprefixer = require('autoprefixer-core');

var srcDir = './dev/',
    destDir = './temp/';

var shrinkDir = function(file){
    var filename;
    filename = file.dirname;
    file.dirname = '';
    file.basename = file.basename.replace(/index/, filename);
};
var buildBrowserify = function(){
    return through2.obj(function (file, enc, next){
        browserify(file.path)
            .bundle(function(err, res){
                // assumes file.contents is a Buffer
                file.contents = res;
                next(null, file);
            });
    })
}
module.exports = function(env){
    gulp.task('layout', function(){
        //装饰器
        return gulp.src([srcDir + 'dec/*.html'])
            .pipe($.replace('{{', '<%'))
            .pipe($.replace('}}', '%>'))
            .pipe(gulp.dest(destDir + '_layouts/'));
    });
    gulp.task('post', function(){
        //菠萝格
        return gulp.src(['posts/**'])
            .pipe(gulp.dest(destDir + '_posts/'));
    });
    gulp.task('rootConfig', function(){
        //根目录配置文件
        return gulp.src(['root/*'])
            .pipe(gulp.dest(destDir));
    });
    gulp.task('static', function(){
        var browserified = buildBrowserify();
        //css
        gulp.src([srcDir + 'static/css/*.scss'])
            .pipe($.sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                onError: console.error.bind(console, 'Sass error:')
            }))
            .pipe($.postcss([
                autoprefixer({browsers: ['last 1 version']})
            ]))
            .pipe(gulp.dest(destDir + 'static/css/'));
        gulp.src(srcDir + 'static/css/*.css')
            .pipe(gulp.dest(destDir + 'static/css/'));
        //images下面所有
        gulp.src([srcDir + 'static/images/*'])
            .pipe(gulp.dest(destDir + 'static/images/'));
        //lib下面
        gulp.src([srcDir + 'static/lib/*/index.js'])
            .pipe(browserified)
            .pipe($.rename(shrinkDir))
            .pipe(gulp.dest(destDir + 'static/lib'));
        gulp.src([srcDir + 'static/lib/*.js'])
            .pipe(gulp.dest(destDir + 'static/lib'));
    });

    gulp.task('pages', function(){
        //一个页面对应一个文件夹
        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest(destDir + 'pages/'));
        //sass编译
    });
    gulp.task('pageResources', function(){
        //commonjs用browserify打包
        var browserified = buildBrowserify();
        gulp.src([srcDir + 'pages/*/index.js'])
            .pipe(browserified)
            .pipe($.rename(shrinkDir))
            .pipe(gulp.dest(destDir + 'static/pages/'));
        //其他渣渣资源
        // gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.css', '!**/*.scss'])
        //     .pipe(gulp.dest('built/static/pages/'));
    });


    gulp.task('default', ['layout','post','rootConfig','static','pages','pageResources']);
    // gulp.task('default', ['layout','post','rootConfig','static','pages']);
    gulp.start('default');
}
