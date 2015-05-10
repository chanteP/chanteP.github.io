var fs = require('fs');
var path = require('path');
var uglify = require('uglify-js');
var sass = require('./tranScss');

module.exports = function(isDev){
    if(isDev){
        uglify = {
            minify : function(url){
                return {
                    code : fs.readFileSync(url)
                }
            }
        }  
    }

    !fs.existsSync('pages') && fs.mkdirSync('pages');

    require('./tabs').forEach(function(tab){
        var file = '';
        copy('./dev/page/'+tab+'/index.html', './pages/'+tab+'.html', function(content){
            return [
                '---',
                'layout: page',
                '---',
                file = content.replace('<%style%>', sass('./dev/page/'+tab+'/style.scss'))
                    .replace(/<script[\s\S]+<\/script>/, '<script>'+uglify.minify('./dev/page/'+tab+'/init.js').code+'</script>')
            ].join('\n');
        });
        copy('./dev/page/'+tab+'/index.html', './'+tab+'.html', function(content){
            return [
                '---',
                'layout: main',
                '---',
                file
            ].join('\n');
        });
    });
}

function copy(src, dist, replaceFunc){
    console.log('----buildlist:'+dist);
    var content = fs.readFileSync(src);
    content = replaceFunc ? replaceFunc(content + '') : content;
    fs.writeFile(dist, content, function(err){
        if (err) console.log(err);
        console.log('----buildlist fin:'+dist);
    });        
}