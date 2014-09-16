;(function($){
    $.id        = function(id){
        return document.getElementById(id);
    }
    $.find      = function(selector, dom){
        return (dom || document).querySelector(selector);
    }
    $.findAll   = function(selector, dom){
        return (dom || document).querySelectorAll(selector);
    }
    $.contains  = function(root, el){
        if(root == el){return true;}
        return !!(root.compareDocumentPosition(el) & 16);
    }
    $.create = function(str){
        if(str[0] === '<'){
            var d = document.createElement('div');
            d.innerHTML = str;
            return d.firstChild;
        }
        else{
            return document.createElement(str);
        }
    }
    $.remove    = function(node){
        if(node.parentNode){
            node.parentNode.removeChild(node);
        }
    }
    $.evt = function(element, data){
        var obj = typeof data === 'undefined' ?
            $.ext(element).hammer(data):
            $.ext(element);
        var evt = function(type, args){
            this[type].apply(this, args);
        }
        return {
            'on' : function(){
                evt.call(obj, 'on', arguments);
                return obj;
            },
            'off' : function(evt, delegate, func){
                evt.call(obj, 'off', arguments);
                evt = obj = null;
            }
        }
    }
    $.Query = {
        'parse' : function(str, notDecode){
            var rs = {};
            if(typeof str != 'string'){
                return rs;
            }
            var rsArr = str.split('&'), unit, key, val;
            while(rsArr.length){
                unit = rsArr.pop().split('=');
                key = (notDecode ? unit[0] : decodeURIComponent(unit[0])).trim();
                val = unit[1] === undefined ? '' : (notDecode ? unit[1] : decodeURIComponent(unit[1])).trim();
                if(key in rs){
                    rs[key] = [rs[key]];
                    rs[key].push(val);
                }
                else{
                    rs[key] = val;
                }
            }
            return rs;
        },
        'stringify' : function(obj, notEncode){
            var rs = [], key, val;
            for(var name in obj){
                if(!obj.hasOwnProperty(name)){continue;}
                key = notEncode ? name : encodeURIComponent(name);
                val = (obj[key] === undefined || obj[key] === null) ?
                    '' :
                    notEncode ? obj[key].toString() : encodeURIComponent(obj[key].toString());
                rs.push(key + '=' + val);
            }
            return rs.join('&');
        }
    }
})(window.NPWEB_Core);
