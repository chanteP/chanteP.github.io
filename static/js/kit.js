(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/lib/core/core.js":[function(require,module,exports){
if(!('defineProperty' in Object)){
    alert('高级浏览器only!!!');
}
var $ = require('./kit');
window._config = require('./config');
window.DataBind = require('np-databind');
window.$ = $;
window.core = require('./spa/init');

require('./nav/init');
module.exports = $;
},{"./config":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js","./nav/init":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/nav/init.js","./spa/init":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/init.js","np-databind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/index.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js":[function(require,module,exports){
var config = {
    debug : true

    ,'expHead' : '[['
    ,'expFoot' : ']]'

    ,DOMPrefix : 'data-'
    ,initDOM : false

    ,apiHost : 'http://neetproject.sinaapp.com'

    ,isMobileMode : document.documentElement.clientWidth <= 750

};
module.exports = config;
},{}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js":[function(require,module,exports){
var $ = {};
module.exports = $;
var config = require('./config');
// require('./jquery.hammer.min');
$.isOnline = location.port != '9000' && location.port != '4000';
$.isMobileMode = config.isMobileMode;

$.objMerger = function(type, args){
    var hold = false, rsObj, curObj;
    if(args[args.length-1] === true){
        hold = true;
    }
    rsObj = hold ? args[0] : {};
    for(var i = +hold, j = args.length - hold; i<j; i++) {
        curObj = args[i];
        if(typeof curObj !== 'object'){continue;}
        for(var key in (type ? curObj : args[0])){
            if(!args[i].hasOwnProperty(key)){continue;}
            rsObj[key] = curObj[key];
        }
    };
    return rsObj;
};
$.parse = function(){
    return $.objMerger(0, arguments);
};
$.merge = function(){
    return $.objMerger(1, arguments);
};

//log################################################################### 
$.log = function(part, info, e){
    var type =  e instanceof Error ? 'error' :
                e == 'mark' ? 'debug' :
                e == 'warn' ? 'warn' :
                e == 'info' ? 'info' :
                'log';
    var msg = '[' + part + ']@ ' + Date.now() + ' : ' + info + '\n' + (type == 'error' ? '('+(e.stack || e.message)+')' : '');
    config.debug && $.log.list.push(msg);
    config.debug && console && console[type](msg);
    return msg;
};
$.log.list = [];

$.isEmptyObject = function(obj){
    for(var key in obj){
        if(!obj.hasOwnProperty(key)){continue;}
        return false;
    }
    return true;
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
$.parent    = function(node, selector){
    while(node.parentNode){
        if($.match(node.parentNode, selector)){
            return node.parentNode;
        }
        node = node.parentNode;
    }
    return null;
}
$.create = function(str){
    str = str.trim();
    if(str.slice(0, 1) === '<'){
        var template = document.createElement(str.slice(0, 3) === '<tr' ? 'tbody' : 'template');
        template.innerHTML = str;
        return template.content ? template.content.firstChild : template.firstElementChild;
    }
    else{
        return document.createElement(str);
    }
}
$.unique    = function(arr){
    for(var i = arr.length - 1; i >= 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(arr[i] === arr[j]){
                arr.splice(i, 1);
                break;
            }
        }
    }
    return arr;
}
$.remove    = function(node, array){
    if(array){
        var index = array.indexOf(node);
        if(index >= 0) array.splice(index, 1);
        return;
    }
    if(node.parentNode){
        return node.parentNode.removeChild(node);
    }
}
$.evt = function(element, data){
    element._eventList = element._eventList || {};
    return {
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
$.match = function(node, selector, context){
    context = context || document;
    return [].indexOf.call(context.querySelectorAll(selector) || [], node) >= 0;
}
$.io = {
    get : function(url, cfg){
        cfg = cfg || {};
        var xhr = new window.XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = cfg.type || 'json';
        xhr.onload = function(){
            cfg.onSuccess(this.response);
        }
        xhr.onerror = function(){
            cfg.onError(this.response);
        }
        xhr.send();
    }
}

$.query = {
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
//top顺序，vertical
$.lazyload = function(wrapper, node, attr, callback){
    wrapper = wrapper || document.body;
    var hasLazyLoad = node.hasBindLazyLoad;
    node.hasBindLazyLoad = attr;
    var checkTimer;
    var lazyload = function(el, src){
        el.setAttribute('lazy-loading', '1');
        var img = new Image();
        img.onload = function(){
            el.src = this.src;
            el.removeAttribute('lazy-loading');
        }
        setTimeout(function(){
            img.src = src;
            callback && callback(el);
        }, 400);
    }
    var timerCheck = function(){
        clearTimeout(checkTimer);
        checkTimer = setTimeout(check, 50);
    }
    var check = function(){
        var list = $.findAll('['+attr+']', node);
        var docHeight = document.documentElement.clientHeight;
        [].every.call(list, function(el){
            var bd = el.getBoundingClientRect();
            if(bd.top + el.clientHeight < 0){
                return true;
            }
            else if(bd.top < docHeight){
                lazyload(el, el.getAttribute(attr));
                el.removeAttribute(attr);
                return true;
            }
            else{
                return false;
            }
        });
    }
    check();
    !hasLazyLoad && wrapper.addEventListener('scroll', timerCheck);  
}

$.iLoad = function(url, onsucc, onerr){
    var i = document.createElement('iframe');
    i.style.cssText = 'height:0;width:0;border:0;overflow:hidden;display:none;';
    i.onload = function(){
        // try{
            if(!this.contentWindow.document.title && !this.contentWindow.fin){
                onerr && onerr();
            }
            else{
                onsucc && onsucc(i);
            }
        // }catch(e){
            // onsucc && onsucc(i);
        // }
        // $.remove(i);
    }
    i.src = url;
    document.body.appendChild(i);
}

$.touch = require('./touch.kit');
$.tween = require('./tween');

$.scrollTo = function(pos, wrap){
    wrap = wrap || document.body;
    if(wrap.isScrolling){wrap.isScrolling.stop();}
    return wrap.isScrolling = $.tween({
        'begin': wrap.scrollTop,
        'end'  : pos,
        'duration' : 300,
        'func' : function(num){
            wrap.scrollTop = num;
        },
        'endfunc' : function(){
            delete wrap.isScrolling;
        }
    });
}

},{"./config":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js","./touch.kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/touch.kit.js","./tween":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/tween.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/nav/init.js":[function(require,module,exports){
var nav;
var $ = require('../kit');

document.addEventListener('DOMContentLoaded', function(){
    nav = $.find('#mainnav');

    nav.set = function(page){
        var cur = $.find('.cur', nav);
        var to = $.find('[data-for="'+page+'"]', nav);
        cur && cur.classList.remove('cur');
        to && to.classList.add('cur');
        to && (to.dataset.hide ? this.hide() : this.show());
    }
    nav.show = function(){
        nav.classList.add('show');
    }
    nav.hide = function(){
        nav.classList.remove('show');
    }
});

},{"../kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/init.js":[function(require,module,exports){

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

},{"../kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js","./loader":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/loader.js","./url":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/url.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/loader.js":[function(require,module,exports){
var pageGrep = /^(?:.*\:\/\/[^\/]+)?\/([^\/#\?\.]*)/;
var $ = require('../kit');
var wrapperID = '#wrapper';
var cur, loadTimer;

var url2Page = function(url){
    var rs = pageGrep.exec(url);
    return rs && rs[1] ? rs[1] : 'index';
}
var navRel = function(page){
    $.find('#mainnav').set(page);
}

var pageStorage = {};
var PageModule = function(page, dom){
    if(pageStorage[page]){
        if(dom && !pageStorage[page].node){
            pageStorage[page].node = dom;
        }
        return pageStorage[page];
    }
    pageStorage[page] = this;
    this.page = page;
    this.node = dom;
    if(!dom){
        this.build();
    }
}

PageModule.prototype = {
    LOADING : 0,
    READY : 2,
    INIT : 3,
    SHOW : 4,
    HIDE : 5,

    status : 0,

    page : null,
    dom : null,

    build : function(){
        var self = this;
        this.status = this.LOADING;
        $.iLoad('/pages/' + this.page + ($.isOnline ? '' : '.html'), null, function(){
            window.history.go(-1);
        });
    },
    setLoading : function(bool){
        // $.find(wrapperID).innerHTML = '';
        document.body.classList[bool ? 'add' : 'remove']('loading');
    },
    switchOn : function(){
        navRel(this.page);
        this.status < this.INIT && this.fetchCallback('init');
        $.find(wrapperID).innerHTML = '';
        $.find(wrapperID).appendChild(this.node);
        this.fetchCallback('show');
        return true;
    },
    switchOff : function(){
        this.fetchCallback('hide');
        return true;
    },
    fetchCallback : function(type){
        try{
            this.callback && this.callback[type] && this.callback[type]();
        }
        catch(e){
        }
        this.status = this[type.toUpperCase()] || 10;
    }
}

var api = {
    load : function(url){
        var page = url2Page(url), mod = new PageModule(page);
        if(page === url2Page(location.href) && mod === cur){return;}
        mod.setLoading(true);
        if(mod.status > mod.LOADING){
            clearTimeout(loadTimer);
            loadTimer = setTimeout(function(){
                cur && cur.switchOff();
                mod.switchOn()
                mod.setLoading(false);
                cur = mod;
            }, 400);
        }
    },
    init : function(page, dom, callback, inFrame){
        var mod = new PageModule(page, dom);
        mod.status = mod.READY;
        try{
            mod.callback = callback(dom, $, window);
        }catch(e){
            $.log('spa.loader', e.message, 'error')
        }
    }
}
module.exports = api;

},{"../kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/url.js":[function(require,module,exports){

var state = window.history;
var evtList = [];

var runList = function(dir, url){
    evtList.forEach(function(func){
        func(url, dir);
    });
};
window.addEventListener('popstate', function(){
    runList(-1);
});
module.exports = {
    set : function(url, title, data, real){
        if(url !== location.pathname)
            state.pushState(data, title, url);
        runList(1, url);
    },
    on : function(func){
        evtList.push(func);
    }
};
},{}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/touch.kit.js":[function(require,module,exports){
var $ = require('./kit');
if(!document){return;}
var func = {
    'enter' : function(e){
        $.touch = e.touches.length;
    },
    'leave' : function(e){
        $.touch = e.touches.length;
    },
    'down' : function(){
        $.touch = true;
    },
    'up' : function(){
        $.touch = false;
    }
}
if('ontouchstart' in window){
    document.addEventListener('touchstart', func.enter);
    document.addEventListener('touchend', func.leave);
}
else{
    document.addEventListener('mousedown', func.down, 1);
    document.addEventListener('mouseup', func.up, 1);
}
module.exports = 0;
},{"./kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/tween.js":[function(require,module,exports){
var $ = require('./kit');
//就污染window了怎么了？
window.requestAnimationFrame = null
    || window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(callback) {setTimeout(callback, 1000 / 60);};
	//raf优化算法
var tweenAniAnchor = function(opts){
    opts = $.parse({
        'type' : 'cubic-easein',
        'begin': 0,
        'end'  : 0,
        'duration' : 600,
        'extra' : undefined,
        'func' : function(){},
        'fps' : 60,
        'endfunc' : function(){}
    },opts);
    var spf = 1000 / opts.fps;
    var duration = opts.duration;
    var step = duration / Math.round(spf);
    var tweenTRS = tweenT(opts.type, opts.begin, opts.end, step, opts.extra);
    var startTimer = Date.now(), distance;
    var controll;
    requestAnimationFrame(function(){
    	if(controll){return;}
    	distance = Date.now() - startTimer;
    	if(distance >= duration){
    		opts.func(opts.end);
    		opts.endfunc();
    		return;
    	}
    	opts.func(tweenTRS(Math.round(distance / spf)));
    	requestAnimationFrame(arguments.callee);
    });
    return {
    	'stop' : function(){
			controll = true;
    	}
    };
};
//指定t输出数值
var tweenT = function(type, begin, end, duration, extra){
    b = Math.min(begin, end);
    c = Math.max(begin, end);
    return function(t){
        if(t > duration){return end;}
        return begin > end ? 
        	c - tween[type].apply(null, [t, 0, c-b, duration].concat(extra)): 
        	b + tween[type].apply(null, [t, 0, c-b, duration].concat(extra));
    }
};
var tween = (function(){
	var rs = {};
	var type = {
		'linear' : function(t, b, c, d) {
			return c * t / d + b;
		},
		'quad' : {
			easeIn : function(t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut : function(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		'cubic' : {
			easeIn : function(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut : function(t, b, c, d) {
				return c * (( t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		'quart' : {
			easeIn : function(t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut : function(t, b, c, d) {
				return -c * (( t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		'quint' : {
			easeIn : function(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut : function(t, b, c, d) {
				return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		'sine' : {
			easeIn : function(t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut : function(t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut : function(t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		'expo' : {
			easeIn : function(t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut : function(t, b, c, d) {
				return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut : function(t, b, c, d) {
				if (t == 0)
					return b;
				if (t == d)
					return b + c;
				if ((t /= d / 2) < 1)
					return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		'circ' : {
			easeIn : function(t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut : function(t, b, c, d) {
				return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		'elastic' : {
			easeIn : function(t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut : function(t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut : function(t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d / 2) == 2)
					return b + c;
				if (!p)
					p = d * (.3 * 1.5);
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				if (t < 1)
					return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		},
		'back' : {
			easeIn : function(t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut : function(t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut : function(t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				if ((t /= d / 2) < 1)
					return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		'bounce' : {
			easeIn : function(t, b, c, d) {
				return c - type.bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut : function(t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut : function(t, b, c, d) {
				if (t < d / 2)
					return type.bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				else
					return type.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		}
	};
	for(var key in type){
		if(typeof type[key] === 'function'){
			rs[key] = type[key];
		}
		else{
			for(var style in type[key]){
				rs[key + '-' + style.toLowerCase()] = type[key][style];
			}
		}
	}
	return rs;
})();
module.exports = tweenAniAnchor;

},{"./kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Accessor.js":[function(require,module,exports){
/*
    存在collection里的每一个单元
    存了都会进行单向绑定
    DataBind.storage一览
*/
//################################################################################################
/*
    new 构造
    func 判断
*/
var Accessor = function(nameNS, value){
    if(arguments.length === 1){
        if(!Accessor.storage.hasOwnProperty(nameNS)){return undefined;}
        return Accessor.storage[nameNS];
    }
    else if(nameNS in Accessor.storage){
        Accessor.storage[nameNS].value = value;
        return Accessor.storage[nameNS];
    }
    if(!(this instanceof Accessor)){
        return new Accessor(nameNS, value);
    }
    var props = nameNS.split('.'), 
        name = props.pop(),
        isTop = nameNS === '',
        parentNS = isTop ? null : props.join('.'),
        parentAcc = isTop ? null : Accessor(parentNS),
        parent = isTop ? null : parentAcc.value;

    this.name       = name;
    this.nameNS     = nameNS;
    this.parent     = parent;
    this.parentNS   = parentNS;
    this.parentAcc  = parentAcc;


    this.deps       = [];
    this.value      = value;
    this.oldValue   = value;
    this.dirty      = false;

    // this.list    = {};
    this.mode       = config.mode;
    this.status     = this.READY;

    this.context    = this.mode ? this : this.parent;

    this.children   = [];
    this.propagation = config.propagation;
    this.propagationType = [].concat(config.propagationType);

    if(!isTop){
        parentAcc.children.push(this.nameNS);
        this.parent[this.name] = this.value;
    }
    Accessor.storage[this.nameNS] = this;
}
Accessor.storage = {};
//ready > inited   
//build > setValue  
Accessor.prototype.READY = 0;
Accessor.prototype.INITED = 1;


Accessor.parseProp = function(prop, context){
    if(!prop){return context;}
    return context ? context + '.' + prop : prop;
}
Accessor.prototype.get = function(){
    return this.value;
}
Accessor.prototype.set = function(value, dirty, force){
    var self = this;
    this.value = value;
    this.value = this.get();

    if(this.parent && config.mode){
        this.parent[this.name] = value;
    }
    //children
    dirty = this.dirty || dirty;
    if(!dirty){
        listener.fire(this.nameNS, 'set');
        (force || value !== this.oldValue) && listener.fire(this.nameNS, 'change');
    }
    this.oldValue = value;
    this.dirty = false;

    if(Array.isArray(value)){
        var arrayChangeLock = false;
        //TODO 好挫！！！
        if('observe' in Object){
            Object.observe(value, function(changes){
                if(arrayChangeLock){return;}
                arrayChangeLock = true;
                self.set(value, self.dirty, true);
            });
        }
        else{
            value.__proto__ = ArrayExtend;
            value[ArrayExtend.bindMethodName] = function(){
                self.set(value, self.dirty, true);
            }
        }
    }
    //TODO 其实楼上也要！mode才绑定，等实现set数组元素再说...
    else if(!config.mode && $.isSimpleObject(value)){
        for(var key in value){
            if(!value.hasOwnProperty(key)){continue;}
            childAcc = Accessor(this.parseProp(key));
            childAcc && childAcc.bindProp();
        }
    }
    return value;
}
//mode=0 defineproperty绑定对象属性用
Accessor.prototype.bindProp = function(){
    if(this.mode || !$.isSimpleObject(this.parent)){return;}
    var value = this.value, self = this;
    Object.defineProperty(this.parent, this.name, {
        set : function(value){
            return self.set(value);
        },
        get : function(){
            return self.get();
        }
    });
    this.parent[this.name] = value;
}
Accessor.prototype.parseProp = function(prop){
    if(!prop){return this.nameNS;}
    return this.nameNS ? this.nameNS + '.' + prop : prop;
}
Accessor.destroy = Accessor.prototype.destroy = function(nameNS){
    var acc = this instanceof Accessor ? this : Accessor(nameNS);
    if(acc){
        acc.children.forEach(Accessor.destroy);
        delete acc.parent[acc.name];
        delete Accessor.storage[acc.nameNS];
    }
}
//################################################################################################
module.exports = Accessor;
var $ = require('./kit');
var config = require('./config');
var listener = require('./Observer');
var ArrayExtend = require('./ArrayExtend');

},{"./ArrayExtend":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/ArrayExtend.js","./Observer":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Observer.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/ArrayExtend.js":[function(require,module,exports){
/*
    扩展数组
    进行某些操作之后执行ArrayExtendObserveMethod
*/
var ArrayExtend = {}, 
    ArrayExtendProto = Array.prototype, 
    ArrayExtendObserveMethod = 'arrayExtOb',
    ArrayExtendMethod = 'pop, push, shift, unshift, reverse, sort, splice'.split(', ');
Object.defineProperty(ArrayExtend, ArrayExtendObserveMethod, {
    writable : true,
    enumerable : false
});
ArrayExtendMethod.forEach(function(methodName){
    ArrayExtend[methodName] = function(){
        var args = [].map.call(arguments, function(arg){return arg});
        ArrayExtendProto[methodName].apply(this, args);
        this[ArrayExtendObserveMethod]();
    }
});
ArrayExtend.bindMethodName = ArrayExtendObserveMethod;
ArrayExtend.__proto__ = ArrayExtendProto;
module.exports = ArrayExtend;
},{}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DataBind.js":[function(require,module,exports){
/*
    mode ? accessor : defineProp
    var db = new DataBind('prop1.prop2', {
        a: {
            $get: func
            $set: func
            $value: value
        }
    });
    accessor :
        db.set('a', 1);
        db.observe('a', func, 'change');
    defineProp :
        db.a = 1;
        DataBind.observe('')
    propagation : 
*/
var $ = require('./kit');
var config = require('./config');
var Accessor = require('./Accessor');
var listener = require('./Observer');

var root = {};
//################################################################################################################
var isEmptyObject = $.isEmptyObject;
var merge = $.merge;
//################################################################################################################
var main = {
    'parseNS' : function(name, propNS){
        propNS = propNS || '';
        return name + (name !== undefined && name !== '' && propNS !== '' ? '.' : '') + propNS;
    },
    //get function deps
    'parseDeps' : function(base, func){
        var code = func.toString()
            .replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg, '')
            .replace(/^\s*\/\/.*$/mg, '')
            .replace(/(this|vm)\.[\w\.]+(\(|\s*\=)/mg, '')
            .replace(/\bthis\b/g, 'vm.' + base.parentNS);

        var contextReg = /\bvm\.([\w|\.]+)\b/g;
        var deps = [], match;
        while ((match = contextReg.exec(code))) {
            if (match[1]) {
                deps.push(match[1]);
            }
        }
        base.deps = deps;
        deps.forEach(function(dep){
            listener.add(dep, base.nameNS, 'change');
        });
    },
    'configAcc' : function(acc, cfg){
        if(!cfg || acc.nameNS.indexOf(cfg.nameNS) < 0){return;}
        if(cfg.context){
            acc.context = cfg.context;
        }
    },
    'descList' : ['get', 'set', 'change', 'propagation', 'dirty', 'value'],
    'getDesc' : function(obj){
        var desc = {}, check;
        if(!$.isSimpleObject(obj)){
            desc.value = obj;
        }
        else{
            main.descList.forEach(function(d){
                desc[d] = obj['$' + d];
                if(delete obj['$' + d]){
                    check = true;
                }
            });
            if(desc['value'] === undefined){
                desc['value'] = check && isEmptyObject(obj) ? undefined : obj;
            }
        }
        return desc;
    },
    'defProp' : function(desc, base){
        if(desc.set){
            base.set = function(value, dirty, force){
                value = desc.set.call(base.context, value, base.value, force);
                base.__proto__.set.call(base, value, dirty, force);
                return value;
            }
        }
        if(desc.get){
            main.parseDeps(base, desc.get);
            base.get = function(){
                return desc.get.call(base.parent, root);
            }
        }
        if(desc.change){
            listener.add(base.nameNS, desc.change, 'change');
        }
        if(desc.dirty){
            base.dirty = !!desc.dirty;
        }
        if(desc.propagation){
            base.propagation = !!propagation;
        }
        //TODO dirty用意
        if(!base.dirty){
            base.set(base.value);
        }
    },
    'register' : function(obj, baseNS, cfg){
        var desc = main.getDesc(obj), base;
        obj = desc.value;
        base = Accessor(baseNS) || new Accessor(baseNS, obj);
        main.configAcc(base, cfg);
        if($.isSimpleObject(obj)){
            for(var key in obj){
                if(!obj.hasOwnProperty(key)){continue;}
                main.register(obj[key], base.parseProp(key), cfg);
            }
        }
        base.nameNS && main.defProp(desc, base);
        !base.mode && base.bindProp();
    }
}

//################################################################################################################
var expApi = {}, expApiList;
var DataBind = function(nameNS, obj, cfg){
    var ns = nameNS.split('.'), root, cur = obj;
    cfg = cfg || {};
    cfg.nameNS = nameNS;
    if(nameNS === ''){
        ns.length = 0;
        root = obj;
    }
    while(ns.length){
        root = {};
        root[ns.pop()] = cur;
        cur = root;
    }
    main.register(root, '', cfg);
    this.name = this._name = nameNS;

    //TODO 改输出就是麻烦...
    if(!config.mode){
        var acc = Accessor(nameNS),
            exports = acc.value;
        if(exports === null || exports === undefined){
            exports = {};
        }
        exports.__proto__ = Object.create(expApi, {'_name':{'value' : nameNS}});
        return exports;
    }
};
DataBind.root           = root;
DataBind.storage        = Accessor.storage;

DataBind.observe        = listener.add;
DataBind.unobserve      = listener.remove;
DataBind.fire           = listener.fire;

DataBind.destroy        = Accessor.destroy;

DataBind.setPropagation = function(nameNS, bool, type){
    var check = DataBind.check(nameNS);
    if(check){
        typeof bool === 'boolean' && (check.propagation = bool);
        Array.isArray(type) && (check.propagationType = type);
    }
    return this;
};
DataBind.init           = function(){
    new Accessor('', DataBind.root);
    DataBind.init = function(){};
    return DataBind;
}
DataBind.parseProp      = Accessor.parseProp;
DataBind.check          = function(nameNS){
    return Accessor(nameNS);
}
DataBind.checkListener  = function(nameNS, type){
    return listener.check(nameNS, type);
}
DataBind.get            = function(nameNS){
    var index, value;
    if(index = /(.*)\[(\d+)\]$/.exec(nameNS)){
        nameNS = index[1];
        index = index[2];
    }
    value = Accessor(nameNS) ? Accessor(nameNS).get() : undefined;
    if(index !== null && Array.isArray(value)){
        return value[index];
    }
    return value;
};
DataBind.set            = function(nameNS, value, dirty){
    Accessor(nameNS) && Accessor(nameNS).set(value, dirty);
    return value;
};
DataBind.config         = config.set;
DataBind.prototype.get  = function(propNS){
    return DataBind.get(main.parseNS(this._name, propNS));
}
DataBind.prototype.set  = function(propNS, value, dirty){
    return DataBind.set(main.parseNS(this._name, propNS), value, dirty);
}
DataBind.prototype.setPropagation = function(bool, type){
    return DataBind.setPropagation(main.parseNS(this._name, propNS), bool, type);
};
DataBind.prototype.checkListener = function(propNS, type){
    return DataBind.checkListener(main.parseNS(this._name, propNS), type);
};
DataBind.prototype.observe = function(propNS, func, evt){
    return DataBind.observe(main.parseNS(this._name, propNS), func, evt);
};
DataBind.prototype.unobserve = function(propNS, func, evt){
    return DataBind.unobserve(main.parseNS(this._name, propNS), func, evt);
};
DataBind.prototype.fire = function(propNS, evt, args){
    return DataBind.fire(main.parseNS(this._name, propNS), evt, args);
};
DataBind.prototype.destroy = function(deep){
    DataBind.destroy(this._name);        
};
if('defineProperty' in Object){
    for(var api in DataBind.prototype){
        if(!DataBind.prototype.hasOwnProperty(api)){continue;}
        Object.defineProperty(expApi, api, {'enumerable':false, 'writable':true});
        expApi[api] = DataBind.prototype[api];
    }
}
module.exports = DataBind;
},{"./Accessor":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Accessor.js","./Observer":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Observer.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DomExtend.js":[function(require,module,exports){
/*
    dom绑定用外挂包

    好长。。。该拆分了
*/
var DataBind = require('./DataBind');
var expression = DataBind.expression;
// var expression = require('./Expression');
// var expression = require('./Expression.artTemplate.js');
var config = require('./config');

var $ = require('./kit');

//exp /{{(.*)}}/
var expPreg = new RegExp(config.expHead.replace(/([\[\(\|])/g, '\\$1') + '(.*?)' + config.expFoot.replace(/([\[\(\|])/g, '\\$1'), 'm');
var prefix = config.DOMPrefix;
var marker = {
    'model' : prefix + 'model',//v to m
    'list' : prefix + 'list',//list: tr in table
    'bind' : prefix + 'bind',//scope源
    'escape' : prefix + 'escape',//scan外
    'toggle' : prefix + 'toggle',
    'extraData' : prefix + 'extraExpData' //传给expression的额外数据
}
var indexPreg = /\[(\d+)\]$/;
var listPreg = /([\w\.]+)\s+in\s+([\w\.]+)/;
var nodeFuncKey = 'bindObserver';
var checkProp, checkType = 'change';
var scanQueue = [];

var vm = DataBind.root,
    set = DataBind.set,
    get = DataBind.get;

var observe = DataBind.observe,
    unobserve = DataBind.unobserve,
    fire = DataBind.fire;

var parseOnlyWhileScan = false;

//################################################################################################################
var evt = $.evt,
    find = $.find,
    findAll = $.findAll,
    contains = $.contains,
    create = $.create,
    remove = $.remove,
    unique = $.unique;
//################################################################################################################
var main = {
    /*
        绑定解析model获取事件的节点
        dom to data
    */
    'bindContent' : function(node){
        var evtBody = node || document.body;
        evt(evtBody)
            //TODO 绑定太简陋?
            //radio checkbox etc...
            .on('change', [
                    'input['+marker.model+']',
                    'select['+marker.model+']'
                ].join(','), 
                bind.model)
            //text etc...
            .on('input', [
                    'input['+marker.model+']',
                    'textarea['+marker.model+']'
                ].join(','),
                bind.model);
    },
    /*
        解析节点
        dom绑定解析&纯模版化解析
    */
    'scan' : function(node, parseOnly){
        if(parseOnly){
            parseOnlyWhileScan = parseOnly;
        }
        if(checkProp){
            scanQueue.push(node);
            return;
        }
        checkProp = {};
        main.parseNode(node || document.body);
        var value;
        for(var prop in checkProp){
            value = get(prop);
            checkProp[prop].forEach(function(func){
                //TODO apply?
                func(value, value);
                parseOnlyWhileScan || observe(prop, func, checkType);
            });

        }
        checkProp = null;
        if(scanQueue.length){
            main.scan(scanQueue.shift());
        }
        parseOnlyWhileScan = false;
    },
    /*
        TODO 堆scope
    */
    'parseNode' : function(node, scope){
        //elementNode
        if(node.nodeType === 1){
            var html = node.outerHTML;
            //是list则放弃治疗
            if(check.list(node)){return;}
            //节点包含{{}}
            if(!expPreg.test(html)){return;}
            //解析attr
            check.attr(node, html);

            if(node.getAttribute(marker.escape)){return;}

            //解析children
            [].forEach.call(node.childNodes, main.parseNode);
        }
        //textNode
        else if(node.nodeType === 3){
            //非空而且包含{{}}
            if(!node.textContent.trim().length || !expPreg.test(node.textContent)){return;}
            bind.text(node, node.textContent);
        }
        //其他节点管来干嘛
    },
    'addScanFunc' : function(prop, func){
        if(!checkProp[prop]){
            checkProp[prop] = [];
        }
        checkProp[prop].push(func);
    }
};
var check = {
    /*
        void check attribute中是否有表达式并绑定
    */
    'attr' : function(node, html){
        [].forEach.call(node.attributes, function(attributeNode){
            if(expPreg.test(attributeNode.value)){
                bind.attr(node, attributeNode.value, attributeNode.name);
            }
        });
    },
    /*
        boolean check 是否为list，并绑定
    */
    'list' : function(node){
        var listProp;
        listProp = node.getAttribute(marker.list);
        if(typeof listProp === 'string' && (listProp = listPreg.exec(listProp))){
            node.removeAttribute(marker.list);
            listProp.shift();
            bind.list(node, listProp);
            return true;
        }
    }
}
var parse = {
    /*
        Array 解析表达式中的依赖
    */
    'deps' : function(text, context){
        var deps = [];
        if(context.indexOf('[') >= 1){
            return [context.split('[')[0]];
        }
        expressions = parse.exps(text);
        expressions.forEach(function(exp){
            deps.splice(deps.length, 0, expression.parseDeps(exp, context));
        });
        return unique(deps);
    },
    /*
        Array 分解出表达式部分
    */
    'exps' : function(text){
        var expressions = [], preg = new RegExp(expPreg.source, 'mg'), match;
        while(match = preg.exec(text)){
            expressions.push(match[1]);
        }
        return expressions;
    },
    /*
        Object extraData
    */
    'extraData' : function(node){
        if(node[marker.extraData]){
            return node[marker.extraData];
        }
        return node.parentNode ? parse.extraData(node.parentNode) : undefined;
    },
    /*
        String 根据表达式解析text
    */
    'text' : function(text, context, extra){
        var extra, rs, value = get(context);
        return text.replace(new RegExp(expPreg.source, 'mg'), function(t, match){
            return expression(match, value, vm, extra);
        });
    },
    //TODO cache context in node
    //TODO cascade
    /*
        String 获取节点绑定的context scope
    */
    'context' : function(node){
        if(node[marker.bind]){
            return node[marker.bind];
        }
        if(node.getAttribute && node.getAttribute(marker.bind)){
            return node.getAttribute(marker.bind);
        }
        return node.parentNode ? parse.context(node.parentNode) : '';
    }
};
//data to dom
var bind = {
    'model' : function(e){
        var type = this.type, name = this.name, tagName = this.tagName.toLowerCase();
        var model = this.getAttribute(marker.model), context = parse.context(this);
        var value = '', form = this.form || document.body, rs;
        this[marker.bind] = context;

        model = DataBind.parseProp(model, context);
        if(!DataBind.check(model)){
            new DataBind(model);
        }

        if(name && tagName === 'input'){
            switch (type){
                case 'checkbox' : 
                    rs = findAll('[name="'+name+'"]:checked', form);
                    value = [];
                    rs && [].forEach.call(rs, function(el){
                        value.push(el.value);
                    });
                    value = value.join(',');
                    break;
                case 'radio' : 
                    rs = find('[name="'+name+'"]:checked', form);
                    value = rs ? rs.value : '';
                    break;
                default : 
                    value = this.value;
                    break;
            }
        }
        else{
            value = this.value;
        }
        if(!isNaN(value)){
            value = +value;
        }
        set(model, value);
    },
    'list' : function(node, propGroup){
        var template = node.outerHTML;
        var context = parse.context(node);
        node[marker.bind] = context;

        var writeProp = propGroup[0],
            useProp = propGroup[1];

        //list: tr to table 替换
        var templateFunc = function(template, index, writeProp, useProp){
            var listExpPreg = new RegExp(expPreg.source, 'mg'),
                fieldPreg = new RegExp('(?:\\s|\\b)('+writeProp+'\\.)', 'mg');
            return template.replace(listExpPreg, function(match, exp){
                return match.replace(fieldPreg, function(match, matchContext){
                    return ' ' + useProp + '['+index+'].';
                });
            });
        }

        var prop = (context ? context + '.' + useProp : useProp);

        //TODO 备用标注
        var listMarkEnd = document.createComment('list for ' + useProp + ' as ' + writeProp + 'end'),
            listMarkStart = document.createComment('list for ' + useProp + ' as ' + writeProp + 'start'),
            listNodeCollection = [];

        node.parentNode.insertBefore(listMarkStart, node);
        node.parentNode.replaceChild(listMarkEnd, node);
        main.addScanFunc(prop, function(v, ov, e){
            if(!listMarkEnd.parentNode){return;}
            var list = get(prop);
            if(!(Array.isArray(list))){return;}
            var content = listMarkEnd.parentNode;
            //TODO 增强array功能后这里就不用全部删了再加了
            [].forEach.call(listNodeCollection, function(element){
                remove(element);
            });
            list.forEach(function(dataElement, index){
                var element = create(templateFunc(template, index, writeProp, useProp));
                element[marker.extraData] = {
                    index : index,
                    value : dataElement
                };
                // var scope = Object.create(dataElement, {index:{value:index}});
                // element.setAttribute(marker.bind, prop + '['+index+']');
                // element[marker.bind] = prop + '['+index+']';
                content.insertBefore(element, listMarkEnd);
                listNodeCollection.push(element);
                main.scan(element);
            });
        });
    },
    //node attribute
    'attr' : function(node, attrText, attrName){
        var context = parse.context(node), deps = parse.deps(attrText, context), func;
        node[marker.bind] = context;
        var extraData = parse.extraData(node);

        switch (attrName){
            case 'checked' : 
                var checkValue = node.value;
                func = node.type === 'checkbox' ? 
                function(value){
            //TODO if(!node.parentNode){}
                    node.checked = (value || '').split(',').indexOf(checkValue) >= 0;
                } : 
                function(value){
            //TODO if(!node.parentNode){}
                    node.checked = value === checkValue;
                };
                break;
            case 'selected' : 
                var checkValue = node.value;
                func = function(value){
            //TODO if(!node.parentNode){}
                    node.selected = value === checkValue;
                };
                break;
            case 'value' : 
                func = function(){
            //TODO if(!node.parentNode){}
                    node.value = parse.text(attrText, context, extraData);
                }
                break;
            case 'data-src' : 
                func = function(){
            //TODO if(!node.parentNode){}
                    node.src = parse.text(attrText, context, extraData);
                }
                break;
            default : 
                func = function(){
            //TODO if(!node.parentNode){}
                    value = parse.text(attrText, context, extraData);
                    if(value === 'null' || value === 'undefined'){
                        node.removeAttribute(attrName);
                    }
                    else{
                        node.setAttribute(attrName, value);
                    }
                }
                break;
        }
        deps.forEach(function(prop){
            main.addScanFunc(prop, func);
        });
    },
    //textNode
    'text' : function(node, textContent){
        var context = parse.context(node), deps = parse.deps(textContent, context), func;
        node[marker.bind] = context;
        var exchangeNode = node;
        var extraData = parse.extraData(node);
        func = function(v, ov, e){
            if(e && !contains(document.documentElement, node)){
                unobserve(e.nameNS, func, checkType);
                return;
            }
            if(v instanceof Node){exchangeNode = bind.element(exchangeNode, v);}
            else if(ov instanceof Node){exchangeNode = bind.element(exchangeNode, node);}
            node.textContent = parse.text(textContent, context, extraData);
        }
        deps.forEach(function(prop){
            main.addScanFunc(prop, func);
        });
    },
    'element' : function(oldElement, newElement){
        if(!oldElement.parentNode){return oldElement;}
        oldElement.parentNode.replaceChild(newElement, oldElement);
        DataBind.scan(newElement);
        return newElement;
    }
}
//################################################################################################################
DataBind.scan = main.scan;
DataBind.bindContent = main.bindContent;
//################################################################################################################
window.document.addEventListener('DOMContentLoaded', function(){
    if(!config.initDOM){return;}
    main.bindContent(document.body);
    if(config.initDOM !== 1) main.scan(document.documentElement);
});



},{"./DataBind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DataBind.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Expression.artTemplate.js":[function(require,module,exports){
/*
    表达式解析外挂包
    expression('a.b.c', {a:xxx}, vm， extraData)
    整个文件跟{{}}没关系啦
*/
var DataBind = require('./DataBind');
var $ = require('./kit');
var config = require('./config');

// var artTemplate = window.template = require('art-template');
//....默认打上debug...只能。。
var artTemplate = window.template = require('../node_modules/art-template/dist/template.js');
var filters = require('./Filter');
var merge = $.merge;

var rootVar = config.rootVar, rootVarLen = String(rootVar).length;

//################################################################################################################
var log = $.log;
var get = DataBind.get;
//################################################################################################################
var parseDeps = function(expressionText, context){
    var expression = getExpressionPart(expressionText);
    var reg = /(?=\b|\.|\[)(?!\'|\")([\w\.\[\]]+)(?!\'|\")\b/g, expressionBody;
    var match, col = [], temp;
    while(match = reg.exec(expression)){
        if(match[1].indexOf('[') === 0){continue;}
        temp = match[1].indexOf('[') ? match[1].split('[')[0] : match[1];
        if(temp.slice(0, rootVarLen - 1) === rootVar + '.'){}
        else if(temp.slice(0, 1) === '.'){continue;}
        else{temp = (context ? context + '.' : '') + temp;}
        col.push(temp);
    }
    return col;
}
var getExpressionPart = function(expressionText){
    return expressionText.split(/\|{1,1}/)[0].trim();
}
for(var helperName in filters){
    if(!filters.hasOwnProperty(helperName)){continue;}
    artTemplate.helper(helperName, filters[helperName]);
}
//################################################################################################################
var expression = function(expressionText, scope, rootScope, extraData){
    if(expressionText === undefined){return '';}
    expressionText = '{{' + expressionText + '}}';
    var rs, root = {};
    root[rootVar] = rootScope;
    rs = artTemplate.render(expressionText)(merge(
        scope,
        root,
        {$:extraData}
    ));
    return rs;
}
//################################################################################################################
DataBind.expression = expression;
DataBind.expression.parseDeps = parseDeps;
DataBind.expression.register = artTemplate.helper;

//################################################################################################################
module.exports = expression;


},{"../node_modules/art-template/dist/template.js":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/dist/template.js","./DataBind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DataBind.js","./Filter":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Filter.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Filter.js":[function(require,module,exports){
/*
    liquid式预设helper外挂包
*/
var def = function(rs, defaultValue){
    return rs === undefined ? defaultValue : rs;
}
module.exports = {
    // date -时间格式化| date:'yyyy-MM-dd hh:mm:ss'
    date : function (date, format) {
        date = new Date(date);
        if(!format){
            return date.valueOf();
        }
        var map = {
            "M": date.getMonth() + 1, //月份 
            "d": date.getDate(), //日 
            "h": date.getHours(), //小时 
            "m": date.getMinutes(), //分 
            "s": date.getSeconds(), //秒 
            "q": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    },
    // capitalize-设置输入中的某个单词*
    // downcase-将输入的字符串转换为小写*
    // upcase-将输入的字符串转换为大写
    // first-获得传入的数组的第一个元素
    first : function(arr){
        return arr[0];
    },
    // last-获得传入的数组的最后一个元素
    last : function(arr){
        return arr[arr.length?arr.length-1:0];
    },
    // join-用数组的分隔符连接数组中的元素
    join : function(arr, joinMark){
        return arr.join(joinMark);
    },
    // sort-数组中的元素排序
    sort : function(arr, dir){
        return arr.sort(function(a, b){return dir ? a > b : b > a;});
    },
    // map-通过指定的属性过滤数组中的元素
    map : function(arr, json){
        json = JSON.parse(json);
        if(Array.isArray(arr)){
            return arr.map(function(element){
                return json[element];
            });
        }
        else if(typeof arr === 'string'){
            return json[arr];
        }
        return arr;
    },
    // size-返回一个数组或字符串的大小
    // escape-转义一个字符串
    // escape_once-返回HTML的转义版本，而不会影响现有的实体转义
    // strip_html-从字符串去除HTML
    strip_html : function(str){
        // return str.replace()
        return str;
    },
    // strip_newlines -从字符串中去除所有换行符（\ n）的
    // newline_to_br-用HTML标记替换每个换行符（\ n）
    // replace-替换，例如：{{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'
    replace : function(str, match, replace){
        return str.replace(new RegExp(match, 'g'), replace);
    },
    // replace_first-替换第一个，例如： '{{barbar' | replace_first:'bar','foo' }} #=> 'foobar'
    // remove-删除，例如：{{'foobarfoobar' | remove:'foo' }} #=> 'barbar'
    // remove_first-删除第一个，例如：{{ 'barbar' | remove_first:'bar' }} #=> 'bar'
    // truncate-截取字符串到第x个字符
    truncate : function(str, length){
        return str.slice(0, length);
    },
    // slice-截取字符串第x个到第x个字符
    slice : function(str, fromIndex, toIndex){
        return str.slice(fromIndex, def(toIndex, undefined));
    },
    // truncatewords-截取字符串到第x个词
    // prepend-前置添加字符串，例如：{{ 'bar' | prepend:'foo' }} #=> 'foobar'
    prepend : function(str, appendString){
        return def(prependString, '...') + str;
    },
    // append-后置追加字符串，例如：{{'foo' | append:'bar' }} #=> 'foobar'
    append : function(str, appendString){
        return str + def(appendString, '...');
    },
    // minus-减法，例如：{{ 4 | minus:2 }} #=> 2
    minus : function(rs, num){
        return rs - num;
    },
    // plus-加法，例如：{{'1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2
    plus : function(rs, num){
        return rs + num;
    },
    // times-乘法，例如：{{ 5 | times:4 }} #=> 20
    times : function(rs, num){
        return rs * num;
    },
    // divided_by-除法，例如：{{ 10 | divided_by:2 }} #=> 5
    divided_by : function(rs, num){
        return rs / num;
    },
    // split-通过正则表达式切分字符串为数组，例如：{{"a~b" | split:"~" }} #=> ['a','b']
    split : function(str, splitMark){
        return str.split(def(splitMark, ','));
    },
    // modulo-取模，例如：{{ 3 | modulo:2 }} #=> 1
    modulo : function(rs, num){
        return rs % num;
    }
};

},{}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Observer.js":[function(require,module,exports){
var listener = {
    'topic' : {},
    'check' : function(nameNS, type, build){
        var list = listener.topic[nameNS];
        if(list && list[type]){
            return list[type];
        }
        if(!build){
            return false;
        }
        if(!list){
            list = listener.topic[nameNS] = {};
        }
        if(!list[type]){
            list[type] = [];
        }
        return list[type];
    },
    'fire' : function(nameNS, type, extArgs){
        type = type || 'change';
        var fireBody = Accessor(nameNS);
        if(!fireBody){return;}

        listener._fireList = [];

        listener._getFireProps(nameNS, type);
        listener._fireList = unique(listener._fireList);

        var evtList, acc, ns, args;
        for(var i = 0, j = listener._fireList.length; i < j; i++){
            ns = listener._fireList[i];
            evtList = listener.check(ns, type);
            if(!evtList){continue;}
            acc = Accessor(ns);
            args = [acc.value, acc.oldValue, {
                type:type, 
                object:fireBody.parent,
                name:fireBody.name, 
                nameNS:fireBody.nameNS,
                prop:acc.name,
                propNS:acc.nameNS
            }];
            args[2] = merge(args[2], extArgs);
            evtList.forEach(function(func){
                if(typeof func !== 'function'){return;}
                func.apply(acc.context, args);
            });
        }
        listener._fireList = null;
        return this;
    },
    '_fireList' : null,
    '_getFireProps' : function(nameNS, type){
        var acc = Accessor(nameNS);
        if(!acc){return;}
        listener._fireList.push(nameNS);
        (listener.check(nameNS, type) || []).forEach(function(dep){
            if(typeof dep === 'string'){
                var depAcc = Accessor(dep);
                depAcc.oldValue = depAcc.value;
                depAcc.value = depAcc.get();
                listener._getFireProps(dep);
            }
        });
        if(acc.parentNS !== null && acc.propagation){
            listener._getFireProps(acc.parentNS);
        }
    },
    //TODO capture
    'add' : function(nameNS, func, evt, capture){
        evt = evt || 'change';
        var evtList = listener.check(nameNS, evt, true);
        if(evtList.indexOf(func) < 0){
            evtList.push(func);
        }
        return func;
    },
    'remove' : function(nameNS, func, evt){
        evt = evt || 'change';
        var evtList = listener.check(nameNS, evt), index;
        if(!evtList) return this;
        index = evtList.indexOf(func);
        if(index >= 0){
            evtList.splice(index, 1);
        }
        return this;
    }
}
module.exports = listener;
var $ = require('./kit');
var merge = $.merge;
var unique = $.unique;
var Accessor = require('./Accessor');

},{"./Accessor":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Accessor.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js":[function(require,module,exports){
var $ = require('./kit');
var config = {

    'debug' : 1

    ,'name' : 'DataBind'
    ,'mode' : 0 //0:def prop, 1:get()&set()

    ,'expHead' : '{{'
    ,'expFoot' : '}}'

    ,'rootVar' : 'vm' //备用
    ,'DOMPrefix' : 'vm-'
    ,'propagation' : true
    ,'propagationType' : ['change'] //暂弃
    ,'initDOM' : false //DOM load的扫描, 1:bind 2|true bind+scan

    ,'contextGlobal' : window 

    ,set : function(cfg){
        $.merge(config, cfg, true);
    }
};

if(('_DataBindConfig' in window) || ('_config' in window)){
    config.set(window._DataBindConfig || window._config);
}
module.exports = config;
},{"./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/init.js":[function(require,module,exports){
/*!
    Σヾ(ﾟДﾟ)ﾉ
*/
var name = require('./config').name;
if(name in window){return;}
module.exports = window[name] = require('./DataBind').init();
require('./Expression.artTemplate');
require('./DomExtend');
},{"./DataBind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DataBind.js","./DomExtend":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DomExtend.js","./Expression.artTemplate":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Expression.artTemplate.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js":[function(require,module,exports){
var $ = {};
module.exports = $;
var config = require('./config');
// require('./jquery.hammer.min');

$.objMerger = function(type, args){
    var hold = false, rsObj, curObj;
    if(args[args.length-1] === true){
        hold = true;
    }
    rsObj = hold ? args[0] : {};
    for(var i = +hold, j = args.length - hold; i<j; i++) {
        curObj = args[i];
        if(typeof curObj !== 'object'){continue;}
        for(var key in (type ? curObj : args[0])){
            if(!args[i].hasOwnProperty(key)){continue;}
            rsObj[key] = curObj[key];
        }
    };
    return rsObj;
};
$.parse = function(){
    return $.objMerger(0, arguments);
};
$.merge = function(){
    return $.objMerger(1, arguments);
};

//log################################################################### 
$.log = function(part, info, e){
    var type =  e instanceof Error ? 'error' :
                e == 'mark' ? 'debug' :
                e == 'warn' ? 'warn' :
                e == 'info' ? 'info' :
                'log';
    var msg = '[' + part + ']@ ' + Date.now() + ' : ' + info + '\n' + (type == 'error' ? '('+(e.stack || e.message)+')' : '');
    config.debug && $.log.list.push(msg);
    config.debug && console && console[type](msg);
    return msg;
};
$.log.list = [];

$.isEmptyObject = function(obj){
    for(var key in obj){
        if(!obj.hasOwnProperty(key)){continue;}
        return false;
    }
    return true;
}
$.isSimpleObject = function(obj){
    // return obj && typeof obj === 'object' && obj.__proto
    return obj && obj.toString() === '[object Object]';
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
    if(str.slice(0, 1) === '<'){
        var template = document.createElement(str.slice(0, 3) === '<tr' ? 'tbody' : 'template');
        template.innerHTML = str;
        return template.content ? template.content.firstChild : template.firstElementChild;
    }
    else{
        return document.createElement(str);
    }
}
$.unique    = function(arr){
    for(var i = arr.length - 1; i >= 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(arr[i] === arr[j]){
                arr.splice(i, 1);
                break;
            }
        }
    }
    return arr;
}
$.remove    = function(node){
    if(node.parentNode){
        node.parentNode.removeChild(node);
    }
}
$.evt = function(element, data){
    element._eventList = element._eventList || {};
    return {
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
$.match = function(node, selector, context){
    context = context || document;
    return [].indexOf.call(context.querySelectorAll(selector) || [], node) >= 0;
}

},{"./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/index.js":[function(require,module,exports){
module.exports = require('./dev/init');
},{"./dev/init":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/init.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/dist/template.js":[function(require,module,exports){
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
},{}]},{},["./dev/lib/core/core.js"]);
