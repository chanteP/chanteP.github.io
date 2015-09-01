(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
'use strict';

var stack = [];
var title = window.document.title;

var history = require('np-history');

var findTitle = function findTitle() {
    var lastTitle = title;
    for (var i = stack.length - 1; i >= 0; i--) {
        if (stack[i].title) {
            lastTitle = stack[i].title;
            break;
        }
    }
    document.title = lastTitle;
};
var pushState = function pushState(href, title) {
    history.pushState(null, title || '', href || location.pathname);
};

//temp
var popState = function popState(e) {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();

    var elem = api.get();
    if (!elem) {
        // window.history.go(-1);
        return;
    }
    if (elem.onBack && typeof elem.onBack === 'function') {
        elem.onBack();
    }
    if (!api.block && !elem.block && !elem.component.block) {
        elem.component.hide();
        findTitle();
    } else {
        pushState();
    }
};

//##############################################################################

var api = {
    stack: stack,
    block: false,
    pushState: pushState,
    push: function push(component, cfg) {
        if (!component.hide) {
            //TODO 错误收集
            throw '[componentHandler] component.hide is not a function';
        }
        cfg = cfg || {};
        this.remove(component);

        pushState(cfg.href, cfg.title);

        stack.push({
            component: component,
            block: cfg.block,
            title: cfg.title,
            onBack: cfg.onBack,
            href: cfg.href
        });
        findTitle();
        return this;
    },
    get: function get(index) {
        return stack[index === undefined ? stack.length - 1 : index];
    },
    pop: function pop() {
        stack.pop();
    },
    remove: function remove(component) {
        stack.some(function (elem, index) {
            if (elem.component === component) {
                stack.splice(index, 1);
                return true;
            }
        });
        findTitle();
        return this;
    },
    setTitle: function setTitle(text) {
        window.document.title = title = text;
    }
};

module.exports = function ($) {
    $.domReady(function () {
        // debugger
        window.addEventListener('popstate', popState);
        // history.onback(popState);
    });
    return {
        componentHandler: api
    };
};

},{"np-history":10}],2:[function(require,module,exports){
'use strict';

module.exports = function ($) {
    var api;
    $.domReady(function () {
        api.setLoading(false);
    });
    return api = {
        animate: function animate(node, type, callback, unique) {
            node.classList.add('animated');
            node.classList.add(type);
            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';
            //var evt = 'webkitAnimationEnd';
            var func = function func(e) {
                if (e.target === node) {
                    node.classList.remove('animated');
                    node.classList.remove(type);
                    // console.info('del', node, evt, callback);
                    node.removeEventListener(evt, func);
                    callback && callback(this);
                }
            };
            if (unique) {
                if (node.bindAnimatedFunc) {
                    node.removeEventListener(evt, node.bindAnimatedFunc);
                }
                node.bindAnimatedFunc = func;
            }
            // console.info('add', node, evt, callback);
            node.addEventListener(evt, func);
        },
        setLoading: function setLoading(bool) {
            document.body.classList[bool ? 'add' : 'remove']('loading');
        },
        //插入样式
        insertStyle: function insertStyle(css) {
            var styleNode = document.createElement('style');
            styleNode.innerHTML = css;
            document.head.appendChild(styleNode);
        }
    };
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function ($) {
    window.onerror = function (e, filename, lineNo) {
        var debugType = $.querySearch('debug');
        if (!debugType) {
            return;
        }
        switch (debugType) {
            case 'alert':
                alert(e + '\n' + filename + '\n' + lineNo);
                break;
            case 'console':
                console.log(e, filename, lineNo);
                break;
            case 'debugger':
                debugger;
                break;
        }
    };
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function ($) {
    $.domReady(function () {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        if (window.FastClick) {
            window.FastClick.attach(document.body);
            document.body.classList.add('fastclick_outer');
        }
    });
};

},{}],5:[function(require,module,exports){
'use strict';

var gaAccount;

function loadUA() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', gaAccount, 'auto');
    ga('send', 'pageview');
}
module.exports = function ($) {
    gaAccount = $config.cos_gaAccount;
    if (!gaAccount || $.isLocal) {
        return;
    }
    loadUA();
    return {
        ga: ga
    };
};

},{}],6:[function(require,module,exports){
'use strict';

window.$config = window.$config || {};
window.$data = window.$data || {};

var $ = require('np-kit');
var api = {};
[require('./errorControl'), require('./dom'), require('./componentHandler'), require('./fastclick'), require('./keyboardHandler'), require('./lazyload'), require('./pixelFix'), require('./ga')].forEach(function (mod) {
    $.merge(api, mod($), true);
});

module.exports = api;

require('np-scrollp').bind();

},{"./componentHandler":1,"./dom":2,"./errorControl":3,"./fastclick":4,"./ga":5,"./keyboardHandler":7,"./lazyload":8,"./pixelFix":9,"np-kit":11,"np-scrollp":20}],7:[function(require,module,exports){
'use strict';

module.exports = function ($) {
    var lastTarget;
    window.document.addEventListener('click', function (e) {
        var target = e.target;
        if (target === lastTarget) {
            return;
        }
        //移除输入状态
        var tagName = target.tagName;
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
            document.activeElement && document.activeElement.blur();
        }
        lastTarget = e.target;
    });
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function ($) {
    var scrollTimer;
    var bindEvt = function bindEvt() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            $.trigger(window, 'scrollend');
        }, 100);
    };
    var check = function check() {
        setTimeout(function () {
            $.each($.findAll('[data-lazyload]:not(.lazyloading)'), function (node) {
                var src = node.dataset.lazyload;
                if (!src) {
                    return;
                }
                node.classList.add('lazyloading');
                $.load(src, '').onload = function () {
                    node.src = src;
                    node.classList.remove('lazyloading');
                    node.dataset.lazyload = '';
                };
            });
        }, 200);
    };
    window.addEventListener('mousewheel', bindEvt);

    window.addEventListener('click', check);
    window.addEventListener('scrollend', check);
    $.domReady(check);
};

},{}],9:[function(require,module,exports){
'use strict';

var setMeta = function setMeta(metaNode, content) {
    if (!metaNode) {
        return;
    }
    metaNode.content = content;
    metaNode.setAttribute('content', content);
};
var scaleRoot = function scaleRoot(os, scale) {
    var meta = document.querySelector('meta[name="viewport"]');
    switch (os) {
        case 'IOS':
            setMeta(meta, 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no');
            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
            break;
        case 'Android':
            document.documentElement.style.zoom = scale * 100 + '%';
            break;
        default:
            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
            document.documentElement.style.zoom = scale * 100 + '%';
    }
};
var setRootFontSize = function setRootFontSize(rpx) {
    document.documentElement.style.fontSize = rpx + 'px';
};
module.exports = function ($) {
    var pixelRatio = window.devicePixelRatio || 1;
    pixelRatio = pixelRatio | 0;

    switch (true) {
        case require('../base').os === 'Android':
            pixelRatio = 1;break;
        case pixelRatio < 2:
            pixelRatio = 1;break;
        case 2 <= pixelRatio:
            pixelRatio = 2;break;
        default:
            pixelRatio = 1;break;
    }

    var fontSize = 50 * pixelRatio,
        scale = 1 / pixelRatio;
    setRootFontSize(fontSize);
    scaleRoot($.os, scale);
    var api = {
        pixelRatio: pixelRatio,
        font: fontSize,
        scale: scale,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };

    // alert(JSON.stringify(api))
    return api;
};

},{"../base":6}],10:[function(require,module,exports){
var ai = 0;
var curState;
var historyStateMap = [];

var backFuncList = [],
    forwardFuncList = [],
    changeList = [];

var fetch = function(historyId, method){
    var state = historyStateMap[historyId];
    state && typeof state[method] === 'function' && state[method](state.state);
}
var runList = function(list){
    list.forEach(function(func){
        func();
    });
}

//push(push进去之后执行的func，被pop出来之后执行的func)
var changeState = function(method){
    return function(state, title, url, forwardFunc, backFunc, stateData){
        if(method === 'replaceState'){
            curState && fetch(curState.$id, 'pop');
            curState = {
                $id : ai
            };
        }
        else{
            curState = {
                $id : ++ai
            };
        }

        history[method](curState, document.title = title || document.title, url || location.href);

        if(stateData){
            for(var key in stateData){
                if(stateData.hasOwnProperty(key)){
                    curState[key] = stateData[key];
                }
            }   
        }

        historyStateMap.splice(ai);
        historyStateMap[curState.$id] = {
            push : forwardFunc,
            pop : backFunc,
            state : curState
        }
        fetch(curState.$id, 'push');

        runList(forwardFuncList);
        runList(changeList);
    }
}
var replaceState = changeState('replaceState');
var pushState = changeState('pushState');
var popState = function(state){
    if(!state){return;}
    var stateObj;
    //back
    if(state.$id < ai - 1){
        fetch(curState.$id, 'pop');
        runList(backFuncList);
    }
    //forward
    else{
        fetch(state.$id, 'push');
        runList(forwardFuncList);
    }
    runList(changeList);
    ai = state.$id + 1;
}
window.addEventListener('popstate', function(e){
    popState(e.state);
    curState = history.state;
});

module.exports = {
    pushState : pushState,
    replaceState : replaceState,
    back : history.back,
    forward : history.forward,
    onpopstate : function(func){
        window.addEventListener('popstate', func);
    },
    onstatechange : function(func){
        changeList.push(func);
    },
    onback : function(func){
        if(typeof func === 'function'){
            backFuncList.push(func);
        }
    },
    onforward : function(func){
        if(typeof func === 'function'){
            forwardFuncList.push(func);
        }
    },
    reload : window.location.reload,
    stack : historyStateMap
}


},{}],11:[function(require,module,exports){
var $ = {};
module.exports = $;

var buildFunc = function(mt){
    return function(){
        var arg = arguments,
            mod;
        var i;
        for(i = 0; i < modList.length; i++){
            mod = mods[modList[i]];
            if(mod[mt] && mod._check && mod._check(mt, arg)){
                return mod[mt].apply($, arguments);
            }
        }
        for(i = 0; i < modList.length; i++){
            mod = mods[modList[i]];
            if(!mod._check){
                return mod[mt].apply($, arguments);
            }
        }
    }
}


var mods = {
    array : require('./src/array'),
    listener : require('./src/listener'),
    object : require('./src/object'),
    dom : require('./src/dom'),
    string : require('./src/string'),
    env : require('./src/env'),
    cache : require('./src/cache')
};
var modList = [
    'array',
    'listener',
    'object',
    'dom',
    'string',
    'env',
    'cache'
];
modList.forEach(function(modName){
    var mod = mods[modName];
    $['_' + modName] = {};
    for(var mt in mod){
        if(mod.hasOwnProperty(mt) && mt[0] !== '_'){
            $['_' + modName][mt] = mod[mt];
            if(!$[mt]){
                $[mt] = mod[mt];
            }
            else{
                $[mt] = buildFunc(mt);
            }
        }
    }
});

$.tween = require('np-tween-ani');
var logTypes = ['log', 'error', 'info', 'warn', 'debug'];
$.log = function(){
    var message = [], mod, type = 'log';
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i] instanceof window.Error){
            type = 'error';
        }
        else if(logTypes.indexOf(arguments[i]) >= 0){
            type = arguments[i];
        }
        else{
            message.push(arguments[i]);
        }
    }
    if(type !== 'log' || $.debug){
        console && console[type].apply(console, message);
    }
};
$.debug = $.querySearch('debug') || false;

window.np = $;
},{"./src/array":13,"./src/cache":14,"./src/dom":15,"./src/env":16,"./src/listener":17,"./src/object":18,"./src/string":19,"np-tween-ani":12}],12:[function(require,module,exports){
var parse = function(){
    var type = 0, args = arguments
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
//就污染window了怎么了？
window.requestAnimationFrame = null
    || window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(callback) {setTimeout(callback, 1000 / 60);};
    //raf优化
var tweenAniAnchor = function(opts){
    opts = parse({
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
    var step = Math.round(duration / spf);
    var tweenTRS = tweenT(opts.type, opts.begin, opts.end, step, opts.extra);
    var startTimer = Date.now(), distance;
    var controll;
    var ani = {
        'stop' : function(){
            controll = true;
        },
        'opts' : opts
    };
    requestAnimationFrame(function(){
        if(controll){return;}
        distance = Date.now() - startTimer;
        if(distance >= duration){
            ani.step = Math.round(duration / spf);
            opts.func.call(ani, opts.end, duration, duration, opts);
            opts.endfunc();
            return;
        }
        ani.step = Math.round(distance / spf);
        opts.func.call(ani, tweenTRS(ani.step), distance, duration, opts);
        requestAnimationFrame(arguments.callee);
    });
    return ani;
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

var tween;
tweenAniAnchor.types = tween = (function(){
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

},{}],13:[function(require,module,exports){
module.exports = {
    unique : function(arr){
        for(var i = arr.length - 1; i >= 0; i--){
            for(var j = i - 1; j >= 0; j--){
                if(arr[i] === arr[j]){
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    },
    each : function(arr, func){
        arr.forEach(func);
    },
    remove : function(arr, elem){
        var index = arr.indexOf(elem);
        if(index >= 0) arr.splice(index, 1);
        return;
    },
    _check : function(name, arg){
        return Array.isArray(arg[0]);
    }
}
var $ = require('../');

},{"../":11}],14:[function(require,module,exports){
var defPrefix = '';
//默认存1个月
var defExp = 30 * 24 * 3600 * 1000;

var getStorage = function(useSession){
    return useSession ? window.sessionStorage : window.localStorage;
}
var expired2Timestamp = function(expired){
    expired = isNaN(expired) ? 0 : expired;
    expired = (!expired || String(expired).length === 13) ? expired : Date.now() + expired;
    return +expired;
}

var Cache = function(prefix){
    this.prefix = prefix || defPrefix;
};
Cache.prototype.get = function(name, protoData){
    var storage = getStorage();
    if(!storage){return null;}
    var stData = storage.getItem(this.prefix + name);
    if(stData === null || protoData){return stData;}
    try{
        stData = JSON.parse(stData);
    }catch(e){}
    var now = Date.now(), expired = stData.expired, data = stData.data;
    return !expired || now < expired ? data : null;
};
//cookie一样..expired为叠加时间ms单位..,储存后expired为过期时间戳,默认时间见上面定义,0为直到地久天长海枯石烂ry
//TODO 长度验证&数量验证
Cache.prototype.set = function(name, value, expired){
    var storage = getStorage();
    if(!storage){return null;}
    try{
        value = JSON.parse(value);
    }catch(e){
    }
    return storage.setItem(this.prefix + name, JSON.stringify({
        timestamp : Date.now(),
        data : value,
        expired : expired2Timestamp(expired === undefined ? defExp : +expired)
    }));
};
//获取本prefix下所有
Cache.prototype.each = function(callback, reverse){
    var storage = getStorage();
    if(!storage){return null;}
    if(typeof callback !== 'function'){return null;}
    !reverse ? 
        (function(self){
            var name;
            for(var i = 0; i < storage.length; i++){
                name = storage.key(i);
                if(name.indexOf(self.prefix) === 0){
                    callback.apply(self, [name, name.replace(self.prefix, '')]);
                }
            }
        })(this) : 
        (function(self){
            var name;
            for(var i = storage.length - 1; i > 0; i--){
                name = storage.key(i);
                if(name.indexOf(self.prefix) === 0){
                    callback.apply(self, [name, name.replace(self.prefix, '')]);
                }
            }
        })(this);
};
//force ? 强制删除全部 : 删除过期的
Cache.prototype.clear = function(force){
    this.each(function(name, subName){
        this.remove(subName, force);
    });
};
//删除一个key
Cache.prototype.remove = function(name, force){
    var storage = getStorage();
    if(!storage){return null;}
    if(force || this.get(name) === null){
        storage.removeItem(this.prefix + name);
    }
};

Cache.prototype.extend = function(prefix){
    if(typeof prefix !== 'string'){
        prefix = '$';
    }
    return new Cache(this.prefix + prefix);
};
var commonCache = new Cache(defPrefix);
Cache.set = commonCache.set;
Cache.get = commonCache.get;
Cache.remove = commonCache.remove;
Cache.clear = commonCache.clear;
Cache.extend = commonCache.extend;
Cache.each = commonCache.each;
Cache.prefix = commonCache.prefix;


module.exports = {
    storage : Cache
};



},{}],15:[function(require,module,exports){


module.exports = {
    find : function(selector, dom){
    return (dom || document).querySelector(selector);
    },
    findAll : function(selector, dom){
        return (dom || document).querySelectorAll(selector);
    },
    contains : function(root, el){
        if(root == el){return true;}
        return !!(root.compareDocumentPosition(el) & 16);
    },
    isNode : function(node){
        return node && typeof node === 'object' && (node.nodeType === 1 || node.nodeType === 9) && typeof node.nodeName === 'string';
    },
    isEventTarget : function(node){
        return node && node.addEventListener;
    },
    inScreen : function(node){
        var t;
        return node && node.scrollWidth && (t = node.getBoundingClientRect().top) >= 0 && (t + node.clientHeight) < document.documentElement.clientHeight;
    },
    ancestor : function(node, selector){
        while(node.parentNode){
            if($.match(node.parentNode, selector)){
                return node.parentNode;
            }
            node = node.parentNode;
        }
        return null;
    },
    create : function(str){
        str = str.trim();
        if(str.slice(0, 1) === '<'){
            var template = document.createElement(str.slice(0, 3) === '<tr' ? 'tbody' : 'template');
            template.innerHTML = str;
            return template.content ? template.content.firstChild : template.firstElementChild;
        }
        else{
            return document.createElement(str);
        }
    },
    remove : function(node){
        if(node && node.parentNode){
            return node.parentNode.removeChild(node);
        }
    },
    match : function(node, selector, context){
        var rs = $.findAll(selector, context);
        if(!rs){return false;}
        return [].indexOf.call(rs, node) >= 0;
    },
    trigger : function(element, evt, args){
        evt = typeof evt === 'string' ? new Event(evt, $.merge({bubbles:true}, args || {}, true)) : evt;
        element.dispatchEvent(evt);
        return this;
    },
    domReady : (function(){
        var readyList = [];
        document.addEventListener('DOMContentLoaded', function(){
            while(readyList.length){
                readyList.pop()();
            }
        })
        return function(func){
            if(document.readyState === 'interactive' || document.readyState === 'complete'){
                func();
            }
            else{
                readyList.push(func);
            }
        }
    })(),
    scrollTo : function(pos, wrap, type){
        wrap = wrap || document.body;
        if(wrap.npKitScrollAni){wrap.npKitScrollAni.stop();}
        if($.tween){
            return wrap.npKitScrollAni = $.tween({
                type : type || 'quart-easeout',
                begin: wrap.scrollTop,
                end  : pos,
                extra : [0.2],
                duration : 500,
                func : function(num){
                    wrap.scrollTop = num;
                },
                endfunc : function(){
                    delete wrap.npKitScrollAni;
                }
            });
        }
        else{
            wrap.scrollTop = pos;
        }
    },
    insertStyle : function(css){
        var s = document.createElement('style');
        s.innerHTML = css;
        document.head.appendChild(s);
        return s;
    },
    load : function(url, contentNode){
        var type = /\.([\w]+)$/.exec(url);
        type = type ? type[1] : '';
        typeof contentNode === 'string' && (type = contentNode, 1) && (contentNode = null);
        contentNode = contentNode || document.head;

        var returnValue;
        switch(type){
            case 'js' : 
                returnValue = document.createElement('script');
                returnValue.src = url;
                contentNode.appendChild(returnValue);
                break;
            case 'css' : 
                returnValue = document.createElement('link');
                returnValue.rel = 'stylesheet';
                returnValue.href = url;
                contentNode.appendChild(returnValue);
                break;
            case 'document' : 
                returnValue = document.createElement('iframe');
                returnValue.style.cssText = 'border:0;margin:0;padding:0;visibility:hidden;height:0;width:0;overflow:hidden;';
                returnValue.src = url;
                contentNode.appendChild(returnValue);
                break;
            default : 
                returnValue = new Image;
                returnValue.src = url;
                break;
        }
        return returnValue;
    }
}
var $ = require('../');
},{"../":11}],16:[function(require,module,exports){
module.exports = {
    envList : ['browser', 'APP'],
    env : (function(){
        var env = /[\?\&]env=([^\#\&\=]+)\b/i.exec(window.location.search);
        if(env){return env[1];}
        if(navigator.platform.indexOf('MacIntel') >= 0 || navigator.platform.indexOf('Win') >= 0){
            return 'browser';
        }
        else if(navigator.userAgent.indexOf('webview') >= 0){
            return 'APP';
        }
        return 'APP';
    })(),
    osList : ['Android', 'IOS', 'Mac', 'Window'],
    os : (function(){
        var os = /[\?\&]os=([^\#\&\=]+)\b/i.exec(window.location.search);
        if(os){return os[1];}
        if(/\bAndroid\b/i.test(navigator.userAgent)){
            return 'Android';
        }
        if(/\biPhone\b/i.test(navigator.userAgent)){
            return 'IOS';
        }
        if(navigator.platform.indexOf('MacIntel') >= 0){
            return 'Mac';
        }
        if(navigator.platform.indexOf('Win') >= 0){
            return 'Window';
        }
        return '';
    })(),
    osVersion : (function(){
        var ua = navigator.userAgent;
        var androidVer = /\bAndroid\s([\d|\.]+)\b/i.exec(ua);
        if(androidVer){
            return androidVer[1];
        }
        var IOSVer = /\biPhone\sOS\s([\d\_]+)\s/i.exec(ua);
        if(androidVer){
            return IOSVer[1];
        }
        //其他有什么用...
        return null;
    })(),
    isLocal : (function(){
        var isLocal = /[\?\&]isLocal=(true|false|0|1)\b/i.exec(window.location.search);
        if(isLocal){return !!+isLocal[1];}
        return /\b(localhost|127.0.0.1)\b/i.test(location.host);
    })()
}
var $ = require('../');

},{"../":11}],17:[function(require,module,exports){
var parseEvtArgs = function(args){
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
        else if(typeof arg === 'boolean' && !(params.capture)){
            params.capture = arg;
        }
    }
    return params;
}

var evtObject = {
    element : null,
    _add : function(evt, key, obj){
        this._list[evt] = this._list[evt] || {};
        this._list[evt][key] = this._list[evt][key] || [];
        this._list[evt][key].push(obj);
    },
    _remove : function(evt, key, check){
        if(!this._list || !this._list[evt] || !this._list[evt][key]){
            return;
        }
        var obj;
        for(var i = this._list[evt][key].length - 1; i >= 0; i--){
            obj = this._list[evt][key][i];
            if(check(obj)){
                this._list[evt][key].splice(i, 1);
            }
        }
    },
    _list : {},
    _each : function(evt, key, func){
        if(this._list && this._list[evt] && this._list[evt][key]){
            this._list[evt][key].forEach(func);
        }
    },
    on : function(){
        var args = parseEvtArgs(arguments);
        var selector = args.selector,
            evt = args.evt,
            callback = args.callback,
            capture = args.capture;
        var element = this.element;
        if(!element){return this;}
        if(!$.isEventTarget(element)){
            this._add(evt, '@', callback);
            return this;
        }
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
            this._add(evt, selector, {
                cb : cb,
                func : callback
            });
            element.addEventListener(evt, cb, capture);
        }
        return this;
    },
    off : function(){
        var args = parseEvtArgs(arguments);
        var selector = args.selector,
            evt = args.evt,
            callback = args.callback,
            capture = args.capture;
        var element = this.element;
        if(!element){return this;}
        if(!$.isEventTarget(element)){
            $._remove(evt, '@', function(obj){
                return obj === callback;
            });
            return this;
        }
        if(!selector){
            element.removeEventListener(evt, callback, capture);
        }
        else{
            this._remove(evt, selector, function(obj){
                if(!callback || obj.func === callback){
                    element.removeEventListener(evt, obj.cb, capture);
                    return true;
                }
            });
        }
        return this;
    }
}
var listener = function(element){
    element = element || window;
    if(element._evtObject){return element._evtObject;}
    element._evtObject = {element:element};
    element._evtObject.__proto__ = evtObject;
    return element._evtObject;
}
var trigger = function(obj, evt, args){
    if(obj._evtObject){
        obj._evtObject._each(evt, '@', function(func){
            try{
                func.apply(obj, args);
            }
            catch(e){
                $.log(e);
            }
        })
    }
}
module.exports = {
    /*写的什么鬼...*/
    evt : listener,
    listener : listener,
    trigger : trigger,
    _check : function(name, arg){
        if(name === 'trigger' && !$.isEventTarget(arg[0])){
            return true;
        }
    }
};
var $ = require('../');

},{"../":11}],18:[function(require,module,exports){
var objMerger = function(needFilter, args){
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
            paramsMap = needFilter ? args[0] : currentObject;
            for(var key in paramsMap){
                if(currentObject.hasOwnProperty(key)){
                    resultObject[key] = currentObject[key];
                }
            }
        }
    }
    return resultObject;
};
module.exports = {
    get : function(data, ns){
        if(!ns){return data;}
        ns = ns.replace(/[\[|\]]/g, '.').replace(/(?:(?:^\.*)|\.{2,}|(?:\.*$))/g, '');
        var nsArr = ns.split('.'), key;
        while(nsArr.length){
            key = nsArr.shift();
            if(!data || typeof data !== 'object'){
                return undefined;
            }
            data = data[key];
        }
        return data;
    },
    set : function(data, ns, value){
        var nsArr = ns.split('.'), 
            key;
        while(nsArr.length > 1){
            key = nsArr.shift();
            if(!data[key] || typeof data[key] !== 'object'){
                data[key] = {};
            }
            data = data[key];
        }
        data[nsArr.pop()] = value;
    },
    merge : function(){
        return objMerger(false, arguments);
    },
    parse : function(){
        return objMerger(true, arguments);
    },
    map : function(obj, func){
        if(typeof obj !== 'object'){return;}
        var rs = [];
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                rs.push(func ? func.call(obj, obj[key], key, obj) : obj[key]);
            }
        }
        return rs;
    },
    each : function(obj, func){
        if(obj.hasOwnProperty('length')){
            return Array.prototype.forEach.call(obj, func);
        }
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                func.call(obj, obj[key], key, obj);
            }
        }
    },
    objectType : function(obj){
        return Object.prototype.toString.call(obj).slice(8, -1);
    },
    isEmptyObject : function(obj){
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    },
    isSimpleObject : function(obj){
        return typeof obj === 'object' && $.objectType(obj) === 'Object';
    },
    _check : function(name, arg){
        return typeof arg[0] === 'object';
    }
}
var $ = require('../');

},{"../":11}],19:[function(require,module,exports){
module.exports = {
    queryStringify : function(obj, notEncode){
        if(typeof obj === 'string'){return obj;}
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
    },
    queryParse : function(str, notDecode){
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
    querySearch : function(key, value){
        if(arguments.length < 2){
            return $.queryParse(location.search.slice(1))[key];
        }
        else{
            var query = $.queryParse(location.search.slice(1));
            query[key] = value;
            return $.queryStringify(query);
        }
    },
    /*
        正则字符串转义
        * . ? + $ ^ [ ] ( ) { } | \ /
    */
    encodeRegExp : function(str){
        return str.replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/])/g, '\\$1');
    },
    trim : function(str, pattern, patternEnd){
        if(typeof str !== 'string'){return str ? str.toString() : '';}
        if(!pattern && !patternEnd){
            return str.trim();
        }
        var startPattern, endPattern;
        startPattern = endPattern = '';
        startPattern = typeof pattern === 'string' ? 
            new RegExp('^' + $.encodeRegExp(pattern)) : 
            $.objectType(pattern) === 'RegExp' ? pattern : '';
        str = startPattern ? str.replace(startPattern, '') : str;

        endPattern = arguments.length <= 2 ? 
                new RegExp($.encodeRegExp(startPattern.source.slice(1)) + '$'):
                typeof patternEnd === 'string' ? 
                    new RegExp($.encodeRegExp(patternEnd) + '$') : 
                    $.objectType(patternEnd) === 'RegExp' ? patternEnd : '';
        return endPattern ? str.replace(endPattern, '') : str;
    }
}
var $ = require('../');

},{"../":11}],20:[function(require,module,exports){
/**
 * 单例
 *
 * 规则：
    1. overscroll:scroll的元素始终可以在对应坐标方向滚动
    2. overscroll:auto的元素如果在对应方向滚动到头则继续向上层寻找可滚动元素
    3. 符合extra条件的元素不能作为选择元素的条件
*/
var startPosY, startPosX, curPosY, curPosX;

var stat = false;

var defaultConfig = {
    //其他不爽的element
    isExtraElement : function(element){
        switch(true){
            case element.tagName === 'INPUT' && element.type === 'range':;
                return true;
            default :
                return false;
        }
    }
};
var config = {};

var notPreventScrollElement = function(element){
    return config.isExtraElement(element) || isScrollElement(element);
}
//能滚的element
var isScrollElement = function(element, whileTouch) {
    var checkFunc = whileTouch ? checkIsScrollElementWhileTouch : checkIsScrollElementWhileScroll;
    while(element) {
        if(checkFunc(element)){
            return element;
        }
        element = element.parentElement;
    }
    return false;
}
var checkIsScrollElementWhileTouch = function(element){
    var style = window.getComputedStyle(element);
    var tmp, check;
    //规则1
    if(style.overflowY === 'scroll' && element.scrollHeight > element.clientHeight){
        check = true;
        if(element.scrollTop === 0){
            element.scrollTop = 1;
        }
        tmp = element.scrollHeight - element.clientHeight;
        if(tmp === element.scrollTop){
            element.scrollTop = tmp - 1;
        }
    }
    if(style.overflowX === 'scroll' && element.scrollWidth > element.clientWidth){
        check = true;
        if(element.scrollLeft === 0){
            element.scrollLeft = 1;
        }
        tmp = element.scrollWidth - element.clientWidth;
        if(tmp === element.scrollLeft){
            element.scrollLeft = tmp - 1;
        }
    }
    if(check){
        return element;
    }
}
var checkIsScrollElementWhileScroll = function(element){
    var style = window.getComputedStyle(element);
    //规则2
    return (
        (style.overflowY === 'scroll' || style.overflowY === 'auto')
        && (
            element.scrollHeight > element.clientHeight
            && !(startPosY <= curPosY && element.scrollTop === 0)
            && !(startPosY >= curPosY && element.scrollHeight - element.scrollTop === element.clientHeight)
        ) 
        || 
        (style.overflowX === 'scroll' || style.overflowX === 'auto')
        && 
            element.scrollWidth > element.clientWidth
            && !(startPosX <= curPosX && element.scrollLeft === 0)
            && !(startPosX >= curPosX && element.scrollWidth - element.scrollLeft === element.clientWidth)
        );
}

//bind
var bindFunc = {
    move : function(e) {
        curPosY = e.touches ? e.touches[0].screenY : e.screenY;
        curPosX = e.touches ? e.touches[0].screenX : e.screenX;
        notPreventScrollElement(e.target) || e.preventDefault();
    },
    start : function(e){
        var target = isScrollElement(e.target, true);
        startPosY = e.touches ? e.touches[0].screenY : e.screenY;
        startPosX = e.touches ? e.touches[0].screenX : e.screenX;
    }
}
var api = module.exports = {
    bind : function(){
        if(!stat){
            stat = true;
            document.addEventListener('touchmove', bindFunc.move, false);
            document.addEventListener('touchstart', bindFunc.start, false);
        }
        return this;
    },
    config : function(cfg){
        cfg = cfg || {};
        config.isExtraElement = cfg.isExtraElement || defaultConfig.isExtraElement;
        return this;
    },
    move : function(nodes, target){
        nodes = nodes ? 
            nodes : 
            'all' in document ?
                [].filter.call(document.all, function(el){
                    return window.getComputedStyle(el).position === 'fixed';
                }) : 
                [];
        target = target || document.body;
        [].forEach.call(nodes, function(el){
            target.appendChild(el);
        });
        return this;
    },
    destory : function(){
        stat = false;
        document.removeEventListener('touchmove', bindFunc.move, false);
        document.removeEventListener('touchstart', bindFunc.start, false);
    }
};
api.config();

},{}]},{},[6]);
