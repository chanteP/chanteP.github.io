var browserify = require('browserify');
var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');
var sass = require('./tranScss');
var uglify = require('uglify-js');
var fs = require('fs');


var buildCore = function(isDev){
    var b = browserify(watchify.args)
        .add('./dev/lib/core/core.js');
    var h = isDev ? watchify(b) : b;

    var bundle = function(){
        h.bundle()
            .pipe(fs.createWriteStream('./dev/static/js/kit.js'))
            .on('finish', function(){
                copy('./dev/static/js/kit.js', './static/js/kit.js', isDev || function(content){
                    return uglify.minify(content);
                });
            });
    }
    h.on('update', bundle);
    bundle();
}
var buildFiles = function(){
    !fs.existsSync('static') && fs.mkdirSync('static');
    !fs.existsSync('static/js') && fs.mkdirSync('static/js');
    !fs.existsSync('static/css') && fs.mkdirSync('static/css');
    !fs.existsSync('static/images') && fs.mkdirSync('static/images');

    packCss('./dev/static/css/global.scss', './static/css/global.css');
    // copy('./dev/static/js/kit.js', './static/js/kit.js');

    var dirName = './dev/static/images/';
    var dir = fs.readdirSync(dirName);
    dir.forEach(function(file){
        if(file.indexOf('.') === 0){return;}
        fs.createReadStream(dirName + '/' + file)
            .pipe(fs.createWriteStream('./static/images/' + file));
    });

    ['main', 'page', 'post'].forEach(function(dec){
        copy('./dev/dec/'+dec+'.html', './_layouts/'+dec+'.html');
    });
}


module.exports = function(isDev){
    buildCore(isDev);
    buildFiles();
}
function copy(src, dist, replaceFunc){
    if(!replaceFunc){
        fs.createReadStream(src).pipe(fs.createWriteStream(dist))
    }
    else{
        var content = fs.readFileSync(src);
        content = replaceFunc ? replaceFunc(content + '') : content;
        fs.writeFile(dist, content, function(err){
            if (err) console.log(err);
        });  
    }
}
function packCss(src, dist){
    fs.writeFile(dist, sass(src));
}
