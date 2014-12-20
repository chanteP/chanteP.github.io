var fs = require('fs');
var path = require('path');
var uglify = require('uglify-js');
uglify = {
    minify : function(url){
        return {
            code : fs.readFileSync(url)
        }
    }
}


module.exports = function(){
    require('./dev/bin/tabs.js').forEach(function(tab){
        var file;
        copy('./dev/page/'+tab+'/index.html', './'+tab+'.html', function(content){
            return [
                '---',
                'layout: main',
                '---',
                file = content.replace('<%style%>', fs.readFileSync('./page/'+tab+'/style.css'))
                    .replace('<script src="/page/'+tab+'/init.js"></script>', '<script>'+uglify.minify('./page/'+tab+'/init.js').code+'</script>')
            ].join('\n');
        });
        copy('./page/'+tab+'/index.html', '../pages/'+tab+'.html', function(content){
            return [
                '---',
                'layout: page',
                '---',
                file
            ].join('\n');
        });
    });

    ['global.css', 'kit.js'].forEach(function(res){
        copy('./resource/'+res, '../resource/'+res, function(content){
            return content;
        });
    });
    copyResources();
}


function copy(src, dist, replaceFunc){
    console.log('----buildlist:'+dist);
    var content = fs.readFileSync(src);
    content = replaceFunc ? replaceFunc(content + '') : content;
    fs.writeFile(dist, content, function(err){
        if (err) throw err;
        console.log('----buildlist fin:'+dist);
    });        
}