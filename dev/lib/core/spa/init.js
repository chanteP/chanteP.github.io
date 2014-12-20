
var $ = require('../kit');
var url = require('./url');
var page = require('./loader');
var api;
var self = window.self;

var init = function(){
    $.evt(document.body)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href, fake;
            href = this.getAttribute('href');
            if(!($.isOnline)){
                href = (href.length > 1 ? href : '/index') + '.html';
            }
            fake = this.dataset.fake;
            url.set(fake || href, document.title, null, href);
            // page.load(href);
        });

    url.on(function(src, dir){
        page.load(src, dir);
    });
    // page.load(location.href);
}
document.addEventListener('DOMContentLoaded', init);

module.exports = api = {
    loadScript : function(window, page){
        var dom;
        if(window != self){
            dom = $.create($.find('#wrapper', window.document).innerHTML);
        }
        else{
            dom = doc.querySelecter('[data-page="'+page+'"]');
        }
        page.init(page, dom);
    },
    initPage : function(page, callback){
        // setTimeout(function(){
        //     var rs = callback(window, document, $.find('[data-page]'));
        //     rs && rs.show  && rs.show();
        // }, 0);
        // return;
        page.set(page, callback);
        // if(document.readyState === 'loading'){
        //     document.addEventListener('DOMContentLoaded', function(){
        //         api.initPage(callback);
        //     });
        //     return;
        // }
        // page.set(wrap, callback(window, document, wrap, $));
        // if(document.readyState !== 'complete'){
        //     window.addEventListener('load', function(){
        //         page.load(location.href);
        //     });
        // }
        // else{
        //     page.load(location.href);
        // }
        page.load(location.href);
    },
    onUrlChange : url.on
}
