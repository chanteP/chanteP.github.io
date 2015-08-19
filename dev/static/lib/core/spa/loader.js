var $ = require('np-kit');
var Page = require('./page');
var history = require('np-history');


var parseHref = function(href){
    href = href.split('?')[0];
    var match = /^\/([^\/]+)\/?([\w\-\/]+)?/.exec(href) || [];
    return {
        page : match[1] || 'index',
        key : match[2] ? match[0] : null
    }
}

var loadIframe = function(page, url){
    page.loading = true;

    var i = document.createElement('iframe');
    i.classList.add('hide');
    document.body.appendChild(i);
    i.onload = i.onerror = function(e){
        page.loading = false;
        page.loaded = e.type === 'error';
        $.remove(i);
    }
    i.src = url;
};
var api;
module.exports = function(){
    return api = {
        init : function(){
            api.load(location.pathname, true);
        },
        load : function(href, replace){
            var {page, key} = parseHref(href);
            var pageName = page;
            page = new Page(pageName);

            if(!page.loaded && !page.loading){
                loadIframe(page, '/page' + href);
            }
            //loading
            history[replace ? 'replaceState' : 'pushState'](null, '', href, function(state){
                console.log(state.page)
                    Page.show(state.page);
                }, function(state){
                    // Page.show(state.page);
                }, {
                    page : pageName
                });
        },
        register : function(pageName, factory){
            var page = new Page(pageName);
            page.register(factory ? factory($, page) : {});
            if(page.state === page.SHOW){
                page.run('show');
            }
        },
        loadPage : function(pageName, pageKey, contentNode, scriptUrl){
            var page = new Page(pageName);
            var template = contentNode.innerHTML;

            if(contentNode instanceof Node){
                $.find('#wrapper').innerHTML = '';
            }

            if(pageKey){
                page = page.extend(pageName);
            }
            page.setContent(template);

            $.load(scriptUrl).onload = function(){
                $.remove(this);
            };
        }
    }
}