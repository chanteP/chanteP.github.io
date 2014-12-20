var express = require('express');
var http = require('http');
var app = express();

var fs = require('fs');
var url = require('url');
var path = require('path');
var sass = require('./tranScss');

app.set('port', 9000);

// app.use(express.compress());
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', './');

// app.get('/combo', require('./combo'));

app.get('/pages/*.html', views(1));
app.get('/*.html', views(0));
// app.get('/', views(0));

app.use(express.static(path.normalize(__dirname + '/../')));

app.listen(app.get('port'), function(){
    console.log('server is now running at :'+app.get('port')+' DAZE✧');
});

function views(pageType){
    var comboUrl = function(params){
        var compDemo = params.pathname.replace(/\.html$/, '').split('/');
        if(pageType === 0){
            compDemo[0] = 'page';
        }
        else if(pageType === 1){
            compDemo.shift();
            compDemo[0] = 'page';
        }
        return compDemo;
    }
    return function(req, res){
        var params = url.parse(req.url, true);
        var compDemo = comboUrl(params);
        var page = compDemo[compDemo.length -1]
        compDemo = compDemo.join('/');

        var html = (fs.readFileSync(path.normalize('./dev/'+compDemo+'/index.html')) + '')
            .replace('<%style%>', sass('./dev/'+compDemo+'/style.scss'));

        var data = {
            page : html
        };
        res.render(
            pageType === 0 ? 
                '_layouts/main' : 
                '_layouts/page'
            , data);
        res.end();
    }
}
