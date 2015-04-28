var browserify = require('browserify');
var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');
var sass = require('./tranScss');
var uglify = require('uglify-js');
var fs = require('fs');


var buildCore = function(isDev){
    var w = browserify(watchify.args)
        .add('./dev/lib/core/core.js');
    var b = browserify({'full-path' : false})
        .add('./dev/lib/core/core.js');
    var h = isDev ? watchify(w) : b;

    var bundle = function(){
        try{
            fs.unlinkSync('./dev/static/js/kit.js');
            h.bundle()
                .pipe(fs.createWriteStream('./dev/static/js/kit.js'))
                .on('finish', function(){
                    try{

                    copy('./dev/static/js/kit.js', './static/js/kit.js', function(content){
                        return isDev ? content : uglify.minify(content, {fromString:true}).code;
                    });
                    }catch(e){
                        console.log(e);
                    }
                });
        }catch(e){
            console.log(e);
        }
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
        copy('./dev/dec/'+dec+'.html', './_layouts/'+dec+'.html', function(content){
            return content.replace('<%-page%>', '{{content}}');
        });
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
