var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    header = require('gulp-header'),
    replace = require('gulp-replace'),
    build = require('./gulp-buildPage');

var log = function(msg){
    console.log(msg)
}
module.exports = function(env){
    var min = env !== 'development'
    var pageEngine = function*(msg){

        var pageBuildModNum = 4, i = 0;
        while(++i <= pageBuildModNum){
            log(yield, i);
        }
        gulp.start('pages')
    }
    pageEngine = pageEngine();

    gulp.task('layout', function(){
        //装饰器
        log('[root]复制装饰器');
        return gulp.src(['dev/dec/*.html'])
            .pipe(replace('<%-page%>', '{{ content }}'))
            .pipe(gulp.dest('built/_layouts/'));
    });
    gulp.task('include', function(){
        log('[root]复制includes');
        return gulp.src(['dev/include/*.html'])
            .pipe(gulp.dest('built/_includes/'));
    });
    gulp.task('post', function(){
        //菠萝格
        log('[root]复制posts');
        return gulp.src(['posts/*/*'])
            .pipe(rename(function(file){
                file.dirname = '';
            }))
            .pipe(gulp.dest('built/_posts'));
    });
    gulp.task('rootConfig', function(){
        //根目录配置文件
        log('[root]复制配置文件');
        return gulp.src(['root/*'])
            .pipe(gulp.dest('built/'));
    });

    gulp.task('pages', function(){
        //一个页面对应一个文件夹
        log('[html]页面生成');
        gulp.src(['dev/page/*/index.html'])
            .pipe(rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(build({min:min}))
            .pipe(header([
                '---',
                'layout: main',
                '---',
                ''
            ].join('\n')))
            .pipe(gulp.dest('built/'))
            .on('finish', function(){log('[html]页面生成完成')});
        log('[html]单页生成');
        gulp.src(['dev/page/*/index.html'])
            .pipe(rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(build({min:min}))
            .pipe(header([
                '---',
                'layout: page',
                '---',
                ''
            ].join('\n')))
            .pipe(gulp.dest('built/pages/'))
            .on('finish', function(){log('[html]单页生成完成')});
    });
    gulp.task('pageResources', function(){
        log('[page]sass编译');
        gulp.src(['dev/page/**/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('built/static/pages/'))
            .on('finish', function(){pageEngine.next('[page]sass编译完成')});
        log('[page]普通css');
        gulp.src(['dev/page/**/*.css'])
            .pipe(gulp.dest('built/static/pages/'))
            .on('finish', function(){pageEngine.next('[page]css复制完成')});
        log('[page]commonjs用browserify打包');
        gulp.src(['dev/page/**/*.common.js'])
            .pipe(browserify())
            .pipe(rename(function(file){
                file.basename = file.basename.replace(/.common$/, '');
            }))
            .pipe(gulp.dest('built/static/pages/'))
            .on('finish', function(){pageEngine.next('[page]commonjs完成')});
        log('[page]其他渣渣js');
        gulp.src(['dev/page/**/*.js', '!*.common.js'])
            .pipe(gulp.dest('built/static/pages/'))
            .on('finish', function(){pageEngine.next('[page]js复制完成')});
        log('[page]其他渣渣资源');
        gulp.src(['dev/page/*/**', '!**/*.js', '!**/*.css', '!**/*.scss', '!**/*.html'])
            .pipe(gulp.dest('built/static/pages/'))
            .on('finish', function(){pageEngine.next('[page]静态资源复制完成')});
    });
    gulp.task('static', function(){
        log('[static]sass编译');
        gulp.src(['dev/static/css/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('built/static/css/'));
        log('[static]普通css');
        gulp.src(['dev/static/css/*.css'])
            .pipe(gulp.dest('built/static/css/'));
        log('[static]images下面所有');
        gulp.src(['dev/static/images/*'])
            .pipe(gulp.dest('built/static/images/'));
        log('[static]commonjs用browserify打包');
        gulp.src(['dev/static/js/*.common.js'])
            .pipe(browserify())
            .pipe(rename(function(file){
                file.basename = file.basename.replace(/.common$/, '');
            }))
            .pipe(gulp.dest('built/static/js/'));
        log('[static]其他渣渣js');
        gulp.src(['dev/static/js/*.js', '!dev/static/js/*.common.js'])
            .pipe(gulp.dest('built/static/js/'));
    });


    gulp.task('default', ['layout','include','post','rootConfig','pageResources','static']);
    gulp.start('default');
}
