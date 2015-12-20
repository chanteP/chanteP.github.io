/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    TODO demo
    回退控制

    ch.push(component[, cfg])

    cfg : {
        block //无法被动后退
    }

    unit : {
        component
        block
        ... in cfg
    }
*/
var stack = [];
var title = window.document && window.document.title || '';

// var history = require('../plugins/history.js');
var history;
var autoPopLock;
var $;


//##############################################################################


var api = {
    stack : stack,
    block : false,
    pushState : pushState,
    replaceState : replaceState,
    push : function(component, cfg){
        if(!component.hide){
            //TODO 错误收集
            throw '[componentHandler] component.hide is not a function';
        }
        cfg = cfg || {};
        // this.remove(component, true);
        pushState(cfg.href, cfg.title);

        var state = history.getState && history.getState();
        stack.push({
            historyID : state && state.$id,
            component : component,
            block : cfg.block,
            title : cfg.title,
            onBack : cfg.onBack,
            href : cfg.href
        });
        findTitle();
    },
    get : function(index){
        return stack[index === undefined ? stack.length - 1 : index];
    },
    pop : function(){
        stack.pop();
    },
    remove : function(component, back){
        var check = stack.some(function(elem, index){
            if(elem.component === component){
                history.getState && history.getState() && history.getState().$id === elem.historyID && (autoPopLock=true) && history.back();
                // back && history.back();
                stack.splice(index, 1);
                return true;
            }
        });
        findTitle();
        return check;
    }
}

module.exports = function(core){
    $ = core;
    $.domReady(function(){
        history = $.history || require('./history').history;
        history.onpopstate(popState);
    });
    return {
        components : api
    };
};



function findTitle(){
    var lastTitle = title;
    for(var i = stack.length - 1; i >= 0; i--){
        if(stack[i].title){
            lastTitle = stack[i].title;
            break;
        }
    }
    ($.app && $.app.setTitle) ? 
        $.app.setTitle(lastTitle) : 
        (document.title = lastTitle); 
}
function pushState(href, title){
    history.pushState && history.pushState(null, title || '', href || null);
}
function replaceState(href, title){
    history.replaceState && history.replaceState(null, title || '', href || null);
}

//temp
function popState(e){
    if(autoPopLock){
        autoPopLock = false;
        return;
    }
    document.activeElement && document.activeElement.blur && document.activeElement.blur();

    var elem = api.get();
    if(!elem){
        // window.history.go(-1);
        return;
    }
    if(elem.onBack && typeof elem.onBack === 'function'){
        elem.onBack();
    }
    if(!api.block && !elem.block && !elem.component.block){
        elem.component.hide();
        findTitle();
    }
    else{
        pushState();
    }
}
