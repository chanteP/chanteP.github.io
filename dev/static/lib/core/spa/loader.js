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

var loadPageScript = function(scriptSrc){
    scriptSrc ?
        $.load(scriptSrc, null, {
            onload : function(){
                check();
            },
            onerror : function(){
                check();
            }
        }) : 
        check();
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
        loadPage : function(pageName, pageKey, contentNode, scriptSrc){
            api.setPageKey(pageName, pageKey);

            if(!(contentNode instanceof Node)){
                var template = contentNode.innerHTML;
                contentNode = $.create(template);
            }else{
                contentNode = contentNode.firstElementChild;
            }


            var page = new Page(pageName, contentNode);
            if(pageKey){
                page.extend(pageName, contentNode);
            }
            loadPageScript(scriptSrc);
        }
    }
}