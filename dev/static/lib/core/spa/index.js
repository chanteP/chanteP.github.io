var $ = require('np-kit');
var histroy = require('np-history');

var {Controller, Page} = require('./page');

var loadPage = function(uri, contentNode, option){
    var scripts = option.scripts || [],
        styles = option.styles || [];

    var page = new Page(uri);
    page.setContent(contentNode.innerHTML);
    scripts.concat(styles).forEach(function(url){
        $.load(url);
    });
}
var register = function(controller, factory){
    controller = new Controller(controller);
    controller.set(factory.call(controller, $));
}

module.exports = function(){
    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href = this.getAttribute('href');
            var target = this.getAttribute('target');
            if(target){return;}
            histroy.pushState(null, '', href);
        });

    $.domReady(function(){
        histroy.replaceState(null, '', location.pathname);
        histroy.onstatechange(function(){
            new Page(location.pathname).show();
        });
    });
    return {
        register : register,
        loadPage : loadPage,

        controllers : Controller.list,
        pages : Page.list
    };
}