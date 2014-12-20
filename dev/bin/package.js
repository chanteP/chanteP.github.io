var browserify = require('browserify');
var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');
var sass = require('./tranScss');
var fs = require('fs');


var buildCore = function(isWatch, cb){
    var b = browserify(watchify.args)
        .add('./dev/lib/core/core.js');
    var h = isWatch ? watchify(b) : b;

    var bundle = function(){
        h.bundle()
            .pipe(fs.createWriteStream('./static/js/kit.js'));
    }
    h.on('update', bundle);
    // h.on('bundle', function(){console.log('fin')})
    h.on('bundle', cb || function(){})
    bundle();
}
var buildFiles = function(){
    packCss('./dev/static/css/global.scss', './static/css/global.css');
    require('./dev/bin/tabs.js').forEach(function(tab){
        copy('./dev/page/'+tab+'/init.js', './static/js/' + tab + '.js');
    });

    var dirName = './dev/static/images/';
    var dir = fs.readdirSync(dirName);
    dir.forEach(function(file){
        if(file.indexOf('.') === 0){return;}
        fs.createReadStream(dirName + '/' + file)
            .pipe(fs.createWriteStream('./static/images/' + file));
    });

    ['main', 'page', 'post'].forEach(function(dec){
        copy('./dev/dec/'+dec+'.html', './_layouts/'+dec+'.html', function(content){
            // return content.replace('<%-page%>', '{{ content }}');
            return content;
        });
    });
}



module.exports = {
    dev : function(cb){
        buildFiles();
        // buildCore(true, cb)
    },
    // build : function(cb){
    //     buildFiles();
    //     buildCore(false, cb)
    // }
}
function copy(src, dist){
    fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}
function packCss(src, dist){
    fs.writeFile(dist, sass(src));
}
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true; 
}