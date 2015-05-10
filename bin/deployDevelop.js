var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify');

module.exports = function(env){
    gulp.task('layout', function(){
        //装饰器
        return gulp.src(['dev/dec/*.html'])
            .pipe(gulp.dest('built/_layouts/'));
    });
    gulp.task('post', function(){
        //菠萝格
        return gulp.src(['post/*'])
            .pipe(gulp.dest('built/_post/'));
    });
    gulp.task('rootConfig', function(){
        //根目录配置文件
        return gulp.src(['root/*'])
            .pipe(gulp.dest('built/'));
    });

    gulp.task('pages', function(){
        //一个页面对应一个文件夹
        gulp.src(['dev/page/*/index.html'])
            .pipe(rename(function(file){
                file.basename = file.dirname;
                file.dirname = '';
            }))
            .pipe(gulp.dest('built/'));
        //sass编译
    });
    gulp.task('pageResources', function(){
        gulp.src(['dev/page/**/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('built/static/pages/'));
        //普通css
        gulp.src(['dev/page/**/*.css'])
            .pipe(gulp.dest('built/static/pages/'));
        //commonjs用browserify打包
        gulp.src(['dev/page/**/*.common.js'])
            .pipe(browserify())
            .pipe(rename(function(file){
                file.basename = file.basename.replace(/.common$/, '');
            }))
            .pipe(gulp.dest('built/static/pages/'));
        //其他渣渣js
        gulp.src(['dev/page/**/*.js', '!*.common.js'])
            .pipe(gulp.dest('built/static/pages/'));
        //其他渣渣资源
        gulp.src(['dev/page/*/**', '!**/*.js', '!**/*.css', '!**/*.scss'])
            .pipe(gulp.dest('built/static/pages/'));
    });
    gulp.task('static', function(){
        //sass编译
        gulp.src(['dev/static/css/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('built/static/css/'));
        //普通css
        gulp.src(['dev/static/css/*.css'])
            .pipe(gulp.dest('built/static/css/'));
        //images下面所有
        gulp.src(['dev/static/images/*'])
            .pipe(gulp.dest('built/static/images/'));
        //commonjs用browserify打包
        gulp.src(['dev/static/js/*.common.js'])
            .pipe(browserify())
            .pipe(rename(function(file){
                file.basename = file.basename.replace(/.common$/, '');
            }))
            .pipe(gulp.dest('built/static/js/'));
        //其他渣渣js
        gulp.src(['dev/static/js/*.js', '!dev/static/js/*.common.js'])
            .pipe(gulp.dest('built/static/js/'));
    });


    gulp.task('default', ['layout','post','rootConfig','pages','pageResources','static']);
    gulp.start('default');
}
