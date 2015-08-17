var $ = require('np-kit');
var loader = require('./loader')();


var parseHref = function(href){
    href = href.split('?')[0];
    var match = /^\/([^\/]+)\/?([\w\-\/]+)?/.exec(href) || [];
    return {
        page : match[1] || 'index',
        key : match[2] ? match[0] : null
    }
}
var check = function(url){
    var {page, key} = parseHref(url);
    loader.setPageKey(page, key);
}

module.exports = function(){

    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href = this.getAttribute('href');
            var target = this.getAttribute('target');
            if(target){return;}

            window.history.pushState(null, document.title, href);
            check(href);
            loader.loadIframe('/page' + href);
        });

    window.addEventListener('popstate', function(){
        check(location.pathname);
    });


    return {
        register : loader.register,
        loadPage : loader.loadPage
    };
}