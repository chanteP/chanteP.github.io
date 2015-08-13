var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserify = require('browserify');
var transform = require('vinyl-transform');

var srcDir = './dev/',
    destDir = './temp/';

var shrinkDir = function(file){
    var filename;
    // filename = /([^\/]+)\/?$/.exec(file.pathname)[1];
    file.pathname.replace(/([^\/]+)(\/?)$/, function(match, p1, p2){
        filename = p1;
        return p2 ? p2 : '/';
    });
    file.basename = file.basename.replace(/index/, filename);
});
module.exports = function(env){
    var browserified = transform(function (filename) {
        return browserify(filename, {debug: true})
            // .add('es5-shim')
            .bundle();
    });
    browserified.on('error', function(e){
        // why?
        // delete e.stream;
        console.error(e.message);
        this.emit('end');
    });

    gulp.task('layout', function(){
        //装饰器
        return gulp.src([srcDir + 'dec/*.html'])
            .pipe(gulp.dest(destDir + '_layouts/'));
    });
    gulp.task('post', function(){
        //菠萝格
        return gulp.src([srcDir + 'posts/**'])
            .pipe(gulp.dest(destDir + '_posts/'));
    });
    gulp.task('rootConfig', function(){
        //根目录配置文件
        return gulp.src(['root/*'])
            .pipe(gulp.dest(dest));
    });
    gulp.task('static', function(){
        //css
        gulp.src([srcDir + 'static/css/*.scss'])
            .pipe($.sass())
            .pipe(gulp.dest(destDir));
        gulp.src(srcDir + 'static/css/*.css')
            .pipe(gulp.dest(destDir));
        //images下面所有
        gulp.src([srcDir + 'static/images/*'])
            .pipe(gulp.dest(destDir));
        //lib下面
        gulp.src([srcDir + 'static/lib/*/index.js'])
            .pipe(browserified)
            .pipe($.rename(shrinkDir))
            .pipe(gulp.dest(destDir));
        gulp.src([srcDir + 'static/lib/*.js'])
            .pipe(gulp.dest(destDir));
    });

    gulp.task('pages', function(){
        //一个页面对应一个文件夹
        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest(destDir));
        //sass编译
    });
    gulp.task('pageResources', function(){
        //commonjs用browserify打包
        gulp.src([srcDir + 'pages/**/index.js'])
            .pipe(browserified)
            .pipe($.rename(shrinkDir))
            .pipe(gulp.dest(destDir + 'static'));
        //其他渣渣资源
        // gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.css', '!**/*.scss'])
        //     .pipe(gulp.dest('built/static/pages/'));
    });


    gulp.task('default', ['layout','post','rootConfig','static','pages','pageResources']);
    gulp.start('default');
}
