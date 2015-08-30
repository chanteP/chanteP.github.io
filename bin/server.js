var express = require('express');
var http = require('http');
var app = express();

var fs = require('fs');
var url = require('url');
var path = require('path');

var markdown = require('marked');


var renderPage = function(dec, page, req, res){
    console.log(req.url);
    var url = path.normalize('temp/'+page);
    var html = fs.readFileSync(url) + '';

    if(/.md$/.test(url)){
        html = markdown(html);
    }
    setTimeout(function(){
        res.render('_layouts/'+dec+'.html', {
            content : html
        });
        res.end();
    }, req.param.delay || 0);
}

module.exports = function(){
    var root = path.normalize(__dirname + '/../temp/');
    app.set('port', 9000);

    app.engine('html', require('ejs').__express);
    app.set('view engine', 'html');
    app.set('views', root);

    app.get('/', function(req, res){
        renderPage('main', 'pages/' + 'index' + '.html', req, res);
    });
    app.get(/^\/pages\/.*/, function(req, res){
        var params = url.parse(req.url, true);
        var page = /\/pages\/(.*)$/.exec(params.path)[1];
        renderPage('page', 'pages/' + page + '.html', req, res);
    });
    app.get(/^\/2/, function(req, res){
        var params = url.parse(req.url, true);
        var page = params.path;
        renderPage('post', '_posts/page/' + page.replace(/\//g, '-').slice(1), req, res);
    });
    app.get(/^\/[\w]+$/, function(req, res){
        var params = url.parse(req.url, true);
        var page = params.path;
        renderPage('main', 'pages/' + page + '.html', req, res);
    });
    // app.get('/', views(0));
    app.use(express.static(root));

    app.listen(app.get('port'), function(){
        console.log('server is now running at :'+app.get('port')+' DAZE✧');
    });
}
