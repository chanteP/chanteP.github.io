(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/lib/core/core.js":[function(require,module,exports){
if(!('defineProperty' in Object)){
    alert('Modern Browser Only!!!');
}
var $ = require('./kit');
window._config = require('./config');
window.DataBind = require('np-databind');
window.$ = $;
window.core = require('./spa');

require('./nav');
require('./bg');
module.exports = $;
},{"./bg":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/bg/index.js","./config":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js","./nav":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/nav/index.js","./spa":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/index.js","np-databind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/index.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/bg/index.js":[function(require,module,exports){
var $ = require('../kit');
document.addEventListener('DOMContentLoaded', function(){
    // $.lazyload($.find('#bg'), $.find('#bg').dataset.bg, function(el, src){});
})

},{"../kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js":[function(require,module,exports){
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
//top鬘ｺ蠎擾ｼ計ertical
$.lazyload = function(wrapper, node, attr, callback, isLive){
    var lazyload = function(el, src, callback){
        el.setAttribute('lazy-loading', '1');
        var img = new Image();
        img.onload = function(){
            callback && callback(el, src);
            // el.src = this.src;
            el.removeAttribute('lazy-loading');
        }
        setTimeout(function(){
            img.src = src;
        }, 400);
    }
    if(arguments.length === 3){
        //纯加载回调 node, src, callback
        lazyload(wrapper, node, attr);
    }
    else{
        //滚动视口检测
        wrapper = wrapper || document.body;
        var hasLazyLoad = node.hasBindLazyLoad;
        node.hasBindLazyLoad = attr;
        var checkTimer;
        var timerCheck = function(){
            clearTimeout(checkTimer);
            checkTimer = setTimeout(check, 50);
            node.hasBindLazyLoad = false;
        }
        var check = function(){
            var list = $.findAll('['+attr+']', node);
            if(!list.length && !isLive){
                wrapper.removeEventListener('scroll', timerCheck);
                return;
            }
            var docHeight = document.documentElement.clientHeight;
            [].every.call(list, function(el){
                var bd = el.getBoundingClientRect();
                if(bd.top + el.clientHeight < 0){
                    return true;
                }
                else if(bd.top < docHeight){
                    lazyload(el, el.getAttribute(attr), callback);
                    el.removeAttribute(attr);
                    return true;
                }
                else{
                    return false;
                }
            });
        }
        !hasLazyLoad && wrapper.addEventListener('scroll', timerCheck);  
        check();
    }
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
        $.remove(i);
    }
    i.src = url;
    document.getElementById('syscomp').appendChild(i);
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

},{"./config":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/config.js","./touch.kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/touch.kit.js","./tween":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/tween.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/nav/index.js":[function(require,module,exports){
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

},{"../kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/spa/index.js":[function(require,module,exports){

var $ = require('../kit');
var url = require('./url');
var loader = require('./loader');
var api;
var self = window.self;

var inited = false;

var defaultTitle = 'neetproject @2015'

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
            url.set(fake || href, this.title || defaultTitle, null, href);
        });

    url.on(function(src, dir){
        loader.load(src, dir);
    });
    // loader.load(location.href);
}
document.addEventListener('DOMContentLoaded', init);

module.exports = api = {
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
    SHOWONCE : 4,
    SHOW : 5,
    HIDE : 6,

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
        document.body.classList[bool ? 'add' : 'remove']('loading');
    },
    switchOn : function(){
        navRel(this.page);
        this.status < this.INIT && this.fetchCallback('init');
        $.find(wrapperID).innerHTML = '';
        $.find(wrapperID).appendChild(this.node);
        this.status < this.SHOWONCE && this.fetchCallback('showonce');
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
    load : function(url, dir){
        var page = url2Page(url), mod = new PageModule(page);
        if(page === url2Page(location.href) && mod === cur && dir === 1){return;}
        mod.setLoading(true);
        if(mod.status > mod.LOADING){
            clearTimeout(loadTimer);
            loadTimer = setTimeout(function(){
                mod = new PageModule(url2Page(location.href));
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
        if(url !== location.pathname + location.hash)
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

},{"./kit":"/Volumes/LINKAREA/web/neetproject/11/dev/lib/core/kit.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/lib/_empty.js":[function(require,module,exports){

},{}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/node_modules/path-browserify/index.js":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/node_modules/process/browser.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Accessor.js":[function(require,module,exports){
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

    //TODO mode才绑定，等实现set数组元素再说...
    if(Array.isArray(value)){
        if(value !== this.value){
            this.arrayChangeLock = false;
        }
        if(!this.arrayChangeLock){
            if('observe' in Object){
                Object.observe(value, function(changes){
                    self.set(value, self.dirty, true);
                });
            }
            else{
                value.__proto__ = ArrayExtend;
                value[ArrayExtend.bindMethodName] = function(methodName){
                    self.set(value, self.dirty, true, {
                        method : methodName
                    });
                }
            }
        }
        this.arrayChangeLock = true;
    }


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

    if(!config.mode && $.isSimpleObject(value)){
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
        this[ArrayExtendObserveMethod](methodName);
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
DataBind.listeners      = listener.topic;
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
    'model' : prefix + 'model'//v to m
    ,'list' : prefix + 'list'//list: tr in table
    ,'bind' : prefix + 'bind'//scope源
    ,'escape' : prefix + 'escape'//scan外
    ,'toggle' : prefix + 'toggle'
    ,'extraData' : prefix + 'extraExpData' //传给expression的额外数据
    ,'boundAttr' : prefix + 'boundAttr' //已经绑定的attr&原值
    ,'boundText' : prefix + 'boundText' //已经绑定的text&原值
    ,'boundProp' : prefix + 'boundProp' //已经绑定的props
}
var listPreg = /([\w\.]+)\s+in\s+([\w\.]+)/,
    numberPreg = /^[\d\.]+$/;
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
    'addScanFunc' : function(props, func){
        props.forEach(function(prop){
            if(!checkProp[prop]){
                checkProp[prop] = [];
            }
            checkProp[prop].push(func);
        });
    },
    'checkResycle' : function(node){
        if(!contains(document.documentElement, node)){
            for(var prop in node[marker.boundProp]){
                node[marker.boundProp][prop].forEach(function(func){
                    unobserve(prop, func, checkType);
                });
            }
            return true;
        }
    }
};
var subFunc = {
    //list: tr to table 替换
    templateFunc : function(template, index, writeProp, useProp){
        var listExpPreg = new RegExp(expPreg.source, 'mg'),
            fieldPreg = new RegExp('(?:\\s|\\b)('+writeProp+'\\.)', 'mg');
        return template.replace(listExpPreg, function(match, exp){
            return match.replace(fieldPreg, function(match, matchContext){
                return ' ' + useProp + '['+index+'].';
            });
        });
    },
    initBoundNode : function(node, deps, func, text, value){
        node[marker.boundAttr] = node[marker.boundAttr] || {};
        // node[marker.boundText] = textContent;
        node[marker.boundProp] = node[marker.boundProp] || {};

        //isAttr
        if(value){
            node[marker.boundAttr][text] = value;
        }
        else{
            node[marker.boundText] = text;
        }
        deps.forEach(function(dep){
            node[marker.boundProp][dep] = node[marker.boundProp][dep] || [];
            node[marker.boundProp][dep].push(func);
        });
    }
}
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
    // 'extraData' : function(node){
    //     if(node[marker.extraData]){
    //         return node[marker.extraData];
    //     }
    //     return node.parentNode ? parse.extraData(node.parentNode) : undefined;
    // },
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
    'context' : function(node, self){
        //优化，
        if(node[marker.extraData] && !self[marker.extraData]){
            self[marker.extraData] = node[marker.extraData];
        }
        if(node[marker.bind]){
            return node[marker.bind];
        }
        if(node.getAttribute && node.getAttribute(marker.bind)){
            return node.getAttribute(marker.bind);
        }
        return node.parentNode ? parse.context(node.parentNode, self) : '';
    }
};
//data to dom
var bind = {
    'model' : function(e){
        var type = this.type, name = this.name, tagName = this.tagName.toLowerCase();
        var model = this.getAttribute(marker.model), context = parse.context(this, this);
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
        if(!isNaN(value) && numberPreg.test(value)){
            value = +value;
        }
        set(model, value);
    },
    'list' : function(node, propGroup){
        var template = node.outerHTML;
        var context = parse.context(node, node);
        node[marker.bind] = context;

        var writeProp = propGroup[0],
            useProp = propGroup[1];

        var prop = DataBind.parseProp(useProp, context);

        //TODO 备用标注
        var listMarkEnd = document.createComment('list for ' + useProp + ' as ' + writeProp + ' end'),
        // var listMarkEnd = document.createElement('script'),
            listMarkStart = document.createComment('list for ' + useProp + ' as ' + writeProp + 'start'),
            listNodeCollection = [];

        node.parentNode.insertBefore(listMarkStart, node);
        node.parentNode.replaceChild(listMarkEnd, node);

        main.addScanFunc([prop], function(v, ov, e){
            if(!listMarkEnd.parentNode){return;}
            var list = get(prop);
            if(!(Array.isArray(list))){return;}
            var content = listMarkEnd.parentNode;
            //TODO 增强array功能后这里就不用全部删了再加了
            listNodeCollection.forEach(function(element){
                remove(element);
            });
            listNodeCollection.length = 0;
            list.forEach(function(dataElement, index){
                var element = create(subFunc.templateFunc(template, index, writeProp, useProp));
                element[marker.extraData] = {
                    index : index,
                    value : dataElement
                };
                content.insertBefore(element, listMarkEnd);
                listNodeCollection.push(element);
                main.scan(element);
            });
        });
    },
    //node attribute
    'attr' : function(node, attrText, attrName){
        var context = parse.context(node, node), deps = parse.deps(attrText, context), func;
        var extraData = node[marker.extraData];

        switch (attrName){
            case 'checked' : 
                var checkValue = node.value;
                func = node.type === 'checkbox' ? 
                function(value){
                    if(main.checkResycle(node)){return;}
                    node.checked = (value || '').split(',').indexOf(checkValue) >= 0;
                } : 
                function(value){
                    if(main.checkResycle(node)){return;}
                    node.checked = value === checkValue;
                };
                break;
            case 'selected' : 
                var checkValue = node.value;
                func = function(value){
                    if(main.checkResycle(node)){return;}
                    node.selected = value === checkValue;
                };
                break;
            case 'value' : 
                func = function(){
                    if(main.checkResycle(node)){return;}
                    node.value = parse.text(attrText, context, extraData);
                }
                break;
            case 'data-src' : 
                func = function(){
                    if(main.checkResycle(node)){return;}
                    node.src = parse.text(attrText, context, extraData);
                }
                break;
            default : 
                func = function(){
                    if(main.checkResycle(node)){return;}
                    value = parse.text(attrText, context, extraData);
                    if(value === '' || value === 'null' || value === 'undefined'){
                        node.removeAttribute(attrName);
                    }
                    else{
                        node.setAttribute(attrName, value);
                    }
                }
                break;
        }
        subFunc.initBoundNode(node, deps, func, attrName, attrText);

        main.addScanFunc(deps, func);
    },
    //textNode
    'text' : function(node, textContent){
        var context = parse.context(node, node), deps = parse.deps(textContent, context), func;
        // node[marker.bind] = context;
        var exchangeNode = node;
        // var extraData = parse.extraData(node);
        var extraData = node[marker.extraData];

        func = function(v, ov, e){
            if(main.checkResycle(node)){return;}
            node.textContent = parse.text(textContent, context, extraData);
        }
        subFunc.initBoundNode(node, deps, func, textContent);

        main.addScanFunc(deps, func);
    }
};
//################################################################################################################
DataBind.scan = main.scan;
DataBind.bindContent = main.bindContent;
//################################################################################################################
window.document.addEventListener('DOMContentLoaded', function(){
    if(!config.initDOM){return;}
    if(typeof config.initDOM === 'string'){
        config.initDOM === 'bind' && main.bindContent(document.body);
        config.initDOM === 'scan' && main.scan(document.documentElement);
    }else{
        main.bindContent(document.body);
        main.scan(document.documentElement);
    }
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

//....默认打上debug...只能。。

var artTemplate = window.template = require('art-template');
var filters = require('./Filter');
var merge = $.merge;

var rootVar = config.rootVar, rootVarLen = String(rootVar).length;

//################################################################################################################
var log = $.log;
var get = DataBind.get;
//################################################################################################################
artTemplate.onerror = function(e){
    log('Expression.artTemplate', e.message, 'warn');
}
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


},{"./DataBind":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/DataBind.js","./Filter":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Filter.js","./config":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/config.js","./kit":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/kit.js","art-template":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/node/template.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/Filter.js":[function(require,module,exports){
/*
    liquid式预设helper外挂包
*/
var def = function(rs, defaultValue){
    return rs === undefined ? defaultValue : rs;
}
module.exports = {
    // ###add 调试用
    debug : function(value){
        debugger
        return value;
    },
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
    // first : function(arr){
    //     return arr[0];
    // },
    // ###item:获取第n个元素,支持负数
    item : function(arr, index){
        if(index >= 0){
            return arr[index];
        }
        else{
            return arr[arr.length + index];
        }
    },
    // last-获得传入的数组的最后一个元素
    // last : function(arr){
    //     return arr[arr.length?arr.length-1:0];
    // },
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
    size : function(data){
        if(typeof data === 'number'){
            return String(data.toString()).length;
        }
        if(typeof data === 'string'){
            return String(data).length;
        }
        return data.length;
    },
    // escape-转义一个字符串
    // escape_once-返回HTML的转义版本，而不会影响现有的实体转义
    // strip_html-从字符串去除HTML
    strip_html : function(str){
        // return str.replace()
        return str;
    },
    // ### json_stringify
    json_stringify : function(obj){
        return JSON.stringify(obj);
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
    // truncate : function(str, length){
    //     return str.slice(0, length);
    // },
    // slice-截取字符串第x个到第x个字符
    slice : function(str, fromIndex, toIndex){
        return str.slice(fromIndex, def(toIndex, undefined));
    },
    // truncatewords-截取字符串到第x个词
    // prepend-前置添加字符串，例如：{{ 'bar' | prepend:'foo' }} #=> 'foobar'
    // prepend : function(str, appendString){
    //     return def(prependString, '...') + str;
    // },
    // append-后置追加字符串，例如：{{'foo' | append:'bar' }} #=> 'foobar'
    // append : function(str, appendString){
    //     return str + def(appendString, '...');
    // },
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

        var evtList, acc, args;
        listener._fireList.forEach(function(ns){
            evtList = listener.check(ns, type);
            if(!evtList){return;}
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
            for(var i = evtList.length - 1; i >= 0; i--){
                if(typeof evtList[i] !== 'function'){return;}
                evtList[i].apply(acc.context, args);
            }
        });
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
},{"./dev/init":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/dev/init.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/dist/template-debug.js":[function(require,module,exports){
/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */
 
!(function () {


/**
 * 模板引擎
 * @name    template
 * @param   {String}            模板名
 * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
 */
var template = function (filename, content) {
    return typeof content === 'string'
    ?   compile(content, {
            filename: filename
        })
    :   renderFile(filename, content);
};


template.version = '3.0.0';


/**
 * 设置全局配置
 * @name    template.config
 * @param   {String}    名称
 * @param   {Any}       值
 */
template.config = function (name, value) {
    defaults[name] = value;
};



var defaults = template.defaults = {
    openTag: '<%',    // 逻辑语法开始标签
    closeTag: '%>',   // 逻辑语法结束标签
    escape: true,     // 是否编码输出变量的 HTML 字符
    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
    compress: false,  // 是否压缩输出
    parser: null      // 自定义语法格式器 @see: template-syntax.js
};


var cacheStore = template.cache = {};


/**
 * 渲染模板
 * @name    template.render
 * @param   {String}    模板
 * @param   {Object}    数据
 * @return  {String}    渲染好的字符串
 */
template.render = function (source, options) {
    return compile(source, options);
};


/**
 * 渲染模板(根据模板名)
 * @name    template.render
 * @param   {String}    模板名
 * @param   {Object}    数据
 * @return  {String}    渲染好的字符串
 */
var renderFile = template.renderFile = function (filename, data) {
    var fn = template.get(filename) || showDebugInfo({
        filename: filename,
        name: 'Render Error',
        message: 'Template not found'
    });
    return data ? fn(data) : fn;
};


/**
 * 获取编译缓存（可由外部重写此方法）
 * @param   {String}    模板名
 * @param   {Function}  编译好的函数
 */
template.get = function (filename) {

    var cache;
    
    if (cacheStore[filename]) {
        // 使用内存缓存
        cache = cacheStore[filename];
    } else if (typeof document === 'object') {
        // 加载模板并编译
        var elem = document.getElementById(filename);
        
        if (elem) {
            var source = (elem.value || elem.innerHTML)
            .replace(/^\s*|\s*$/g, '');
            cache = compile(source, {
                filename: filename
            });
        }
    }

    return cache;
};


var toString = function (value, type) {

    if (typeof value !== 'string') {

        type = typeof value;
        if (type === 'number') {
            value += '';
        } else if (type === 'function') {
            value = toString(value.call(value));
        } else {
            value = '';
        }
    }

    return value;

};


var escapeMap = {
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "&": "&#38;"
};


var escapeFn = function (s) {
    return escapeMap[s];
};

var escapeHTML = function (content) {
    return toString(content)
    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
};


var isArray = Array.isArray || function (obj) {
    return ({}).toString.call(obj) === '[object Array]';
};


var each = function (data, callback) {
    var i, len;        
    if (isArray(data)) {
        for (i = 0, len = data.length; i < len; i++) {
            callback.call(data, data[i], i, data);
        }
    } else {
        for (i in data) {
            callback.call(data, data[i], i);
        }
    }
};


var utils = template.utils = {

	$helpers: {},

    $include: renderFile,

    $string: toString,

    $escape: escapeHTML,

    $each: each
    
};/**
 * 添加模板辅助方法
 * @name    template.helper
 * @param   {String}    名称
 * @param   {Function}  方法
 */
template.helper = function (name, helper) {
    helpers[name] = helper;
};

var helpers = template.helpers = utils.$helpers;




/**
 * 模板错误事件（可由外部重写此方法）
 * @name    template.onerror
 * @event
 */
template.onerror = function (e) {
    var message = 'Template Error\n\n';
    for (var name in e) {
        message += '<' + name + '>\n' + e[name] + '\n\n';
    }
    
    if (typeof console === 'object') {
        console.error(message);
    }
};


// 模板调试器
var showDebugInfo = function (e) {

    template.onerror(e);
    
    return function () {
        return '{Template Error}';
    };
};


/**
 * 编译模板
 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
 * @name    template.compile
 * @param   {String}    模板字符串
 * @param   {Object}    编译选项
 *
 *      - openTag       {String}
 *      - closeTag      {String}
 *      - filename      {String}
 *      - escape        {Boolean}
 *      - compress      {Boolean}
 *      - debug         {Boolean}
 *      - cache         {Boolean}
 *      - parser        {Function}
 *
 * @return  {Function}  渲染方法
 */
var compile = template.compile = function (source, options) {
    
    // 合并默认配置
    options = options || {};
    for (var name in defaults) {
        if (options[name] === undefined) {
            options[name] = defaults[name];
        }
    }


    var filename = options.filename;


    try {
        
        var Render = compiler(source, options);
        
    } catch (e) {
    
        e.filename = filename || 'anonymous';
        e.name = 'Syntax Error';

        return showDebugInfo(e);
        
    }
    
    
    // 对编译结果进行一次包装

    function render (data) {
        
        try {
            
            return new Render(data, filename) + '';
            
        } catch (e) {
            
            // 运行时出错后自动开启调试模式重新编译
            if (!options.debug) {
                options.debug = true;
                return compile(source, options)(data);
            }
            
            return showDebugInfo(e)();
            
        }
        
    }
    

    render.prototype = Render.prototype;
    render.toString = function () {
        return Render.toString();
    };


    if (filename && options.cache) {
        cacheStore[filename] = render;
    }

    
    return render;

};




// 数组迭代
var forEach = utils.$each;


// 静态分析模板变量
var KEYWORDS =
    // 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false'
    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
    + ',throw,true,try,typeof,var,void,while,with'

    // 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
    + ',final,float,goto,implements,import,int,interface,long,native'
    + ',package,private,protected,public,short,static,super,synchronized'
    + ',throws,transient,volatile'

    // ECMA 5 - use strict
    + ',arguments,let,yield'

    + ',undefined';

var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
var SPLIT_RE = /[^\w$]+/g;
var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
var BOUNDARY_RE = /^,+|,+$/g;
var SPLIT2_RE = /^$|,+/;


// 获取变量
function getVariable (code) {
    return code
    .replace(REMOVE_RE, '')
    .replace(SPLIT_RE, ',')
    .replace(KEYWORDS_RE, '')
    .replace(NUMBER_RE, '')
    .replace(BOUNDARY_RE, '')
    .split(SPLIT2_RE);
};


// 字符串转义
function stringify (code) {
    return "'" + code
    // 单引号与反斜杠转义
    .replace(/('|\\)/g, '\\$1')
    // 换行符转义(windows + linux)
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n') + "'";
}


function compiler (source, options) {
    
    var debug = options.debug;
    var openTag = options.openTag;
    var closeTag = options.closeTag;
    var parser = options.parser;
    var compress = options.compress;
    var escape = options.escape;
    

    
    var line = 1;
    var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};
    


    var isNewEngine = ''.trim;// '__proto__' in {}
    var replaces = isNewEngine
    ? ["$out='';", "$out+=", ";", "$out"]
    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

    var concat = isNewEngine
        ? "$out+=text;return $out;"
        : "$out.push(text);";
          
    var print = "function(){"
    +      "var text=''.concat.apply('',arguments);"
    +       concat
    +  "}";

    var include = "function(filename,data){"
    +      "data=data||$data;"
    +      "var text=$utils.$include(filename,data,$filename);"
    +       concat
    +   "}";

    var headerCode = "'use strict';"
    + "var $utils=this,$helpers=$utils.$helpers,"
    + (debug ? "$line=0," : "");
    
    var mainCode = replaces[0];

    var footerCode = "return new String(" + replaces[3] + ");"
    
    // html与逻辑语法分离
    forEach(source.split(openTag), function (code) {
        code = code.split(closeTag);
        
        var $0 = code[0];
        var $1 = code[1];
        
        // code: [html]
        if (code.length === 1) {
            
            mainCode += html($0);
         
        // code: [logic, html]
        } else {
            
            mainCode += logic($0);
            
            if ($1) {
                mainCode += html($1);
            }
        }
        

    });
    
    var code = headerCode + mainCode + footerCode;
    
    // 调试语句
    if (debug) {
        code = "try{" + code + "}catch(e){"
        +       "throw {"
        +           "filename:$filename,"
        +           "name:'Render Error',"
        +           "message:e.message,"
        +           "line:$line,"
        +           "source:" + stringify(source)
        +           ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
        +       "};"
        + "}";
    }
    
    
    
    try {
        
        
        var Render = new Function("$data", "$filename", code);
        Render.prototype = utils;

        return Render;
        
    } catch (e) {
        e.temp = "function anonymous($data,$filename) {" + code + "}";
        throw e;
    }



    
    // 处理 HTML 语句
    function html (code) {
        
        // 记录行号
        line += code.split(/\n/).length - 1;

        // 压缩多余空白与注释
        if (compress) {
            code = code
            .replace(/\s+/g, ' ')
            .replace(/<!--[\w\W]*?-->/g, '');
        }
        
        if (code) {
            code = replaces[1] + stringify(code) + replaces[2] + "\n";
        }

        return code;
    }
    
    
    // 处理逻辑语句
    function logic (code) {

        var thisLine = line;
       
        if (parser) {
        
             // 语法转换插件钩子
            code = parser(code, options);
            
        } else if (debug) {
        
            // 记录行号
            code = code.replace(/\n/g, function () {
                line ++;
                return "$line=" + line +  ";";
            });
            
        }
        
        
        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
        if (code.indexOf('=') === 0) {

            var escapeSyntax = escape && !/^=[=#]/.test(code);

            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

            // 对内容编码
            if (escapeSyntax) {

                var name = code.replace(/\s*\([^\)]+\)/, '');

                // 排除 utils.* | include | print
                
                if (!utils[name] && !/^(include|print)$/.test(name)) {
                    code = "$escape(" + code + ")";
                }

            // 不编码
            } else {
                code = "$string(" + code + ")";
            }
            

            code = replaces[1] + code + replaces[2];

        }
        
        if (debug) {
            code = "$line=" + thisLine + ";" + code;
        }
        
        // 提取模板中的变量名
        forEach(getVariable(code), function (name) {
            
            // name 值可能为空，在安卓低版本浏览器下
            if (!name || uniq[name]) {
                return;
            }

            var value;

            // 声明模板变量
            // 赋值优先级:
            // [include, print] > utils > helpers > data
            if (name === 'print') {

                value = print;

            } else if (name === 'include') {
                
                value = include;
                
            } else if (utils[name]) {

                value = "$utils." + name;

            } else if (helpers[name]) {

                value = "$helpers." + name;

            } else {

                value = "$data." + name;
            }
            
            headerCode += name + "=" + value + ",";
            uniq[name] = true;
            
            
        });
        
        return code + "\n";
    }
    
    
};



// 定义模板引擎的语法


defaults.openTag = '{{';
defaults.closeTag = '}}';


var filtered = function (js, filter) {
    var parts = filter.split(':');
    var name = parts.shift();
    var args = parts.join(':') || '';

    if (args) {
        args = ', ' + args;
    }

    return '$helpers.' + name + '(' + js + args + ')';
}


defaults.parser = function (code, options) {

    // var match = code.match(/([\w\$]*)(\b.*)/);
    // var key = match[1];
    // var args = match[2];
    // var split = args.split(' ');
    // split.shift();

    code = code.replace(/^\s/, '');

    var split = code.split(' ');
    var key = split.shift();
    var args = split.join(' ');

    

    switch (key) {

        case 'if':

            code = 'if(' + args + '){';
            break;

        case 'else':
            
            if (split.shift() === 'if') {
                split = ' if(' + split.join(' ') + ')';
            } else {
                split = '';
            }

            code = '}else' + split + '{';
            break;

        case '/if':

            code = '}';
            break;

        case 'each':
            
            var object = split[0] || '$data';
            var as     = split[1] || 'as';
            var value  = split[2] || '$value';
            var index  = split[3] || '$index';
            
            var param   = value + ',' + index;
            
            if (as !== 'as') {
                object = '[]';
            }
            
            code =  '$each(' + object + ',function(' + param + '){';
            break;

        case '/each':

            code = '});';
            break;

        case 'echo':

            code = 'print(' + args + ');';
            break;

        case 'print':
        case 'include':

            code = key + '(' + split.join(',') + ');';
            break;

        default:

            // 过滤器（辅助方法）
            // {{value | filterA:'abcd' | filterB}}
            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
            // TODO: {{ddd||aaa}} 不包含空格
            if (/^\s*\|\s*[\w\$]/.test(args)) {

                var escape = true;

                // {{#value | link}}
                if (code.indexOf('#') === 0) {
                    code = code.substr(1);
                    escape = false;
                }

                var i = 0;
                var array = code.split('|');
                var len = array.length;
                var val = array[i++];

                for (; i < len; i ++) {
                    val = filtered(val, array[i]);
                }

                code = (escape ? '=' : '=#') + val;

            // 即将弃用 {{helperName value}}
            } else if (template.helpers[key]) {
                
                code = '=#' + key + '(' + split.join(',') + ');';
            
            // 内容直接输出 {{value}}
            } else {

                code = '=' + code;
            }

            break;
    }
    
    
    return code;
};



// RequireJS && SeaJS
if (typeof define === 'function') {
    define(function() {
        return template;
    });

// NodeJS
} else if (typeof exports !== 'undefined') {
    module.exports = template;
} else {
    this.template = template;
}

})();
},{}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/node/_node.js":[function(require,module,exports){
var fs = require('fs');
var path = require('path');

module.exports = function (template) {

	var cacheStore = template.cache;
	var defaults = template.defaults;
	var rExtname;

	// 提供新的配置字段
	defaults.base = '';
	defaults.extname = '.html';
	defaults.encoding = 'utf-8';


	// 重写引擎编译结果获取方法
	template.get = function (filename) {
		
	    var fn;
	    
	    if (cacheStore.hasOwnProperty(filename)) {
	        // 使用内存缓存
	        fn = cacheStore[filename];
	    } else {
	        // 加载模板并编译
	        var source = readTemplate(filename);
	        if (typeof source === 'string') {
	            fn = template.compile(source, {
	                filename: filename
	            });
	        }
	    }

	    return fn;
	};

	
	function readTemplate (id) {
	    id = path.join(defaults.base, id + defaults.extname);
	    
	    if (id.indexOf(defaults.base) !== 0) {
	        // 安全限制：禁止超出模板目录之外调用文件
	        throw new Error('"' + id + '" is not in the template directory');
	    } else {
	        try {
	            return fs.readFileSync(id, defaults.encoding);
	        } catch (e) {}
	    }
	}


	// 重写模板`include``语句实现方法，转换模板为绝对路径
	template.utils.$include = function (filename, data, from) {
	    
	    from = path.dirname(from);
	    filename = path.join(from, filename);
	    
	    return template.renderFile(filename, data);
	}


	// express support
	template.__express = function (file, options, fn) {

	    if (typeof options === 'function') {
	        fn = options;
	        options = {};
	    }


		if (!rExtname) {
			// 去掉 express 传入的路径
			rExtname = new RegExp((defaults.extname + '$').replace(/\./g, '\\.'));
		}


	    file = file.replace(rExtname, '');

	    options.filename = file;
	    fn(null, template.renderFile(file, options));
	};


	return template;
}
},{"fs":"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/lib/_empty.js","path":"/Volumes/LINKAREA/web/neetproject/11/node_modules/browserify/node_modules/path-browserify/index.js"}],"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/node/template.js":[function(require,module,exports){
/*!
 * artTemplate[NodeJS]
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */

var node = require('./_node.js');
var template = require('../dist/template-debug.js');
module.exports = node(template);
},{"../dist/template-debug.js":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/dist/template-debug.js","./_node.js":"/Volumes/LINKAREA/web/neetproject/11/node_modules/np-databind/node_modules/art-template/node/_node.js"}]},{},["./dev/lib/core/core.js"]);
