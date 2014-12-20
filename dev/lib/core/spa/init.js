
var $ = require('../kit');
var url = require('./url');
var loader = require('./loader');
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
            // loader.load(href);
        });

    url.on(function(src, dir){
        loader.load(src, dir);
    });
    // loader.load(location.href);
}
document.addEventListener('DOMContentLoaded', init);

module.exports = api = {
    initPage : function(doc, callback){
        if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', function(){
                api.initPage(doc, callback);
            });
            return;
        }

        var dom, page, inFrame = doc != self.document;
        dom = doc.querySelector('[data-page]');
        page = dom.dataset.page;
        if(inFrame){
            dom = $.create($.find('#wrapper', doc).innerHTML);
        }
        loader.init(page, dom, callback, inFrame);
        if(document.readyState !== 'complete'){
            window.addEventListener('load', function(){
                loader.load(location.href);
            });
        }
        else{
            loader.load(location.href);
        }
    },
    onUrlChange : url.on
}
