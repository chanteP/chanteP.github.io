var express = require('express');
var http = require('http');
var app = express();

var fs = require('fs');
var url = require('url');
var path = require('path');

module.exports = function(){
    var root = path.normalize(__dirname + '/../temp/');
    app.set('port', 9000);

    // app.use(express.compress());
    app.engine('html', require('ejs').__express);
    app.set('view engine', 'html');
    app.set('views', root);

    // app.get('/combo', require('./combo'));

    app.get(/^\/pages\/.*/, function(req, res){
        var params = url.parse(req.url, true);

        // var page = params.path;
        // var page = params.path.replace(/.html$/, '');
        var page = /\/pages\/(.*)\.html$/.exec(params.path)[1];
        // var page = compDemo[compDemo.length -1]
        // compDemo = compDemo.join('/');

        // var html = (fs.readFileSync(path.normalize('./dev/'+compDemo+'/index.html')) + '')
        //     .replace(/<script src=\"\/static\/js\/(\w+)\.js/, '<script src="/dev/page/$1/init.js')
        //     .replace('<%style%>', sass('./dev/'+compDemo+'/style.scss'));

        // var html = (fs.readFileSync(path.normalize('./static/'+compDemo+'/index.html')) + '');
        //     // .replace('<%style%>', sass('./dev/'+compDemo+'/style.scss'));

        var html = (fs.readFileSync(path.normalize('temp/static/pages/'+page+'.html')) + '');
        res.render('_layouts/page.html', {
            page : html
        });
        res.end();
    });
    app.get(/^\/[\w]+$/, function(req, res){
        var params = url.parse(req.url, true);
        var page = params.path;

        var html = (fs.readFileSync(path.normalize('temp/static/pages/'+page+'.html')) + '');
            // .replace('<%style%>', sass('./dev/'+compDemo+'/style.scss'));

        res.render('_layouts/main.html', {
            page : html
        });
        res.end();
    });
    // app.get('/', views(0));
    app.use(express.static(root));

    app.listen(app.get('port'), function(){
        console.log('server is now running at :'+app.get('port')+' DAZE✧');
    });
}
