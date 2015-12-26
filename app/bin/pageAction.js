var url = require('url');
var querystring = require('querystring');

module.exports = function(req, res){
    var _this = this;
    var params = url.parse(req.url, true);

    var c = /^\/([^\/\&\#]+)\/?([^\/\&\#]+)?/.exec(req.url);

    if(c[1] === 'pages'){
        this.render('page.html', c[2] + '.html');
    }
    else{
        this.render('main.html', c[1] + '.html');
    }
}
