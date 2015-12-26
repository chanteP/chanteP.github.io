var fs = require('fs');
var glob = require('glob');


(glob.sync('./app/photos/*/*', null) || []).map((photos, i) => {
    var rs = /\/([\d]{2,2})([\d]{2,2})([^\d\/]+)\/([^\/]+)$/.exec(photos);
    var yy = rs[1],
        mm = rs[2],
        name = rs[3],
        fileName = rs[4];
    var fn = './app/posts/memories/20' + yy + '-' + mm + '-01-' + name + '_' + i + '.md';

    if(fs.existsSync(fn)){
        return;
    }
    fs.writeFileSync(fn, [
        '---',
        'layout: none',
        'title: ' + name,
        'category: memories',
        'image: /' + photos.slice(photos.indexOf('./app/') + 6),
        'date: 20' + yy + '-' + mm + '-01',
        '---',
        '' + yy + mm + '-' + name
    ].join('\n'));
});



require('@mtfe/alpha/bin/build')(require('./package.json').alphaConfig, function(){
    console.log('build views');
    try{
        fs.mkdirSync('./temp/pages');
    }
    catch(e){
    }
    (glob.sync('./app/views/*.html', null) || []).map((p) => {
        var content = fs.readFileSync(p) + '';
        content = content.replace(/\s*(\n|\n\r|\r)\s*/gm, ' ');

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