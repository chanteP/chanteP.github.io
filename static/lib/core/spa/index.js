var $ = require('np-kit');
var histroy = require('np-history');

var Controller = require('./controller'),
    Page = require('./page');

var loadPage = function(uri, contentNode, option){
    var scripts = option.scripts || [],
        styles = option.styles || [];

    var page = new Page(uri);
    if(page.loader > page.LOADING){return;}
    page.setContent(contentNode.innerHTML);
    scripts.concat(styles).forEach(function(url){
        $.load(url);
    });
}
var register = function(controller, factory){
    controller = new Controller(controller);
    controller.set(factory.call(controller, $));
    controller.check();
}
var go = function(href){
    histroy.pushState(null, '', href);
}

module.exports = function(){
    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href = this.getAttribute('href');
            var target = this.getAttribute('target');
            if(target){return;}
            go(href);
        });

    $.domReady(function(){
        histroy.onstatechange(function(){
            new Page(location.pathname).show();
        });
        histroy.replaceState(null, '', location.pathname);
    });
    return {
        register : register,
        loadPage : loadPage,
        load : go,

        Page : Page,
        Controller : Controller,

        controllers : Controller.list,
        pages : Page.list
    };
}