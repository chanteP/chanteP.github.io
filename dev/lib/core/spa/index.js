
var $ = require('../kit');
var url = require('./url');
var api;
var self = window.self;
var page = '', pageCallback = [];

var inited = false;

var defaultTitle = 'neetproject @2015'

var init = function(){
    init = function(){};
    $.evt(document.body)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
        });
    $.evt(document.body, {})
        .on('tap', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href, fake;
            href = this.getAttribute('href');
            if(!($.isOnline)){
                href = (href.length > 1 ? href : '/index') + '.html';
            }
            fake = this.dataset.fake;
            url.set(fake || href, this.title || defaultTitle, null, href);
        });

    url.on(function(src, dir){
        loader.load(src, dir);
    });
    // loader.load(location.href);
}
document.addEventListener('DOMContentLoaded', init);

module.exports = api = {
    set page(value){
        pageCallback.forEach(function(func){
            func(value, page);
        });
        page = value;
    },
    get page(){
        return page;
    },
    initPage : function(doc, callback){
        doc.currentScript && doc.currentScript.parentNode.removeChild(doc.currentScript);
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

        if(document.readyState !== 'complete' && document.readyState !== 'interactive'){
            window.addEventListener('load', function(){
                !inited && loader.load(location.href, 1);
            });
        }
        else{
            loader.load(location.href, 1);
            inited = true;
        }
    },
    onUrlChange : url.on,
    onPageChange : function(func){
        pageCallback.push(func);
    }
}
var loader = require('./loader');
