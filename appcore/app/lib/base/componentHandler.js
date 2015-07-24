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
var title = window.document.title;

var pushState = function(){
    window.history.pushState && window.history.pushState(null, document.title, location.href);
    // location.hash = Date.now();
}

//temp
var popState = function(e){
    document.activeElement && document.activeElement.blur && document.activeElement.blur();

    var elem = api.get();
    if(!elem){
        window.location.href = "merchant://webview?action=back";
        return;
    }
    if(elem && elem.onBack && typeof elem.onBack === 'function'){
        elem.onBack();
    }
    if(elem && (!api.block && !elem.block && !elem.component.block)){
        elem.component.hide();
        document.title = api.get() ? api.get().title || title : title;
    }
    else{
        pushState();
    }
}
window.webviewBack = popState;

//##############################################################################
//不应该放这里
var closeCheckList = [];
window.webviewClose = function(){
    try{
        if(closeCheckList.every(function(checkFunc){
            return checkFunc();
        })){
            window.location.href = "merchant://webview?action=back";
        }
    }catch(e){
        window.location.href = "merchant://webview?action=back";
    }
}

//##############################################################################
document.addEventListener('DOMContentLoaded', function() {
// window.addEventListener('load', function(){
    setTimeout(function(){
        if(require('../base').env === 'APP'){
            window.location.href = "merchant://webview?customBack=webviewBack&customClose=webviewClose";
        }
        else{
            window.addEventListener('popstate', popState);
        }
        setTimeout(function(){
            $(api).trigger('init');
        }, 500)
    }, 0);
});

var api = {
    stack : stack,
    block : false,
    pushState : pushState,
    push : function(component, cfg){
        if(!component.hide){
            //TODO 错误收集
            throw '[componentHandler] component.hide is not a function';
        }
        cfg = cfg || {};
        this.remove(component);
        
        pushState();

        stack.push({
            component : component,
            block : cfg.block,
            title : cfg.title,
            onBack : cfg.onBack
        });
        window.document.title = cfg.title || title;
        return this;
    },
    get : function(index){
        return stack[index === undefined ? stack.length - 1 : index];
    },
    pop : function(){
        stack.pop();
    },
    remove : function(component){
        stack.some(function(elem, index){
            if(elem.component === component){
                stack.splice(index, 1);
                return true;
            }
        });
        //TODO 改进
        var lastTitle = title;
        for(var i = stack.length - 1; i >= 0; i--){
            if(stack[i].title){
                lastTitle = stack[i].title;
                break;
            }
        }
        document.title = lastTitle;
        return this;
    },
    setTitle : function(text){
        window.document.title = title = text;
    },

    //#############################################################################
    checkClose : function(func){
        if(typeof func === 'function'){
            closeCheckList.push(func)
        }
    }
}

module.exports = api;