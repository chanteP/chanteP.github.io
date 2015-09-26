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
import history from 'np-history'

var stack = [];
var title = window.document.title;


var findTitle = () => {
    var lastTitle = title;
    for(var i = stack.length - 1; i >= 0; i--){
        if(stack[i].title){
            lastTitle = stack[i].title;
            break;
        }
    }
    document.title = lastTitle;
}
var pushState = (href, title) => {
    history.pushState(null, title || '', href || location.pathname);
}

//temp
var popState = (e) => {
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

//##############################################################################


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
        
        pushState(cfg.href, cfg.title);

        stack.push({
            component : component,
            block : cfg.block,
            title : cfg.title,
            onBack : cfg.onBack,
            href : cfg.href
        });
        findTitle();
        return this;
    },
    get : (index) => {
        return stack[index === undefined ? stack.length - 1 : index];
    },
    pop : () => {
        stack.pop();
    },
    remove : function(component){
        stack.some((elem, index) => {
            if(elem.component === component){
                stack.splice(index, 1);
                return true;
            }
        });
        findTitle();
        return this;
    },
    setTitle : (text) => {
        window.document.title = title = text;
    }
}

export default ($) => {
    $.domReady(() => {
        // debugger
        window.addEventListener('popstate', popState);
        // history.onback(popState);
    });
    return {
        componentHandler : api
    };
};