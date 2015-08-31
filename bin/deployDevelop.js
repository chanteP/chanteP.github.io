var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserify = require('browserify');
var watchify = require('watchify');
var through2 = require('through2');
var autoprefixer = require('autoprefixer-core');
var fs = require('fs');

var srcDir = './dev/',
    destDir = './temp/';

var needWatch = false;

var shrinkDir = function(file){
    var filename;
    filename = file.dirname;
    file.dirname = '';
    file.basename = file.basename.replace(/index/, filename);
};
var buildBrowserify = function(src){
    var returnValue = through2.obj(function (file, enc, next){
        if(needWatch){
            var b = browserify(file.path)
            var bundle = function(){
                b.bundle(function(err, res){
                    // console.log('###########', file.path, res);
                    // assumes file.contents is a Buffer
                    file.contents = res || new Buffer('');
                    next(null, file);
                })
            }
            b = watchify(b, {});
            b.on('update', function(){
                console.log('update@ ' + Date.now());
                gulp.src(src)
                    .pipe(returnValue);
                bundle();
            })
            .on('error', function(e){
                // delete e.stream;
                console.error('\033[31m [browserify error]', e.message, '\033[0m');
                this.emit('end');
            });
            bundle();
        }
        else{
            var b = browserify(file.path)
            b
                .bundle(function(err, res){
                    // console.log('###########', file.path, res);
                    // assumes file.contents is a Buffer
                    file.contents = res || new Buffer('');
                    next(null, file);
                })
                .on('update', function(){
                    console.log('update@ ' + Date.now());
                    gulp.src(src)
                        .pipe(returnValue);
                    // bundle();
                })
                .on('error', function(e){
                    // delete e.stream;
                    console.error('\033[31m [browserify error]', e.message, '\033[0m');
                    this.emit('end');
                });
            // bundle();
        }
    });
    return returnValue;
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
var insertStyle = function(){
    return $.replace(/<style>@import\surl\(\'([\w\.\/\-\+]+)\'\);<\/style>/g, function(str, url){
        var uri = destDir.slice(0, -1) + url;
        var content = '';
        if(fs.existsSync(uri)){
            content = fs.readFileSync(uri);
        }
        return '<style>' + content + '</style>';
    })
}
module.exports = function(watch){
    needWatch = watch;
    gulp.task('layout', function(){
        //装饰器
        return gulp.src([srcDir + 'dec/*.html'])
            .pipe($.replace(/{{ ([\w]+) }}/g, '<%-$1%>'))
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
        //css
        gulp.src([srcDir + 'static/css/*.scss'])
            .pipe(buildSass())
            // .pipe($.postcss([
            //     autoprefixer({browsers: ['last 1 version']})
            // ]))
            .pipe(gulp.dest(destDir + 'static/css/'));
        gulp.src(srcDir + 'static/css/*.css')
            .pipe(gulp.dest(destDir + 'static/css/'));
        //其他所有
        gulp.src([srcDir + 'static/**/*', '!' + srcDir + 'static/lib/', '!' + srcDir + 'static/css/'])
            .pipe(gulp.dest(destDir + 'static/'));
        //lib下面
        gulp.src([srcDir + 'static/lib/*/index.js'])
            .pipe($.sourcemaps.init())
            .pipe(buildBrowserify([srcDir + 'static/lib/*/index.js']))
            .pipe($.rename(shrinkDir))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(destDir + 'static/lib'));
        gulp.src([srcDir + 'static/lib/*.js'])
            .pipe(gulp.dest(destDir + 'static/lib'));
    });

    gulp.task('pages', ['pageResources'], function(){
        //一个页面对应一个文件夹
        gulp.src([srcDir + 'pages/*/index.html'])
            .pipe($.rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(insertStyle())
            .pipe(gulp.dest(destDir + 'pages/'));
        //sass编译
    });
    gulp.task('pageResources', function(){
        //commonjs用browserify打包
        gulp.src([srcDir + 'pages/*/*.js'])
            .pipe($.sourcemaps.init())
            .pipe(buildBrowserify([srcDir + 'pages/*/*.js']))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(destDir + 'static/pages/'));
        gulp.src([srcDir + 'pages/*/*.scss'])
            .pipe(buildSass())
            .pipe(gulp.dest(destDir + 'static/pages/'));
        //其他渣渣资源
        gulp.src([srcDir + 'pages/*/**', '!**/*.js', '!**/*.scss'])
            .pipe(gulp.dest(destDir + 'static/pages/'));
    });


    gulp.task('default', ['layout','post','rootConfig','static','pageResources'], function(){
        gulp.start('pages');
    });
    gulp.start('default');
}
