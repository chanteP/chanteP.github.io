var $ = {}

//js ########################################################################
$.objMerger = function(needFilter, args){
    var isHold = 0, 
        resultObject, 
        currentObject,
        paramsMap;
    if(args[args.length - 1] === true){
        isHold = 1;
    }
    resultObject = isHold ? args[0] : {};
    for(var i = isHold, j = args.length - isHold; i < j; i++) {
        currentObject = args[i];
        if(typeof currentObject === 'object'){
            paramsMap = needFilter ? currentObject : args[0];
            for(var key in paramsMap){
                if(currentObject.hasOwnProperty(key)){
                    resultObject[key] = currentObject[key];
                }
            }
        }
    }
    return resultObject;
};
$.parse = function(){
    return $.objMerger(true, arguments);
};
$.merge = function(){
    return $.objMerger(false, arguments);
};

$.isEmptyObject = function(obj){
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}
$.isSimpleObject = function(obj){
    return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
}

$.unique = function(arr){
    for(var i = arr.length - 1; i >= 0; i--){
        for(var j = i - 1; j >= 0; j--){
            console.log(++i)
            if(arr[i] === arr[j]){
                arr.splice(i, 1);
                break;
            }
        }
    }
    return arr;
}

$.remove = function(node, array){
    if(array){
        var index = array.indexOf(node);
        if(index >= 0) array.splice(index, 1);
        return;
    }
    if(node.parentNode){
        return node.parentNode.removeChild(node);
    }
}

//DOM ########################################################################
$.find = function(selector, dom){
    return (dom || document).querySelector(selector);
}
$.findAll = function(selector, dom){
    return (dom || document).querySelectorAll(selector);
}
$.contains = function(root, el){
    if(root == el){return true;}
    return !!(root.compareDocumentPosition(el) & 16);
}
$.parent = function(node, selector){
    while(node.parentNode){
        if($.match(node.parentNode, selector)){
            return node.parentNode;
        }
        node = node.parentNode;
    }
    return null;
}
$.match = function(node, selector, context){
    var rs = $.findAll(selector, context);
    if(!rs){return false;}
    return [].indexOf.call(rs, node) >= 0;
}

$.evt = (function(){
    var parseArgs = function(args){
        var params = {}, arg;
        for(var i = 0, j = args.length; i < j; i++){
            arg = args[i];
            if(typeof arg === 'string' && !params.evt){
                params.evt = arg;
            }
            else if(typeof arg === 'string' && !params.selector){
                params.selector = arg;
            }
            else if(typeof arg === 'function' && !params.callback){
                params.callback = arg;
            }
            else if(typeof arg === 'boolean' && !());
        }
        params.callback = ;
        params.capture = ;
        return params;
    }
    return function(element){
        if(element._evtObject){return element._evtObject;}

        element._eventList = element._eventList || {};
        return element._evtObject = {
            'on' : function(evt, selector, callback, capture){
                if(!selector){
                    element.addEventListener(evt, callback, capture);
                }
                else{
                    var cb = function(e){
                        var target = e.target;
                        while(target && target !== element.parentNode){
                            if($.match(target, selector, element)){
                                callback.call(target, e);
                                return true;
                            }
                            target = target.parentNode;
                        }
                    }
                    element._eventList[selector] = element._eventList[selector] || [];
                    element._eventList[selector].push({
                        cb : cb,
                        func : callback
                    });
                    element.addEventListener(evt, cb, capture);
                }
                return this;
            },
            'off' : function(evt, selector, callback, capture){
                if(element._eventList[selector]){
                    element._eventList[selector].some(function(cache){
                        if(cache.func === callback){
                            element.removeEventListener(evt, cache.cb, capture);
                            return true;
                        }
                    });
                }
                return this;
            }
        }
    }
})();

module.exports = $;