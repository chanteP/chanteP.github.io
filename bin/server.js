var express = require('express');
var http = require('http');
var app = express();

var fs = require('fs');
var url = require('url');
var path = require('path');

module.exports = function(){
    var root = path.normalize(__dirname + '/../temp/');
    app.set('port', 9000);

    app.engine('html', require('ejs').__express);
    app.set('view engine', 'html');
    app.set('views', root);


    app.get(/^\/pages\/.*/, function(req, res){
        var params = url.parse(req.url, true);

        var page = /\/pages\/(.*)$/.exec(params.path)[1];
      
        var html = (fs.readFileSync(path.normalize('temp/pages/'+page+'.html')) + '');
        res.render('_layouts/page.html', {
            content : html
        });
        res.end();
    });
    app.get(/^\/[\w]+$/, function(req, res){
        var params = url.parse(req.url, true);
        var page = params.path;

        var html = (fs.readFileSync(path.normalize('temp/pages/'+page+'.html')) + '');

        res.render('_layouts/main.html', {
            content : html
        });
        res.end();
    });
    // app.get('/', views(0));
    app.use(express.static(root));

    app.listen(app.get('port'), function(){
        console.log('server is now running at :'+app.get('port')+' DAZE✧');
    });
}
