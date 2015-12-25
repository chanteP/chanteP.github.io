var fs = require('fs');
var path = require('path');

var log = console.log;

var Liquid = require("liquid-node");
var engine = new Liquid.Engine;

var teColor = 37;

var getDec = function(decName){
    var decPath = decName;
    decPath = path.normalize(decPath);
    log('server', 'render@decorator : ' + decPath, teColor);
    if(fs.existsSync(decPath)){
        return fs.readFileSync(decPath) + '';
    }
    return '{{ content }}';
}
var getBody = function(uri){
    uri = path.normalize(uri);
    log('server', 'render@file : ' + uri, teColor);
    return '' + fs.readFileSync(uri);
}
log('templateEngine', 'liquid( {% code %} )', 32);

module.exports = function(app){
    // app.engine('html', ejs.__express);
    return function(req, res, dec, uri, data, cfg){
        var html = getBody(app.get('fixSuffix')(uri));
        var decHtml = getDec(dec);

        decHtml = decHtml.replace('{{ content }}', html);
        var body = '';
        try{
            engine
                .parseAndRender(decHtml, data || {})
                .then(function(result){
                    cfg && cfg.beforeSend(result);
                    res.send(result);
                    res.end();
                }, () => {
                    res.end();
                });
        }
        catch(e){
            log('server:liquid', e, 31);
            res.end();
        }
        return body;
    }
}