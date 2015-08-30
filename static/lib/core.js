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

},{"np-history":22}],2:[function(require,module,exports){
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
"use strict";

module.exports = function ($) {
    $.domReady(function () {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        window.FastClick && window.FastClick.attach(document.body);
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
    return ga;
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

},{"./componentHandler":1,"./dom":2,"./errorControl":3,"./fastclick":4,"./ga":5,"./keyboardHandler":7,"./lazyload":8,"./pixelFix":9,"np-kit":23,"np-scrollp":32}],7:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var npc;

var contWidth,
    contHeight,
    contPercent = .6,
    R;
var water;

var tan = Math.tan,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    abs = Math.abs,
    sqrt = Math.sqrt,
    pow = Math.pow,
    max = Math.max,
    min = Math.min,
    random = Math.random;

var mainColor = 177,

// var mainColor = 330,
color_lite = 'hsl(' + mainColor + ', 61.23%, 90%)',
    color_base = 'hsl(' + mainColor + ', 61.23%, 72%)',
    color_deep = 'hsl(' + (mainColor + 5) + ', 71.23%, 60%)',
    color_border = 'hsl(' + mainColor + ', 51.23%, 50%)';
var defaultDeg = 90;
var toArc = function toArc(deg) {
    return deg * 2 * PI / 360;
};

var initWater = function initWater() {
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight, 2) + pow(contWidth, 2));

    //TODO优化
    var gradient = npc.ctx.createLinearGradient(0, 0, 0, contHeight);
    gradient.addColorStop(0, color_lite);
    gradient.addColorStop(0.5, color_base);
    gradient.addColorStop(1, color_deep);

    water = npc.create(.5 * contWidth, .5 * contHeight, function (ctx, fps) {
        // this.rotate += this.targetRotateDis * 2 / fps;
        this.rotate += (this.targetRotate - this.rotate) / fps;
        this.deg += (this.targetDeg - this.deg) / fps;

        var px = R * sin(this.deg) | 0,
            py = R * cos(this.deg) | 0;
        var arcTime, wave;

        ctx.rotate(toArc(this.rotate));

        ctx.beginPath();

        ctx.arc(0, 0, R, PI / 2 + this.deg, PI / 2 - this.deg, true);

        arcTime = sin(toArc(this.timer++));
        wave = arcTime * min(100, R - abs(py)) | 0;
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(0, py + wave, 0, py - wave, -px, py);

        ctx.strokeStyle = color_border;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    });
    water.timer = 0;
    water.rotate = 0;
    water.deg = toArc(defaultDeg);
    setWater(0, defaultDeg);
    npc.add(water);
};

var setWater = function setWater(rotate, deg) {
    rotate = rotate === null ? water.targetRotate : rotate;
    water.rotate = water.rotate % 360;

    water.targetRotate = -rotate % 360;
    // water.targetRotateDis = -rotate - water.rotate;
    if (water.targetRotate > 180) {
        water.targetRotate -= 360;
    }
    if (water.targetRotate < -180) {
        water.targetRotate += 360;
    }
    // document.getElementsByTagName('h1')[0].innerHTML = water.rotate;
    water.targetDeg = toArc(deg);
    // npc.canvas.style.backgroundColor = 'hsla(177, 61.23%, 55%, '+ min(.1, max(0, 1 - water.deg + 1.13 - .6))+')';
};
var calcHorizon = function calcHorizon(x, y, z) {
    var g1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var rotate = Math.acos(y / g1) * 360 / 2 / Math.PI;
    // document.getElementsByTagName('h1')[0].innerHTML = g1 / 10;
    var deg = (z < 0 ? g1 : 10 - g1 + 14) / 10 / 2 * 180;

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    deg = max(80, min(deg, 180));
    setWater(rotate, deg);
};

var initBase = function initBase(engine) {
    npc = engine;
    initWater();
    var lock = false;
    var counter = 0;
    if (window.DeviceOrientationEvent) {
        window.addEventListener('devicemotion', function (e) {
            if (counter++ > 3) {
                counter = 0;
                if (lock) {
                    return;
                }
                calcHorizon(e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z);
            }
        });
    }

    var battery = navigator.battery || navigator.webkitBattery;
    if (battery) {
        battery.addEventListener("levelchange", function (e) {
            if (battery.level < .5) {
                npc.stop();
            }
        });
    }
};
exports['default'] = {
    init: initBase,
    name: 'Aqua'
};
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npCanvas = require('np-canvas');

var _npCanvas2 = _interopRequireDefault(_npCanvas);

var _aqua = require('./aqua');

var _aqua2 = _interopRequireDefault(_aqua);

var npc;

exports['default'] = function ($, core) {
    $.domReady(function () {
        var canvas = $.find('#npc');
        if (!canvas) {
            return;
        }
        npc = canvas.engine = new _npCanvas2['default'](canvas, {
            fitSize: true,
            pixelRatio: 1
        });
        _aqua2['default'] && _aqua2['default'].init(npc);
        npc.play();

        $.evt(document.body).on('click', '[data-npc]', function () {
            if (this.dataset.npc === 'pause') {
                npc.pause();
                this.dataset.npc = 'play';
            } else if (this.dataset.npc === 'play') {
                npc.play();
                this.dataset.npc = 'pause';
            }
        });
    });
    return npc;
};

module.exports = exports['default'];

},{"./aqua":10,"np-canvas":21}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _npKit = require('np-kit');

var _npKit2 = _interopRequireDefault(_npKit);

var _spa = require('./spa');

var _spa2 = _interopRequireDefault(_spa);

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var _background = require('./background');

var _background2 = _interopRequireDefault(_background);

_npKit2['default'].debug = true;

var spa = (0, _spa2['default'])(_npKit2['default'], _base2['default']);
var nav = (0, _nav2['default'])(_npKit2['default'], _base2['default']);
var background = (0, _background2['default'])(_npKit2['default'], _base2['default']);

_npKit2['default'].listener(spa.Page).on('beforechange', function (uri, controller) {
    nav.set(controller);
});

window.alpha = _npKit2['default'].merge(_npKit2['default'], _base2['default'], {
    loadPage: spa.loadPage,
    register: spa.register,
    controllers: spa.controllers,
    pages: spa.pages,

    nav: nav
}, true);

exports['default'] = alpha;
module.exports = exports['default'];

},{"../base":6,"./background":11,"./nav":13,"./spa":16,"np-kit":23}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var nav, api;

exports['default'] = function ($) {
    api = {
        set: function set(page) {
            if (!nav) {
                return;
            }
            [].forEach.call($.findAll('.cur', nav), function (node) {
                node.classList.remove('cur');
            });
            [].some.call($.findAll('[data-for]', nav), function (li) {
                if (li.dataset['for'].split(',').indexOf(page) >= 0 && ! +li.dataset['hide']) {
                    li.classList.add('cur');
                    return true;
                }
            }) ? api.show() : api.hide();
        },
        show: function show() {
            nav && nav.classList.add('show');
        },
        hide: function hide() {
            nav && nav.classList.remove('show');
        }
    };
    $.domReady(function () {
        nav = $.find('#mainnav');

        nav.set = api.set;
        nav.show = api.show;
        nav.hide = api.hide;
    });
    return api;
};

module.exports = exports['default'];

},{}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _npKit = require('np-kit');

var _npKit2 = _interopRequireDefault(_npKit);

var controllers = {};

var Controller = (function () {
    function Controller(name) {
        _classCallCheck(this, Controller);

        if (controllers[name]) {
            return controllers[name];
        }
        if (!(this instanceof Controller)) {
            return new Controller(name);
        }

        controllers[name] = this;

        this.name = name;
        this.list = [];
        this.lifecycle = {};
        this.state = 0;
    }

    _createClass(Controller, [{
        key: 'add',
        value: function add(page) {
            this.list.push(page);
        }
    }, {
        key: 'set',
        value: function set(conf) {
            this.state = 1;
            _npKit2['default'].merge(this.lifecycle, conf, true);
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this.lifecycle[name];
        }
    }, {
        key: 'check',
        value: function check() {
            this.list.forEach(function (page) {
                if (page.state === page.SHOW && page.loader !== page.INITED) {
                    page.show(true);
                }
            });
        }
    }]);

    return Controller;
})();

;
Controller.list = controllers;

module.exports = Controller;

},{"np-kit":23}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npKit = require('np-kit');

var _npKit2 = _interopRequireDefault(_npKit);

var _base = require('../../base');

var _base2 = _interopRequireDefault(_base);

// var loadingTemplate = '<div data-node="pageloading" class="loading" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>';
var contentTemplate = ['<div class="page-wrap" data-page>',
// loadingTemplate,
'</div>'].join('');

var wrapper;

var getWrapper = function getWrapper() {
    return wrapper || (wrapper = _npKit2['default'].find('#wrapper'));
};

exports['default'] = {
    build: function build(page) {
        return _npKit2['default'].create(contentTemplate);
    },
    hide: function hide(page) {
        page.run('hide');
        _base2['default'].animate(page.node, 'fadeOutDown', function () {
            _npKit2['default'].remove(page.node);
            page.run('afterHide');
        }, true);
    },
    show: function show(page) {
        // getWrapper().innerHTML = '';
        page.run('beforeShow');
        if (page.node.parentNode !== getWrapper()) {
            getWrapper().appendChild(page.node);
            _base2['default'].animate(page.node, 'fadeInDown', null, true);
        }
        if (page.loader < page.LOADED) {
            document.body.classList.add('loading');
            return;
        } else {
            document.body.classList.remove('loading');
        }
        if (page.loader < page.INITED) {
            page.run('init');
            page.loader = page.INITED;
        }
        page.run('show');
    }
};
module.exports = exports['default'];

},{"../../base":6,"np-kit":23}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npKit = require('np-kit');

var _npKit2 = _interopRequireDefault(_npKit);

var _npHistory = require('np-history');

var _npHistory2 = _interopRequireDefault(_npHistory);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var go = function go(href) {
    _npHistory2['default'].pushState(null, '', href);
    new _page2['default'](location.pathname).show();
};

exports['default'] = function () {
    _npKit2['default'].evt(document).on('click', 'a[href^="/"]', function (e) {
        var target = this.getAttribute('target');
        if (target) {
            return;
        }
        e.preventDefault();
        var href = this.getAttribute('href');
        go(href);
    });

    _npKit2['default'].domReady(function () {
        _npHistory2['default'].onpopstate(function () {
            new _page2['default'](location.pathname).show();
        });
        _npHistory2['default'].replaceState(null, '', location.pathname);
        new _page2['default'](location.pathname).show();
    });
    return {
        register: function register(controller, factory) {
            controller = new _controller2['default'](controller);
            controller.set(factory.call(controller, _npKit2['default']));
            controller.check();
        },
        loadPage: function loadPage(uri, contentNode, _ref) {
            var _ref$scripts = _ref.scripts;
            var scripts = _ref$scripts === undefined ? [] : _ref$scripts;
            var _ref$styles = _ref.styles;
            var styles = _ref$styles === undefined ? [] : _ref$styles;

            var page = new _page2['default'](uri);
            if (page.loader > page.LOADING) {
                return;
            }
            page.needInit = !!scripts.length;
            page.setContent(contentNode.innerHTML);
            contentNode.innerHTML = '';
            styles.forEach(function (url) {
                if (url[0] === '/' || url[0] === '.') {
                    _npKit2['default'].load(url);
                } else {
                    _npKit2['default'].insertStyle(url);
                }
            });
            scripts.forEach(function (url) {
                if (url[0] === '/' || url[0] === '.') {
                    _npKit2['default'].load(url);
                } else {
                    eval(url);
                }
            });
        },
        load: go,

        Page: _page2['default'],
        Controller: _controller2['default'],

        controllers: _controller2['default'].list,
        pages: _page2['default'].list
    };
};

module.exports = exports['default'];

},{"./controller":14,"./page":17,"np-history":22,"np-kit":23}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _npKit = require('np-kit');

var _npKit2 = _interopRequireDefault(_npKit);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _effect = require('./effect');

var _effect2 = _interopRequireDefault(_effect);

var parseUrl = function parseUrl(url) {
    url = url.split('#')[0].split('?')[0];
    var match = /^(?:[\w]+\:\/\/[^\/]+)?(\/?([^\/]+)[\s\S]*)$/.exec(url);
    return {
        controller: match ? match[2] : 'index',
        uri: match ? match[1] : '/index'
    };
};
//#################################################################################
var pages = {};

var Page = (function () {
    function Page(url) {
        _classCallCheck(this, Page);

        var _parseUrl = parseUrl(url);

        var controller = _parseUrl.controller;
        var uri = _parseUrl.uri;

        if (!(this instanceof Page) && !pages[uri]) {
            return null;
        }
        if (pages[uri]) {
            return pages[uri];
        }

        pages[uri] = this;

        this.controller = new _controller2['default'](controller);
        this.controllerKey = controller;
        this.name = this.uri = uri;

        this.controller.add(this);

        this.node = _effect2['default'].build();
        this.node.dataset.page = this.controllerKey;
        this.node.dataset.uri = this.uri;

        this._state = this.HIDE;
        this.loader = this.WAIT;
        this.needInit = false;
    }

    _createClass(Page, [{
        key: 'run',
        value: function run(lifecycle) {
            var func = this.controller.get(lifecycle);
            if (typeof func === 'function') {
                _npKit2['default'].log('page ' + lifecycle + ':' + this.name, 'info');

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                func.call.apply(func, [this].concat(args));
            }
        }
    }, {
        key: 'show',
        value: function show(force) {
            Page.show(this.uri, force);
        }
    }, {
        key: 'load',
        value: function load() {
            this.state = this.WAIT;
        }
    }, {
        key: 'setContent',
        value: function setContent(html) {
            this.node.innerHTML = html;
            this.loader = this.DOMREADY;
        }
    }, {
        key: 'loader',
        get: function get() {
            if (this._loader === this.DOMREADY && this.controller.state) {
                this._loader = this.LOADED;
            }
            return this._loader;
        },
        set: function set(value) {
            if (value <= this._loader) {
                return value;
            }
            var self = this;
            switch (value) {
                case this.WAIT:
                    this.loader = this.LOADING;
                    break;
                case this.LOADING:
                    var i = document.createElement('iframe');
                    i.style.cssText = 'display:block;visibility:hidden;overflow:hidden;width:0;height:0;';
                    i.onload = i.onerror = function (e) {
                        document.body.removeChild(i);
                        self.loader = e.type === 'load' ? self.DOMREADY : self.FAILED;
                    };
                    i.src = '/pages' + self.uri;
                    document.body.appendChild(i);
                    break;
                case this.DOMREADY:
                    break;
                case this.LOADED:
                    break;
                case this.FAILED:
                    break;
                case this.INITED:
                    break;
                default:
                    return value;
            }
            this._loader = value;
            return value;
        }
    }, {
        key: 'state',
        get: function get() {
            return this._state;
        },
        set: function set(value) {
            switch (value) {
                case this.SHOW:
                    _effect2['default'].show(this);
                    break;
                case this.HIDE:
                    _effect2['default'].hide(this);
                    break;
                default:
                    return value;
            }
            this._state = value;
            return value;
        }
    }], [{
        key: 'show',
        value: function show(url, force) {
            var _parseUrl2 = parseUrl(url);

            var controller = _parseUrl2.controller;
            var uri = _parseUrl2.uri;

            var pageHide, pageShow;
            pageHide = Page.current && new Page(Page.current);
            pageShow = new Page(url);

            if (Page.current === uri && !force) {
                return;
            }
            _npKit2['default'].trigger(Page, 'beforechange', [uri, controller]);
            if (Page.current !== uri && pageHide) {
                pageHide.state = pageHide.HIDE;
            }

            Page.current = uri;
            Page.currentController = controller;

            pageShow.state = pageShow.SHOW;

            _npKit2['default'].trigger(Page, 'change', [uri, controller]);
        }
    }]);

    return Page;
})();

Page.list = pages;
Page.parseUrl = parseUrl;
Page.current = null;
Page.currentController = null;

Page.prototype.WAIT = 0;
Page.prototype.LOADING = 1;
Page.prototype.DOMREADY = 2;
Page.prototype.LOADED = 4;
Page.prototype.FAILED = 5;
Page.prototype.INITED = 9;

Page.prototype.SHOW = 8;
Page.prototype.HIDE = 9;

exports['default'] = Page;
module.exports = exports['default'];

},{"./controller":14,"./effect":15,"np-kit":23}],18:[function(require,module,exports){
var requestAnimationFrame = require('./kit').requestAnimationFrame;
var merge = require('./kit').merge;
var CanvasObject = require('./object');

var max = Math.max;

var sWidth = screen.width;

var stat = {
    STOP    : 0,
    PAUSE   : 1,
    PLAY    : 2,
    WAIT    : 4,
    DESTROY : 9
}
var evt = {
    renderCallback  : 'renderCallback',
    fpsCount        : 'fpsCount'
}

var Engine = function(canvasNode, config){
    if(!canvasNode){throw 'canvasNode not found';}
    this.list = [];

    this.canvas = canvasNode;
    this.ctx = canvasNode.getContext('2d');

    this.fps = 60;                                      //fps
    this.number = 0;                                    //渲染物体数量

    this.config = merge({
        fitSize     : true                              //初始适应canvas节点尺寸
        ,pixelRatio : window.devicePixelRatio || 1      //分辨率
        ,lineFix    : true                              //0.5像素边缘修正
        ,fpsLimit    : null                             //限制渲染数
        ,perspective : null                             //透视平面距离, 800
        ,visionWidth : null                           //0距离尺寸

        ,engine     : this
        ,set : this._setConfig
    }, config);
    this.config.set.call(this, this.config);
}
//object
Engine.create = function(x, y, shape){
    return new CanvasObject(x, y, shape);
}
Engine.object = CanvasObject;
//method
Engine.prototype = {
    constructor : Engine,

    _setConfig : function(config){
        var context = this.engine || this;
        config = config || {};

        context.config = merge(context.config, config, true);

        if(config.fitSize){
            context.width = context.canvas.clientWidth * context.config.pixelRatio;
            context.height = context.canvas.clientHeight * context.config.pixelRatio;
        }
        if(config.lineFix){
            context.ctx.translate(.5, .5);
        }
        if(typeof config.fpsLimit === 'number'){
            context._fpsFrequency = config.fpsLimit;
            context.requestAnimationFrame = function(func){
                setTimeout(func, 1000/config.fpsLimit);
            }
        }
        else{
            context._fpsFrequency = 60;
            context.requestAnimationFrame = requestAnimationFrame;
        }
        context.visionWidth = config.visionWidth || sWidth * 5 * context.config.pixelRatio;
    },
    set width(value){
        this.canvas && (this.canvas.width = value);
        return value;
    },
    get width(){
        return this.canvas.width;
    },
    set height(value){
        this.canvas && (this.canvas.height = value);
        return value;
    },
    get height(){
        return this.canvas.height;
    },
    //control---------------------------------------------
    stat : stat,
    _status : stat.STOP,   
    set status(value){
        this.fire('stateChange');
        if(this._status === this.stat.DESTROY){return;}
        return this._status = value;
    },
    get status(){
        return this._status;
    },

    play : function(){
        if(this.status === this.stat.STOP){
            this.timestamp = Date.now();
            this.status = this.stat.PLAY;
            this.refresh();
        }
        this.status = this.stat.PLAY;
        return this;
    },
    stop : function(){
        this.status = this.stat.STOP;
        this.clean();
        this.number = 0;
        return this;
    },
    pause : function(){
        this.status = this.stat.PAUSE;
        return this;
    },

    refresh : function(){
        if(this.status === this.stat.DESTROY){return;}
        if(this.status === this.stat.PLAY){
            this.number = 0;
            if(!this.static){
                this.ctx.clearRect(0, 0, this.width, this.height);
                
                this.render(this.list);
            }
            else{
                this.clean();
            }
            this.frame++;
            this.fire(evt.renderCallback);   
            if(this.number === 0){
                this.status = this.stat.WAIT;
            }
        }
        this.fpsCalc();
        (null, this.requestAnimationFrame)(this.refresh.bind(this));
    },
    requestAnimationFrame : requestAnimationFrame,
    //render---------------------------------------------
    static : false, //静态
    render : function(list){
        var obj, 
            fps = this.fps, 
            context = this.ctx;
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            if(Array.isArray(obj)){
                this.render(obj);
            }
            else{
                obj.life = this.timestamp - obj.timestamp;
                context.save();
                if(this.config.perspective && obj.z){
                    //TODO z > perspective
                    var scale = 1 + (obj.z / this.config.perspective) * (this.visionWidth / this.width - 1);
                    context.scale(scale, scale);
                    context.translate(obj.x, obj.y);
                }
                else{
                    context.translate(obj.x, obj.y);
                }
                obj.draw(context, max(fps, 30));
                this.number++;
                context.restore();
                if(obj.die){
                    list.splice(i, 1);
                    i--;
                }
            }
        };
        return this;
    },
    //object---------------------------------------------
    create : Engine.create,
    add : function(obj, list){
        (list || this.list).push(obj);
        obj.engine = this;
        obj.timestamp = this.timestamp;
        obj.life = 0;
        if(this.status === this.stat.WAIT){
            this.status = this.stat.PLAY;
        }
        return this;
    },
    del : function(obj){
        obj.die = true;
        return this;
    },
    clean : function(){
        this.list.splice(0, this.list.length);
    },
    //listener---------------------------------------------
    _listener : {},
    on : function(evt, func){
        if(typeof evt !== 'string' || typeof func !== 'function'){return this;}
        if(!Array.isArray(this._listener[evt])){
            this._listener[evt] = [];
        }
        this._listener[evt].push(func);
        return this;
    },
    off : function(evt, func){
        if(typeof evt !== 'string' || typeof func !== 'function'){return this;}
        if(!Array.isArray(this._listener[evt])){return this;}
        var index = this._listener[evt].indexOf(func);
        if(index < 0){return this;}
        this._listener[evt].splice(index, 1);
        return this;
    },
    fire : function(evt, args){
        if(!Array.isArray(this._listener[evt])){return this;}
        var npc = this;
        this._listener[evt].forEach(function(func){
            func.apply(npc, args);
        });
        return this;
    },
    //fps---------------------------------------------
    timestamp : null,
    frame : 0,
    _fpsCounter : 1,
    _fpsFrequency : 60,
    fpsCalc : function(){
        if(this._fpsCounter++ >= this._fpsFrequency){
            this.fire(evt.fpsCount);
            this.fps = (this._fpsFrequency / (Date.now() - this.timestamp) * 1000).toFixed(2);
            this.timestamp = Date.now();
            this._fpsCounter = 1;
        }
    },
    //distroy---------------------------------------------
    destroy : function(){
        this.stop();
        this.status = this.stat.DESTROY;
        this.clean();
    }
};

if(typeof window.define === 'function'){
    define('NPCanvas', Engine);
}
module.exports = window.NPCanvas = Engine;
},{"./kit":19,"./object":20}],19:[function(require,module,exports){
var $ = {
    requestAnimationFrame : null
        || window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.oRequestAnimationFrame
        || function(callback) {setTimeout(callback, 1000 / 60);},
    merge : function(){
        var hold = typeof arguments[arguments.length - 1] === 'boolean', 
            holdRs = hold && arguments[arguments.length - 1];
        var rs = holdRs ? arguments[0] : {}, 
            cur, 
            args = arguments;
        for(var i = holdRs ? 1 : 0, j = arguments.length + (hold ? -1 : 0); i < j; i++){
            cur = arguments[i];
            if(typeof cur === 'object'){
                for(var key in cur){
                    if(cur.hasOwnProperty(key)){
                        rs[key] = cur[key];
                    }
                }   
            }
        }
        return rs;
    }
}
module.exports = $;
},{}],20:[function(require,module,exports){

var marker = 'np';
var CanvasObject = function(x, y, shape){
    if(typeof x === 'function'){
        shape = x;
        x = 0;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = 0;
    this.shape = shape || function(){};
    this.die = false;
}
//构造器扩展构造器
CanvasObject.extend = function(newClassConstructor, proto){
    if(typeof newClassConstructor !== 'function'){
        newClassConstructor = function(){}
    }
    var parentFactory = this;
    if(!(this instanceof CanvasObject)){
        parentFactory = CanvasObject;
    }
    newClassConstructor.__proto__ = parentFactory;
    newClassConstructor.prototype = proto || new parentFactory;
    return newClassConstructor;
}
//对象扩展对象，或构造器
CanvasObject.prototype.extend = function(newClassConstructor){
    //构造器的话就用原来的extend啦
    if(typeof newClassConstructor === 'function'){
        return this.constructor.extend(newClassConstructor, this);
    }
    else{
        //对象扩展
        if(typeof newClassConstructor !== 'object' || newClassConstructor.toString() !== '[object Object]'){
            newClassConstructor = {};
        }
        newClassConstructor.__proto__ = this;
        return newClassConstructor;
    }
}

//绘制
CanvasObject.prototype.draw = function(ctx, fps){
    this.shape(ctx, fps);
}
//hit
// TODO
CanvasObject.prototype.hit = function(ctx, fps){
}
module.exports = CanvasObject;
},{}],21:[function(require,module,exports){
module.exports = require('./dev/engine');
},{"./dev/engine":18}],22:[function(require,module,exports){
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


},{}],23:[function(require,module,exports){
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
},{"./src/array":25,"./src/cache":26,"./src/dom":27,"./src/env":28,"./src/listener":29,"./src/object":30,"./src/string":31,"np-tween-ani":24}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"../":23}],26:[function(require,module,exports){
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



},{}],27:[function(require,module,exports){


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
},{"../":23}],28:[function(require,module,exports){
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

},{"../":23}],29:[function(require,module,exports){
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

},{"../":23}],30:[function(require,module,exports){
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

},{"../":23}],31:[function(require,module,exports){
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

},{"../":23}],32:[function(require,module,exports){
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

},{}]},{},[12]);
