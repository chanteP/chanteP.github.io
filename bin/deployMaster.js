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
                // console.log('###########', file.path, res);
                // assumes file.contents is a Buffer
                file.contents = res || new Buffer('');
                next(null, file);
            })
            .on('error', function(e){
                // delete e.stream;
                console.error('\033[31m [browserify error]', e.message, '\033[0m');
                this.emit('end');
            });
    })
}
var buildSass = function(){
    return $.sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        onError: function(e){
            console.error('\033[31m [sass error]', e.message, '\033[0m');
        }
    })
}
module.exports = function(env){
    gulp.task('layout', function(){
        //装饰器
        return gulp.src([srcDir + 'dec/*.html'])
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
            .pipe(buildSass())
            // .pipe($.postcss([
            //     autoprefixer({browsers: ['last 1 version']})
            // ]))
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
            .pipe($.header([
                '---',
                'layout: page',
                '---',
                ''
                ].join('\n'), {}))
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest(destDir + 'pages/'));

        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.header([
                '---',
                'layout: main',
                '---',
                ''
                ].join('\n'), {}))
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest(destDir));
    });
    gulp.task('pageResources', function(){
        //commonjs用browserify打包
        var browserified = buildBrowserify();
        gulp.src([srcDir + 'pages/*/*.js'])
            .pipe(browserified)
            .pipe(gulp.dest(destDir + 'static/pages/'));
        gulp.src([srcDir + 'pages/*/*.scss'])
            .pipe(buildSass())
            .pipe(gulp.dest(destDir + 'static/pages/'));
        //其他渣渣资源
        gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.scss'])
            .pipe(gulp.dest(destDir + 'static/pages/'));
    });


    gulp.task('default', ['layout','post','rootConfig','static','pages','pageResources']);
    // gulp.task('default', ['layout','post','rootConfig','static','pages']);
    gulp.start('default');
}
