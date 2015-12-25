var fs = require('fs');
var glob = require('glob');
require('@mtfe/alpha/bin/build')(require('./package.json').alphaConfig, function(){
    console.log('build views');
    try{
        fs.mkdirSync('./temp/pages');
    }
    catch(e){
    }
    (glob.sync('./app/views/*.html', null) || []).map((p) => {
        var content = fs.readFileSync(p);
        var viewName = /([^\/]+)\.html$/.exec(p);
        var contentMain = header('main') + content;
        var contentPage = header('page') + content;
        fs.writeFileSync('./temp/' + viewName[1] + '.html', contentMain);
        fs.writeFileSync('./temp/pages/' + viewName[1] + '.html', contentPage);
    });
});


function header(layout){
    return [
        '---',
        'layout: ' + layout,
        '---',
        ''
    ].join('\n');
}