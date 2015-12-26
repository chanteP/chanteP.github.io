var fs = require('fs');
var glob = require('glob');

buildMemories();

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
function buildMemories(){
    var memMap = {};
    (glob.sync('./app/posts/memories/*', null) || []).map((mem, i) => {
        memMap[mem] = false;
    });
    (glob.sync('./app/photos/*/*', null) || []).map((photo, i) => {
        var rs = /\/([\d]{2,2})([\d]{2,2})([^\d\/]+)\/([^\/]+)$/.exec(photo);
        var yy = rs[1],
            mm = rs[2],
            name = rs[3],
            fileName = rs[4];

        if(fileName.indexOf('_') === 0){
            fs.writeFileSync(photo.replace(/_([^\/]+)$/, '$1'), fs.readFileSync(photo));
            fs.unlinkSync(photo);
            photo = photo.replace(/_([^\/]+)$/, '$1');
            fileName = fileName.replace(/^_*/, '');
        }

        var fn = './app/posts/memories/20' + yy + '-' + mm + '-01-' + name + '_' + fileName + '.md';
        memMap[fn] = true;
        var content = '' + yy + mm + '-' + name + ' ';

        if(fs.existsSync(fn)){
            var txt = fs.readFileSync(fn) + '';
            content = txt.split('---\n')[2] || '';
        }
        fs.writeFileSync(fn, [
            '---',
            'layout: none',
            'title: ' + name,
            'category: memories',
            'image: /' + photo.slice(photo.indexOf('./app/') + 6),
            'date: 20' + yy + '-' + mm + '-01',
            '---',
            content
        ].join('\n'));
    });
    Object.keys(memMap).map((file) => {
        if(!memMap[file]){
            fs.unlinkSync(file);
        }
    });
}