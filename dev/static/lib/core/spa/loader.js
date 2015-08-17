var $ = require('np-kit');
var Page = require('./page');
var toggle = require('./effect');


var curPageName,
    curPageKey, 
    curInitedPage;
var data = {
    set page(value){
        curPageName = value;

    },
    get page(){
        return curPageName;
    }
};

var check = function(pageName){
    if(curPageKey !== curInitedPage){
        toggle(new Page(curPageKey), new Page(curInitedPage));
        curInitedPage = curPageKey;
    }
}

var api;
module.exports = function(){
    return api = {
        setPageKey : function(pageName, pageKey){
            curPageName = pageName;
            curPageKey = pageKey || pageName;
        },
        loadIframe : function(url){
            var i = document.createElement('iframe');
            i.classList.add('hide');
            document.body.appendChild(i);
            i.onload = i.onerror = function(){
                $.remove(i);
            }
            i.src = url;
        },
        register : function(pageName, factory){
            var page = new Page(pageName);
            page.register(factory ? factory($, page.contentNode) : {});
        },
        loadPage : function(pageName, pageKey, contentNode, script){
            api.setPageKey(pageName, pageKey);

            var page = new Page(pageName);
            var template = contentNode.innerHTML;

            if(contentNode instanceof Node){
                $.find('#wrapper').innerHTML = '';
            }

            if(pageKey){
                page = page.extend(pageName);
            }
            page.setContent(template);

            script && eval(script);
        }
    }
}