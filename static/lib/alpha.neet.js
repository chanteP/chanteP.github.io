/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _kit = __webpack_require__(3);

	var _kit2 = _interopRequireDefault(_kit);

	window.$config = window.$config || {};
	window.$data = window.$data || {};

	var api = _kit2['default'];

	_kit2['default'].add = function (mod) {
	    _kit2['default'].merge(api, typeof mod === 'function' ? mod(_kit2['default']) : mod, true);
	};

	_kit2['default'].add(__webpack_require__(4));
	__webpack_require__(5)(_kit2['default'], ['os', 'env', 'deviceLevel', 'debug', 'devkit']);
	_kit2['default'].add(__webpack_require__(6));

	exports['default'] = api;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-22 16:08:27","hash":""} */
	/*
	    DOM扩展
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var parseEvtArgs = function parseEvtArgs() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    var params = {},
	        arg;
	    for (var i = 0, j = args.length; i < j; i++) {
	        arg = args[i];
	        if (typeof arg === 'string' && !params.evt) {
	            params.evt = arg;
	        } else if (typeof arg === 'string' && !params.selector) {
	            params.selector = arg;
	        } else if (typeof arg === 'function' && !params.callback) {
	            params.callback = arg;
	        } else if (typeof arg === 'boolean' && !params.capture) {
	            params.capture = arg;
	        }
	    }
	    return params;
	};

	var evtObject = {
	    element: null,
	    _add: function _add(evt, key, obj) {
	        if (!this._list) {
	            this._list = {};
	        }
	        this._list[evt] = this._list[evt] || {};
	        this._list[evt][key] = this._list[evt][key] || [];
	        this._list[evt][key].push(obj);
	    },
	    _remove: function _remove(evt, key, check) {
	        if (!this._list || !this._list[evt] || !this._list[evt][key]) {
	            return;
	        }
	        var obj;
	        for (var i = this._list[evt][key].length - 1; i >= 0; i--) {
	            obj = this._list[evt][key][i];
	            if (check(obj)) {
	                this._list[evt][key].splice(i, 1);
	            }
	        }
	    },
	    _list: null,
	    _each: function _each(evt, key, func) {
	        if (this._list && this._list[evt] && this._list[evt][key]) {
	            this._list[evt][key].forEach(func);
	        }
	    },
	    on: function on() {
	        var args = parseEvtArgs.apply(undefined, arguments);
	        var selector = args.selector,
	            evt = args.evt,
	            callback = args.callback,
	            capture = args.capture;
	        var element = this.element;
	        if (!element) {
	            return this;
	        }
	        if (!$.isEventTarget(element)) {
	            this._add(evt, '@', callback);
	            return this;
	        }
	        if (!selector) {
	            element.addEventListener(evt, callback, capture);
	        } else {
	            var cb = function cb(e) {
	                var target = e.target;
	                while (target && target !== element.parentNode) {
	                    if ($.match(target, selector, element)) {
	                        callback.call(target, e);
	                        return true;
	                    }
	                    target = target.parentNode;
	                }
	            };
	            this._add(evt, selector, {
	                cb: cb,
	                func: callback
	            });
	            element.addEventListener(evt, cb, capture);
	        }
	        return this;
	    },
	    off: function off() {
	        var args = parseEvtArgs.apply(undefined, arguments);
	        var selector = args.selector,
	            evt = args.evt,
	            callback = args.callback,
	            capture = args.capture;
	        var element = this.element;
	        if (!element) {
	            return this;
	        }
	        if (!$.isEventTarget(element)) {
	            $._remove(evt, '@', function (obj) {
	                return obj === callback;
	            });
	            return this;
	        }
	        if (!selector) {
	            element.removeEventListener(evt, callback, capture);
	        } else {
	            this._remove(evt, selector, function (obj) {
	                if (!callback || obj.func === callback) {
	                    element.removeEventListener(evt, obj.cb, capture);
	                    return true;
	                }
	            });
	        }
	        return this;
	    }
	};
	var $ = {
	    get: function get(data, ns) {
	        if (!ns) {
	            return data;
	        }
	        ns = ns.replace(/[\[|\]]/g, '.').replace(/(?:(?:^\.*)|\.{2,}|(?:\.*$))/g, '');
	        var nsArr = ns.split('.'),
	            key;
	        while (nsArr.length) {
	            key = nsArr.shift();
	            if (!data || typeof data !== 'object') {
	                return undefined;
	            }
	            data = data[key];
	        }
	        return data;
	    },
	    set: function set(data, ns, value) {
	        var nsArr = ns.split('.'),
	            key;
	        while (nsArr.length > 1) {
	            key = nsArr.shift();
	            if (!data[key] || typeof data[key] !== 'object') {
	                data[key] = {};
	            }
	            data = data[key];
	        }
	        data[nsArr.pop()] = value;
	    },
	    merge: function merge() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        var resultObject, currentObject;
	        var checkHolder = typeof args[args.length - 1] === 'boolean';
	        var hold = checkHolder && args[args.length - 1];
	        resultObject = checkHolder && hold ? args[0] : {};
	        for (var i = 0, j = args.length - +checkHolder; i < j; i++) {
	            currentObject = args[i];
	            if (typeof currentObject === 'object') {
	                for (var key in currentObject) {
	                    if (currentObject.hasOwnProperty(key)) {
	                        resultObject[key] = currentObject[key];
	                    }
	                }
	            }
	        }
	        return resultObject;
	    },
	    queryStringify: function queryStringify(obj, notEncode) {
	        if (typeof obj === 'string') {
	            return obj;
	        }
	        var rs = [],
	            key,
	            val;
	        for (var name in obj) {
	            if (!obj.hasOwnProperty(name)) {
	                continue;
	            }
	            key = notEncode ? name : encodeURIComponent(name);
	            val = obj[key] === undefined || obj[key] === null ? '' : notEncode ? obj[key].toString() : encodeURIComponent(obj[key].toString());
	            rs.push(key + '=' + val);
	        }
	        return rs.join('&');
	    },
	    queryParse: function queryParse(str, notDecode) {
	        var rs = {};
	        if (typeof str != 'string' || !str) {
	            return rs;
	        }
	        var rsArr = str.split('&'),
	            unit,
	            key,
	            val;
	        while (rsArr.length) {
	            unit = rsArr.pop().split('=');
	            key = (notDecode ? unit[0] : decodeURIComponent(unit[0])).trim();
	            val = unit[1] === undefined ? '' : (notDecode ? unit[1] : decodeURIComponent(unit[1])).trim();
	            if (key in rs) {
	                rs[key] = [rs[key]];
	                rs[key].push(val);
	            } else {
	                rs[key] = val;
	            }
	        }
	        return rs;
	    },
	    querySearch: function querySearch() {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        var key = args[0],
	            value = args[1];
	        if (args.length < 2) {
	            return $.queryParse(location.search.slice(1))[key];
	        } else {
	            var query = $.queryParse(location.search.slice(1));
	            query[key] = value;
	            return $.queryStringify(query);
	        }
	    },
	    find: function find(selector, dom) {
	        return (dom || document).querySelector(selector);
	    },
	    findAll: function findAll(selector, dom) {
	        return (dom || document).querySelectorAll(selector);
	    },
	    contains: function contains(root, el) {
	        if (root == el) {
	            return true;
	        }
	        return !!(root.compareDocumentPosition(el) & 16);
	    },
	    isNode: function isNode(value) {
	        return !!value && value.nodeType === 1;
	    },
	    firstElementChild: function firstElementChild(outer) {
	        var target = outer.firstChild;
	        while (target) {
	            if ($.isNode(target)) {
	                return target;
	            }
	            target = target.nextSibling;
	        }
	        return null;
	    },
	    isEventTarget: function isEventTarget(node) {
	        return node && node.addEventListener;
	    },
	    ancestor: function ancestor(node, selector) {
	        while (node.parentNode) {
	            if ($.match(node.parentNode, selector)) {
	                return node.parentNode;
	            }
	            node = node.parentNode;
	        }
	        return null;
	    },
	    create: function create(str) {
	        str = str.trim();
	        if (str.slice(0, 1) === '<') {
	            var template = document.createElement(str.slice(0, 3) === '<tr' ? 'tbody' : 'template');
	            template.innerHTML = str;
	            return $.firstElementChild(template.content ? template.content : template);
	        } else {
	            return document.createElement(str);
	        }
	    },
	    remove: function remove(node) {
	        if (node && node.parentNode) {
	            return node.parentNode.removeChild(node);
	        }
	    },
	    match: function match(node, selector, context) {
	        var rs = $.findAll(selector, context);
	        if (!rs) {
	            return false;
	        }
	        return [].indexOf.call(rs, node) >= 0;
	    },
	    listener: function listener(element) {
	        element = element || window;
	        if (element._evtObject) {
	            return element._evtObject;
	        }
	        element._evtObject = { element: element };
	        element._evtObject.__proto__ = evtObject;
	        return element._evtObject;
	    },
	    createEvent: function createEvent(evtName, args) {
	        var e;
	        try {
	            e = new Event(evtName, $.merge({ bubbles: true }, args || {}, true));
	        } catch (err) {
	            e = document.createEvent('Event');
	            // Define that the event name is 'build'.
	            e.initEvent(evtName, true, true);
	        }
	        return e;
	    },
	    trigger: function trigger(element, evt, args) {
	        if (element && element.addEventListener) {
	            evt = typeof evt === 'string' ? $.createEvent(evt, args) : evt;
	            element.dispatchEvent(evt);
	        } else if (element._evtObject) {
	            element._evtObject._each(evt, '@', function (func) {
	                try {
	                    func.apply(element, args);
	                } catch (e) {
	                    console && console.log(e);
	                }
	            });
	        }
	    },
	    channel: {
	        topics: {},
	        pub: function pub(ch, args) {
	            $.trigger($.channel.topics, ch, args);
	        },
	        sub: function sub(ch, func) {
	            $.trigger($.channel.topics).on(ch, func);
	        },
	        ubsub: function ubsub(ch, func) {
	            $.trigger($.channel.topics).off(ch, func);
	        }
	    },
	    domReady: (function (doc) {
	        var readyList = [];
	        doc.addEventListener('DOMContentLoaded', function () {
	            while (readyList.length) {
	                readyList.pop()();
	            }
	        });
	        return function (func) {
	            if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
	                func();
	            } else if (typeof func === 'function') {
	                readyList.push(func);
	            }
	        };
	    })(document),
	    scrollTo: function scrollTo(pos, wrap, type) {
	        wrap = wrap || document.getElementById('wrapper') || document.body;
	        var prop = 'scrollTop';
	        if (Object.prototype.toString.call(pos) === '[object Array]') {
	            prop = 'scrollLeft';
	            pos = pos[0];
	        }
	        if (window.isNaN(pos)) {
	            return;
	        }
	        if (wrap.kitScrollAni) {
	            wrap.kitScrollAni.stop();
	        }
	        if ($.tween) {
	            return wrap.kitScrollAni = $.tween({
	                type: type || 'quart-easeout',
	                begin: wrap[prop],
	                end: +pos,
	                extra: [0.2],
	                duration: 500,
	                func: function func(num) {
	                    wrap[prop] = num;
	                },
	                endfunc: function endfunc() {
	                    delete wrap.kitScrollAni;
	                }
	            });
	        } else {
	            wrap[prop] = pos;
	        }
	    },
	    insertStyle: function insertStyle(css) {
	        var s = document.createElement('style');
	        s.innerHTML = css;
	        document.head.appendChild(s);
	        return s;
	    },
	    load: function load(url, contentNode) {
	        var type = /\.([\w]+)$/.exec(url);
	        type = type ? type[1] : '';
	        typeof contentNode === 'string' && (type = contentNode, 1) && (contentNode = null);
	        contentNode = contentNode || document.head;

	        var returnValue;
	        switch (type) {
	            case 'js':
	                returnValue = document.createElement('script');
	                returnValue.src = url;
	                contentNode.appendChild(returnValue);
	                break;
	            case 'css':
	                returnValue = document.createElement('link');
	                returnValue.rel = 'stylesheet';
	                returnValue.href = url;
	                contentNode.appendChild(returnValue);
	                break;
	            case 'document':
	                returnValue = document.createElement('iframe');
	                returnValue.style.cssText = 'border:0;margin:0;padding:0;visibility:hidden;height:0;width:0;overflow:hidden;';
	                returnValue.src = url;
	                contentNode.appendChild(returnValue);
	                break;
	            default:
	                returnValue = new Image();
	                returnValue.src = url;
	                break;
	        }
	        return returnValue;
	    }
	};

	$.domReady(function () {
	    document.addEventListener('touchstart', function () {
	        $.isTouched = true;
	    });
	    document.addEventListener('touchend', function () {
	        $.isTouched = false;
	    });
	    document.addEventListener('touchcancel', function () {
	        $.isTouched = false;
	    }, true);
	});
	exports['default'] = $;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function ($) {
	    return {
	        envList: ['browser', 'APP'],
	        env: (function () {
	            if (navigator.platform.indexOf('MacIntel') >= 0 || navigator.platform.indexOf('Win') >= 0) {
	                return 'browser';
	            } else if (navigator.userAgent.indexOf('webview') >= 0 || navigator.userAgent.indexOf('mtnb') >= 0) {
	                return 'APP';
	            }
	            return 'APP';
	        })(),
	        osList: ['Android', 'IOS', 'Mac', 'Window'],
	        os: (function () {
	            if (navigator.platform.indexOf('MacIntel') >= 0) {
	                return 'Mac';
	            }
	            if (navigator.platform.indexOf('Win') >= 0) {
	                return 'Window';
	            }
	            if (/\bAndroid\b/i.test(navigator.userAgent)) {
	                return 'Android';
	            }
	            if (/\bip[honead]+\b/i.test(navigator.userAgent)) {
	                return 'IOS';
	            }
	            return '';
	        })(),
	        osVersion: (function () {
	            var ua = navigator.userAgent;
	            var androidVer = /\bAndroid\s([\d|\.]+)\b/i.exec(ua);
	            if (androidVer) {
	                return androidVer[1];
	            }
	            var IOSVer = /\biPhone\sOS\s([\d\_]+)\s/i.exec(ua);
	            if (androidVer) {
	                return IOSVer[1];
	            }
	            //其他有什么用...
	            return null;
	        })(),
	        isLocalhost: (function () {
	            return (/\b(localhost|127.0.0.1)\b/i.test(location.host)
	            );
	        })(),
	        deviceLevel: (function () {
	            //基本操作都跑不起来的程度
	            if (!Object.defineProperty) {
	                return 0;
	            }
	            //渲染动画会卡的程度
	            else if (!history.pushState) {
	                    return 2;
	                }
	            //业界良心等级
	            return 9;
	        })()
	    };
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	/*
		控制模块
		读取url和$config内容覆盖到$上
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports['default'] = function ($, keys) {
		keys.forEach(function (key) {
			if (window.$config.hasOwnProperty(key)) {
				$[key] = window.$config[key];
			}
			var urlConfig = $.querySearch('$' + key);
			if (urlConfig) {
				$[key] = urlConfig;
			}
		});
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	/*
	    错误控制&devkit
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	exports['default'] = function ($) {
	    window.onerror = function (e, filename, lineNo) {
	        console && console.log(e, 'filename:' + filename, 'lineNo:' + lineNo);
	    };
	    var kit = $.devkit;
	    if (kit) {
	        var clog = console.log;
	        var tempConsoleStorage = [];
	        window.console.log = function () {
	            var _Function$prototype$call;

	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            tempConsoleStorage.push([].concat(args));
	            (_Function$prototype$call = Function.prototype.call).call.apply(_Function$prototype$call, [clog, console].concat(args));
	        };
	        $.domReady(function () {
	            var panel = $.create(['<div style="position:fixed;top:0;right:0;max-height:100%;overflow:hidden;z-index:999999;opacity:.4;pointer-events:none;">',
	            // '<label style=""><input type="text" /></label>',
	            '<ul style="margin:0;padding:0;">', '<li></li>', '</ul>', '</div>'].join(''));
	            var list = panel.children[panel.children.length - 1];
	            var log = function log(color) {
	                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                    args[_key2 - 1] = arguments[_key2];
	                }

	                var msg = args.map(function (arg) {
	                    return arg && arg.toString ? arg.toString() : arg;
	                }).join(' | ');
	                var li = document.createElement('li');
	                li.style.cssText = 'text-align:right;display:block;padding:.1rem .2rem;border-bottom:1px solid #ccc;background:rgba(255,255,255,.4);color:' + color + ';font-size:.18rem;line-height:1.2;clear:both;word-break:break-all;';
	                li.textContent = msg;
	                list.insertBefore(li, list.firstChild);
	            };
	            document.body.appendChild(panel);
	            tempConsoleStorage.forEach(function (_ref) {
	                var _ref2 = _toArray(_ref);

	                var args = _ref2;

	                log.apply(undefined, ['#00f'].concat(_toConsumableArray(args)));
	            });

	            window.console.log = function () {
	                var _Function$prototype$call2;

	                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                    args[_key3] = arguments[_key3];
	                }

	                log.apply(undefined, ['#00f'].concat(args));
	                (_Function$prototype$call2 = Function.prototype.call).call.apply(_Function$prototype$call2, [clog, console].concat(args));
	            };
	        });
	    }
	};

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function ($) {
	    if (!('defineProperty' in Object)) {
	        alert('系统版本太低，暂不支持');
	        window.close();
	    }
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	var parse = function parse() {
	    var type = 0,
	        args = arguments;
	    var hold = false,
	        rsObj,
	        curObj;
	    if (args[args.length - 1] === true) {
	        hold = true;
	    }
	    rsObj = hold ? args[0] : {};
	    for (var i = +hold, j = args.length - hold; i < j; i++) {
	        curObj = args[i];
	        if (typeof curObj !== 'object') {
	            continue;
	        }
	        for (var key in type ? curObj : args[0]) {
	            if (!args[i].hasOwnProperty(key)) {
	                continue;
	            }
	            rsObj[key] = curObj[key];
	        }
	    };
	    return rsObj;
	};
	window.requestAnimationFrame = null || window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
	    setTimeout(callback, 1000 / 60);
	};
	//raf优化
	var tweenAniAnchor = function tweenAniAnchor(opts) {
	    opts = parse({
	        'type': 'cubic-easein',
	        'begin': 0,
	        'end': 0,
	        'duration': 600,
	        'extra': undefined,
	        'func': function func() {},
	        'fps': 60,
	        'endfunc': function endfunc() {}
	    }, opts);
	    var spf = 1000 / opts.fps;
	    var duration = opts.duration;
	    var step = Math.round(duration / spf);
	    var tweenTRS = tweenT(opts.type, opts.begin, opts.end, step, opts.extra);
	    var startTimer = Date.now(),
	        distance;
	    var controll;
	    var ani = {
	        'stop': function stop() {
	            controll = true;
	        },
	        'opts': opts
	    };
	    var frame = function frame() {
	        if (controll) {
	            return;
	        }
	        distance = Date.now() - startTimer;
	        if (distance >= duration) {
	            ani.step = Math.round(duration / spf);
	            opts.func.call(ani, opts.end, duration, duration, opts);
	            opts.endfunc();
	            return;
	        }
	        ani.step = Math.round(distance / spf);
	        opts.func.call(ani, tweenTRS(ani.step), distance, duration, opts);
	        requestAnimationFrame(frame);
	    };
	    requestAnimationFrame(frame);
	    return ani;
	};
	//指定t输出数值
	var tweenT = function tweenT(type, begin, end, duration, extra) {
	    var b = Math.min(begin, end);
	    var c = Math.max(begin, end);
	    return function (t) {
	        if (t > duration) {
	            return end;
	        }
	        return begin > end ? c - tween[type].apply(null, [t, 0, c - b, duration].concat(extra)) : b + tween[type].apply(null, [t, 0, c - b, duration].concat(extra));
	    };
	};

	var tween;
	tweenAniAnchor.types = tween = (function () {
	    var rs = {};
	    var type = {
	        'linear': function linear(t, b, c, d) {
	            return c * t / d + b;
	        },
	        'quad': {
	            easeIn: function easeIn(t, b, c, d) {
	                return c * (t /= d) * t + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return -c * (t /= d) * (t - 2) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	                return -c / 2 * (--t * (t - 2) - 1) + b;
	            }
	        },
	        'cubic': {
	            easeIn: function easeIn(t, b, c, d) {
	                return c * (t /= d) * t * t + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return c * ((t = t / d - 1) * t * t + 1) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	                return c / 2 * ((t -= 2) * t * t + 2) + b;
	            }
	        },
	        'quart': {
	            easeIn: function easeIn(t, b, c, d) {
	                return c * (t /= d) * t * t * t + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	            }
	        },
	        'quint': {
	            easeIn: function easeIn(t, b, c, d) {
	                return c * (t /= d) * t * t * t * t + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	            }
	        },
	        'sine': {
	            easeIn: function easeIn(t, b, c, d) {
	                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return c * Math.sin(t / d * (Math.PI / 2)) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	            }
	        },
	        'expo': {
	            easeIn: function easeIn(t, b, c, d) {
	                return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if (t == 0) return b;
	                if (t == d) return b + c;
	                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	            }
	        },
	        'circ': {
	            easeIn: function easeIn(t, b, c, d) {
	                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	            }
	        },
	        'elastic': {
	            easeIn: function easeIn(t, b, c, d, a, p) {
	                if (t == 0) return b;
	                if ((t /= d) == 1) return b + c;
	                if (!p) p = d * .3;
	                if (!a || a < Math.abs(c)) {
	                    a = c;
	                    var s = p / 4;
	                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            },
	            easeOut: function easeOut(t, b, c, d, a, p) {
	                if (t == 0) return b;
	                if ((t /= d) == 1) return b + c;
	                if (!p) p = d * .3;
	                if (!a || a < Math.abs(c)) {
	                    a = c;
	                    var s = p / 4;
	                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d, a, p) {
	                if (t == 0) return b;
	                if ((t /= d / 2) == 2) return b + c;
	                if (!p) p = d * (.3 * 1.5);
	                if (!a || a < Math.abs(c)) {
	                    a = c;
	                    var s = p / 4;
	                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	            }
	        },
	        'back': {
	            easeIn: function easeIn(t, b, c, d, s) {
	                if (s == undefined) s = 1.70158;
	                return c * (t /= d) * t * ((s + 1) * t - s) + b;
	            },
	            easeOut: function easeOut(t, b, c, d, s) {
	                if (s == undefined) s = 1.70158;
	                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	            },
	            easeInOut: function easeInOut(t, b, c, d, s) {
	                if (s == undefined) s = 1.70158;
	                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	                return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	            }
	        },
	        'bounce': {
	            easeIn: function easeIn(t, b, c, d) {
	                return c - type.bounce.easeOut(d - t, 0, c, d) + b;
	            },
	            easeOut: function easeOut(t, b, c, d) {
	                if ((t /= d) < 1 / 2.75) {
	                    return c * (7.5625 * t * t) + b;
	                } else if (t < 2 / 2.75) {
	                    return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	                } else if (t < 2.5 / 2.75) {
	                    return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	                } else {
	                    return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	                }
	            },
	            easeInOut: function easeInOut(t, b, c, d) {
	                if (t < d / 2) return type.bounce.easeIn(t * 2, 0, c, d) * .5 + b;else return type.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	            }
	        }
	    };
	    for (var key in type) {
	        if (typeof type[key] === 'function') {
	            rs[key] = type[key];
	        } else {
	            for (var style in type[key]) {
	                rs[key + '-' + style.toLowerCase()] = type[key][style];
	            }
	        }
	    }
	    return rs;
	})();
	module.exports = {
	    tween: tweenAniAnchor
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	var ai = 0;
	var curState;
	var historyStateMap = [];

	var backFuncList = [],
	    forwardFuncList = [],
	    changeList = [],
	    popStateList = [];

	var hashChangeBlock;

	// var apiLevel = !!history.popState;
	var apiLevel = 1;

	var setState = apiLevel ? function (method, state, title, url) {
	    history[method](state, title, url);
	} :
	//不支持history state的情况，使用hashchange
	function (method, state, title, url) {
	    var hash = location.hash.slice(1).replace(/\<\<([\d]+)\>\>/, '') + (state ? '<<' + state.$id + '>>' : '');
	    method === 'replaceState' ? location.replace('#' + hash) : location.hash = hash;
	};
	var changeState = function changeState(method) {
	    return function (state, title, url, forwardFunc, backFunc, stateData) {
	        hashChangeBlock = true;
	        if (method === 'replace') {
	            curState && fetch(curState.$id, 'pop');
	            curState = {
	                $id: ai
	            };
	        } else {
	            curState = {
	                $id: ++ai
	            };
	        }

	        setState(method, curState, document.title = title || document.title, url);

	        merge(curState, stateData);

	        historyStateMap.splice(ai);
	        historyStateMap[curState.$id] = {
	            push: forwardFunc,
	            pop: backFunc,
	            state: curState
	        };
	        fetch(curState.$id, 'push');

	        runList(forwardFuncList);
	        runList(changeList);
	    };
	};
	var popState = function popState($id) {
	    var stateObj;
	    // console.log('pop',curState.$id, $id, ai)
	    //back
	    if ($id < ai) {
	        fetch(curState.$id, 'pop');
	        runList(backFuncList);
	    }
	    //forward
	    else {
	            fetch($id, 'push');
	            runList(forwardFuncList);
	        }
	    runList(changeList);
	    ai = $id;
	};

	var replaceState = changeState('replaceState');
	var pushState = changeState('pushState');

	var api = {
	    getState: function getState() {
	        return curState;
	    },
	    pushState: pushState,
	    replaceState: replaceState,
	    back: function back() {
	        return history.go(-1);
	    },
	    forward: history.forward,
	    onpopstate: function onpopstate(func) {
	        if (typeof func === 'function') {
	            popStateList.push(func);
	        }
	    },
	    onstatechange: function onstatechange(func) {
	        if (typeof func === 'function') {
	            changeList.push(func);
	        }
	    },
	    onback: function onback(func) {
	        if (typeof func === 'function') {
	            backFuncList.push(func);
	        }
	    },
	    onexit: function onexit(func) {
	        if (typeof func === 'function') {
	            exitFuncList.push(func);
	        }
	    },
	    onforward: function onforward(func) {
	        if (typeof func === 'function') {
	            forwardFuncList.push(func);
	        }
	    },
	    reload: function reload() {
	        window.location.reload();
	    },
	    history: historyStateMap
	};
	module.exports = function ($) {
	    return {
	        history: api
	    };
	};

	if (apiLevel) {
	    api.onpopstate(function (e) {
	        popState(e.state && e.state.$id ? e.state.$id : 0);
	        curState = e.state;
	    });
	    window.addEventListener('popstate', function (e) {
	        runList(popStateList, e);
	    });
	} else {
	    window.addEventListener('hashchange', function (e) {
	        if (hashChangeBlock) {
	            hashChangeBlock = false;
	            return;
	        }
	        if (!curState) {
	            return;
	        }
	        var match = /\<\<([\d]+)\>\>/.exec(location.hash);
	        var $id;
	        if (!match) {
	            $id = 0;
	        } else {
	            $id = +match[1];
	        }
	        if ($id === curState.$id) {
	            return;
	        }
	        popState($id);
	        curState = historyStateMap[$id] ? historyStateMap[$id].state : { $id: 0 };
	        runList(popStateList);
	    });
	    if (/\<\<([\d]+)\>\>/.exec(location.hash)) {
	        setState('replace');
	    }
	}

	//通用
	function fetch(historyId, method) {
	    var state = historyStateMap[historyId];
	    state && typeof state[method] === 'function' && state[method](state.state);
	}
	function runList(list, e) {
	    list.forEach(function (func) {
	        func(e);
	    });
	}
	function merge(o1, o2) {
	    if (!o2) {
	        return o1;
	    }
	    for (var key in o2) {
	        if (o2.hasOwnProperty(key)) {
	            o1[key] = o2[key];
	        }
	    }
	    return o1;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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
	'use strict';

	var stack = [];
	var title = window.document && window.document.title || '';

	// var history = require('../plugins/history.js');
	var history;
	var autoPopLock;
	var $;

	//##############################################################################

	var api = {
	    stack: stack,
	    block: false,
	    pushState: pushState,
	    replaceState: replaceState,
	    push: function push(component, cfg) {
	        if (!component.hide) {
	            //TODO 错误收集
	            throw '[componentHandler] component.hide is not a function';
	        }
	        cfg = cfg || {};
	        // this.remove(component, true);
	        pushState(cfg.href, cfg.title);

	        var state = history.getState && history.getState();
	        stack.push({
	            historyID: state && state.$id,
	            component: component,
	            block: cfg.block,
	            title: cfg.title,
	            onBack: cfg.onBack,
	            href: cfg.href
	        });
	        findTitle();
	    },
	    get: function get(index) {
	        return stack[index === undefined ? stack.length - 1 : index];
	    },
	    pop: function pop() {
	        stack.pop();
	    },
	    remove: function remove(component, back) {
	        var check = stack.some(function (elem, index) {
	            if (elem.component === component) {
	                history.getState && history.getState() && history.getState().$id === elem.historyID && (autoPopLock = true) && history.back();
	                // back && history.back();
	                stack.splice(index, 1);
	                return true;
	            }
	        });
	        findTitle();
	        return check;
	    }
	};

	module.exports = function (core) {
	    $ = core;
	    $.domReady(function () {
	        history = $.history || __webpack_require__(9).history;
	        history.onpopstate(popState);
	    });
	    return {
	        components: api
	    };
	};

	function findTitle() {
	    var lastTitle = title;
	    for (var i = stack.length - 1; i >= 0; i--) {
	        if (stack[i].title) {
	            lastTitle = stack[i].title;
	            break;
	        }
	    }
	    $.app && $.app.setTitle ? $.app.setTitle(lastTitle) : document.title = lastTitle;
	}
	function pushState(href, title) {
	    history.pushState && history.pushState(null, title || '', href || null);
	}
	function replaceState(href, title) {
	    history.replaceState && history.replaceState(null, title || '', href || null);
	}

	//temp
	function popState(e) {
	    if (autoPopLock) {
	        autoPopLock = false;
	        return;
	    }
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
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function ($) {
	    var lastTarget;
	    var api = {
	        keyboard: {
	            hide: function hide() {
	                document.activeElement && document.activeElement.blur && document.activeElement.blur();
	            }
	        }
	    };
	    window.document.addEventListener('click', function (e) {
	        var target = e.target;
	        if (target === lastTarget) {
	            return;
	        }
	        //移除输入状态
	        var tagName = target.tagName;
	        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
	            api.keyboard.hide();
	        }
	        lastTarget = e.target;
	    });
	    return api;
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	module.exports = function ($) {
	    var api;
	    $.domReady(function () {
	        api.setLoading(false);

	        $.checkUIFixed();
	    });

	    return api = {
	        isTouched: false,
	        animate: function animate(node, type, callback) {
	            if ($.deviceLevel <= 2) {
	                return setTimeout(callback, 0);
	            }
	            // setTimeout(() => {
	            node.classList.add('animated');
	            node.classList.add(type);
	            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';

	            node.addEventListener(evt, function ani(e) {
	                if (e.target === node) {
	                    node.classList.remove('animated');
	                    node.classList.remove(type);
	                    // console.info('del', node, evt, callback);
	                    node.removeEventListener(evt, ani);
	                    callback && callback(this);
	                }
	            });
	            // }, 0);
	        },
	        setLoading: function setLoading(bool) {
	            document.body.classList[bool ? 'add' : 'remove']('loading');
	        },
	        checkUIFixed: function checkUIFixed() {
	            var selector = $config.UIFixedSelector || '.ui-fixed';
	            [].forEach.call($.findAll(selector), function (el) {
	                document.body.appendChild(el);
	            });
	        }
	    };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	module.exports = function ($) {
	    $.domReady(function () {
	        // 安卓300ms延迟避免初始化fastclick
	        // if(/Android/i.test(navigator.userAgent)){return;}
	        if (window.FastClick && $.os !== 'Mac') {
	            window.FastClick.attach(document.body);
	            document.body.classList.add('fastclick_outer');
	        }
	    });
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
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
	    if (!gaAccount || $.isLocalhost) {
	        return;
	    }
	    loadUA();
	    return {
	        ga: ga
	    };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	var setMeta = function setMeta(metaNode, content) {
	    if (!metaNode) {
	        return;
	    }
	    metaNode.content = content;
	    metaNode.setAttribute('content', content);
	};
	var setRootFontSize = function setRootFontSize(rpx) {
	    document.documentElement.style.fontSize = rpx + 'px';
	};
	module.exports = function ($) {
	    var pixelRatio = window.devicePixelRatio || 1;
	    pixelRatio = pixelRatio | 0;

	    switch (true) {
	        case $.os === 'Android':
	            pixelRatio = 1;break;
	        case pixelRatio < 2:
	            pixelRatio = 1;break;
	        case 2 <= pixelRatio:
	            pixelRatio = 2;break;
	        default:
	            pixelRatio = 1;break;
	    }

	    var scale = 1 / pixelRatio;

	    var meta = document.querySelector('meta[name="viewport"]');
	    switch ($.os) {
	        case 'IOS':
	            setMeta(meta, 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no');
	            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
	            break;
	        case 'Android':
	            document.documentElement.style.zoom = scale * 100 + '%';
	            break;
	        default:
	            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
	            // document.documentElement.style.zoom = scale*100 + '%';
	            pixelRatio = 1;
	    }
	    var fontSize = 50 * pixelRatio;
	    setRootFontSize(fontSize);

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

/***/ },
/* 16 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function ($) {
	    $.domReady(function () {
	        $.listener(document.body).on('click', '[target="_self"]', function (e) {
	            e.preventDefault();
	            $.app.locate(this.href);
	        });
	    });
	    return {
	        app: {
	            close: function close(force) {
	                if (force) {
	                    window.open('', '_self').close();
	                } else {
	                    $.app.onCloseFuncList.some(function (func) {
	                        return func();
	                    }) || $.app.close(true);
	                }
	            },
	            back: function back() {
	                window.history.go(-1);
	            },
	            onBack: function onBack(func) {
	                $.history.onback(func);
	            },
	            onCloseFuncList: [],
	            onClose: function onClose(func) {
	                if (typeof func === 'function') {
	                    $.app.onCloseFuncList.push(func);
	                }
	            },
	            setTitle: function setTitle(title) {
	                document.title = title;
	                $.trigger(document, 'setTitle');
	            },
	            locate: function locate(url) {
	                document.body && document.body.classList.add('locate');
	                setTimeout(function () {
	                    window.location.href = url;
	                }, 300);
	            }
	        }
	    };
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	/**
	 * 单例
	 *
	 * 规则：
	    1. overscroll:scroll的元素始终可以在对应坐标方向滚动
	    2. overscroll:auto的元素如果在对应方向滚动到头则继续向上层寻找可滚动元素
	    3. 符合extra条件的元素不能作为选择元素的条件
	*/
	'use strict';

	var startPosY, startPosX, curPosY, curPosX;

	var stat = false;

	var defaultConfig = {
	    //其他不爽的element
	    isExtraElement: function isExtraElement(element) {
	        switch (true) {
	            case element.tagName === 'INPUT' && element.type === 'range':
	                ;
	                return true;
	            default:
	                return false;
	        }
	    }
	};
	var _config = {};

	var notPreventScrollElement = function notPreventScrollElement(element) {
	    return _config.isExtraElement(element) || isScrollElement(element);
	};
	//能滚的element
	var isScrollElement = function isScrollElement(element, whileTouch) {
	    var checkFunc = whileTouch ? checkIsScrollElementWhileTouch : checkIsScrollElementWhileScroll;
	    while (element) {
	        if (checkFunc(element)) {
	            return element;
	        }
	        element = element.parentElement;
	    }
	    return false;
	};
	var checkIsScrollElementWhileTouch = function checkIsScrollElementWhileTouch(element) {
	    var style = window.getComputedStyle(element);
	    var tmp, check;
	    //规则1
	    if (style.overflowY === 'scroll' && element.scrollHeight > element.clientHeight) {
	        check = true;
	        if (element.scrollTop === 0) {
	            element.scrollTop = 1;
	        }
	        tmp = element.scrollHeight - element.clientHeight;
	        if (tmp === element.scrollTop) {
	            element.scrollTop = tmp - 1;
	        }
	    }
	    if (style.overflowX === 'scroll' && element.scrollWidth > element.clientWidth) {
	        check = true;
	        if (element.scrollLeft === 0) {
	            element.scrollLeft = 1;
	        }
	        tmp = element.scrollWidth - element.clientWidth;
	        if (tmp === element.scrollLeft) {
	            element.scrollLeft = tmp - 1;
	        }
	    }
	    if (check) {
	        return element;
	    }
	};
	var checkIsScrollElementWhileScroll = function checkIsScrollElementWhileScroll(element) {
	    var style = window.getComputedStyle(element);
	    //规则2
	    return (style.overflowY === 'scroll' || style.overflowY === 'auto') && element.scrollHeight > element.clientHeight && !(startPosY <= curPosY && element.scrollTop === 0) && !(startPosY >= curPosY && element.scrollHeight - element.scrollTop === element.clientHeight) || (style.overflowX === 'scroll' || style.overflowX === 'auto') && element.scrollWidth > element.clientWidth && !(startPosX <= curPosX && element.scrollLeft === 0) && !(startPosX >= curPosX && element.scrollWidth - element.scrollLeft === element.clientWidth);
	};

	//bind
	var bindFunc = {
	    move: function move(e) {
	        curPosY = e.touches ? e.touches[0].screenY : e.screenY;
	        curPosX = e.touches ? e.touches[0].screenX : e.screenX;
	        notPreventScrollElement(e.target) || e.preventDefault();
	    },
	    start: function start(e) {
	        var target = isScrollElement(e.target, true);
	        startPosY = e.touches ? e.touches[0].screenY : e.screenY;
	        startPosX = e.touches ? e.touches[0].screenX : e.screenX;
	    }
	};
	var api = module.exports = {
	    bind: function bind() {
	        if (!stat) {
	            stat = true;
	            document.addEventListener('touchmove', bindFunc.move, false);
	            document.addEventListener('touchstart', bindFunc.start, false);
	        }
	        return this;
	    },
	    config: function config(cfg) {
	        cfg = cfg || {};
	        _config.isExtraElement = cfg.isExtraElement || defaultConfig.isExtraElement;
	        return this;
	    },
	    move: function move(nodes, target) {
	        nodes = nodes ? nodes : 'all' in document ? [].filter.call(document.all, function (el) {
	            return window.getComputedStyle(el).position === 'fixed';
	        }) : [];
	        target = target || document.body;
	        [].forEach.call(nodes, function (el) {
	            target.appendChild(el);
	        });
	        return this;
	    },
	    destory: function destory() {
	        stat = false;
	        document.removeEventListener('touchmove', bindFunc.move, false);
	        document.removeEventListener('touchstart', bindFunc.start, false);
	    }
	};
	api.config();

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _base = __webpack_require__(2);

	var _base2 = _interopRequireDefault(_base);

	// require('../promise');
	_base2['default'].promise = window.Promise;

	[__webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(20), __webpack_require__(21), __webpack_require__(27)].forEach(_base2['default'].add);

	if (_base2['default'].os === 'IOS' || _base2['default'].os === 'Mac') {
	    __webpack_require__(17).bind();
	}

	_base2['default'].listener(_base2['default'].spa.Page).on('beforechange', function (uri, controller) {
	    _base2['default'].nav.set(controller);
	});

	var alpha = window.alpha = _base2['default'];

	exports['default'] = alpha;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	module.exports = function ($) {
	    $.lazyload = function (wrapper, node, attr, callback, isLive) {
	        var lazyload = function lazyload(el, src, callback) {
	            el.setAttribute('lazy-loading', '1');
	            var img = new Image();
	            img.onload = function () {
	                callback && callback(el, src);
	                // el.src = this.src;
	                el.removeAttribute('lazy-loading');
	            };
	            setTimeout(function () {
	                img.src = src;
	            }, 400);
	        };
	        if (arguments.length === 3) {
	            //纯加载回调 node, src, callback
	            lazyload(wrapper, node, attr);
	        } else {
	            //滚动视口检测
	            wrapper = wrapper || document.body;
	            var hasLazyLoad = node.hasBindLazyLoad;
	            node.hasBindLazyLoad = attr;
	            var checkTimer;
	            var timerCheck = function timerCheck() {
	                clearTimeout(checkTimer);
	                checkTimer = setTimeout(check, 50);
	                node.hasBindLazyLoad = false;
	            };
	            var check = function check() {
	                var list = $.findAll('[' + attr + ']', node);
	                if (!list.length && !isLive) {
	                    wrapper.removeEventListener('scroll', timerCheck);
	                    return;
	                }
	                var docHeight = document.documentElement.clientHeight;
	                [].every.call(list, function (el) {
	                    var bd = el.getBoundingClientRect();
	                    if (bd.top + el.clientHeight < 0) {
	                        return true;
	                    } else if (bd.top < docHeight) {
	                        lazyload(el, el.getAttribute(attr), callback);
	                        el.removeAttribute(attr);
	                        return true;
	                    } else {
	                        return false;
	                    }
	                });
	            };
	            !hasLazyLoad && wrapper.addEventListener('scroll', timerCheck);
	            check();
	        }
	    };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _spa = __webpack_require__(22);

	var _spa2 = _interopRequireDefault(_spa);

	module.exports = function ($) {
	    var mod_spa = (0, _spa2['default'])($);
	    return {
	        iLoad: function iLoad(url) {
	            new Promise(function (res, rej) {
	                var i = document.createElement('iframe');
	                i.style.cssText = 'border:0;margin:0;padding:0;visibility:hidden;height:0;width:0;overflow:hidden;';
	                i.onload = function () {
	                    // try{
	                    if (!i.contentWindow.document.title && !i.contentWindow.fin) {
	                        rej();
	                    } else {
	                        res(i);
	                    }
	                    // }catch(e){
	                    res(i);
	                    // }
	                    $.remove(i);
	                };
	                i.src = url;
	                document.body.appendChild(i);
	            });
	        },
	        loadPage: mod_spa.loadPage,
	        register: mod_spa.register,
	        controllers: mod_spa.controllers,
	        pages: mod_spa.pages,
	        spa: mod_spa
	    };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _controller = __webpack_require__(23);

	var _controller2 = _interopRequireDefault(_controller);

	var _page = __webpack_require__(25);

	var _page2 = _interopRequireDefault(_page);

	var _kit = __webpack_require__(24);

	var _kit2 = _interopRequireDefault(_kit);

	var _history = __webpack_require__(9);

	var _history2 = _interopRequireDefault(_history);

	var histroy;

	var go = function go(href) {
	    histroy.pushState(null, '', href);
	    new _page2['default'](location.pathname).show();
	};

	exports['default'] = function ($) {
	    histroy = (0, _history2['default'])($).history;
	    $.listener(document).on('click', 'a[href^="/"]', function (e) {
	        var target = this.getAttribute('target');
	        if (target) {
	            return;
	        }
	        e.preventDefault();
	        var href = this.getAttribute('href');
	        go(href);
	        $.ga && $.ga('send', 'pageview');
	    });

	    $.domReady(function () {
	        histroy.onpopstate(function () {
	            new _page2['default'](location.pathname).show();
	        });
	        histroy.replaceState(null, '', location.pathname);
	        new _page2['default'](location.pathname).show();
	    });
	    return {
	        register: function register(controller, factory) {
	            controller = new _controller2['default'](controller);
	            controller.set(factory.call(controller, $));
	            controller.check();
	        },
	        loadPage: function loadPage(uri, contentNode) {
	            var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            var _ref$scripts = _ref.scripts;
	            var scripts = _ref$scripts === undefined ? [] : _ref$scripts;
	            var _ref$styles = _ref.styles;
	            var styles = _ref$styles === undefined ? [] : _ref$styles;

	            var page = new _page2['default'](uri);
	            if (page.loader > page.LOADING) {
	                return;
	            }
	            page.needInit = !!scripts.length;
	            page.controller.state = page.controller.state || !page.needInit;
	            page.setContent(contentNode.innerHTML);
	            contentNode.innerHTML = '';
	            styles.forEach(function (url) {
	                if (url[0] === '/' || url[0] === '.') {
	                    $.load(url);
	                } else {
	                    $.insertStyle(url);
	                }
	            });
	            scripts.forEach(function (url) {
	                if (url[0] === '/' || url[0] === '.') {
	                    $.load(url);
	                } else {
	                    eval(url);
	                }
	            });
	            page.controller.check();
	        },
	        load: go,

	        Page: _page2['default'],
	        Controller: _controller2['default'],

	        controllers: _controller2['default'].list,
	        pages: _page2['default'].list
	    };
	};

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _kit = __webpack_require__(24);

	var _kit2 = _interopRequireDefault(_kit);

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
	            _kit2['default'].merge(this.lifecycle, conf, true);
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            return this.lifecycle[name];
	        }
	    }, {
	        key: 'check',
	        value: function check() {
	            this.state && this.list.forEach(function (page) {
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

	exports['default'] = Controller;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _baseKit = __webpack_require__(3);

	var _baseKit2 = _interopRequireDefault(_baseKit);

	exports['default'] = _baseKit2['default'];
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _kit = __webpack_require__(24);

	var _kit2 = _interopRequireDefault(_kit);

	var _controller = __webpack_require__(23);

	var _controller2 = _interopRequireDefault(_controller);

	var _effect = __webpack_require__(26);

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
	        var _this = this;

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
	        this.needInit = false;
	        setTimeout(function () {
	            _this.loader = _this.WAIT;
	        }, 0);
	    }

	    _createClass(Page, [{
	        key: 'run',
	        value: function run(lifecycle) {
	            var func = this.controller.get(lifecycle);
	            console.info('page ' + lifecycle + ':' + this.name);
	            if (typeof func === 'function') {
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
	            return this._loader || 0;
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
	            Page.last = Page.current;
	            _kit2['default'].trigger(Page, 'beforechange', [uri, controller]);
	            if (Page.current !== uri && pageHide) {
	                pageHide.state = pageHide.HIDE;
	            }

	            Page.current = uri;
	            Page.currentController = controller;

	            pageShow.state = pageShow.SHOW;

	            _kit2['default'].trigger(Page, 'change', [uri, controller]);
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

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _kit = __webpack_require__(24);

	var _kit2 = _interopRequireDefault(_kit);

	var _dom = __webpack_require__(12);

	var _dom2 = _interopRequireDefault(_dom);

	var base = (0, _dom2['default'])(_kit2['default']);

	// var loadingTemplate = '<div data-node="pageloading" class="loading" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>';
	var contentTemplate = ['<div class="page-wrap" data-page>',
	// loadingTemplate,
	'</div>'].join('');

	var wrapper;

	var getWrapper = function getWrapper() {
	    return wrapper || (wrapper = _kit2['default'].find('#wrapper'));
	};

	exports['default'] = {
	    build: function build(page) {
	        return _kit2['default'].create(contentTemplate);
	    },
	    hide: function hide(page) {
	        page.run('hide');
	        base.animate(page.node, 'fadeOutDown', function () {
	            _kit2['default'].remove(page.node);
	            page.run('afterHide');
	        }, true);
	    },
	    show: function show(page) {
	        // getWrapper().innerHTML = '';
	        page.run('beforeShow');
	        if (page.node.parentNode !== getWrapper()) {
	            getWrapper().appendChild(page.node);
	            page.constructor.last && page.constructor.last !== page.uri && base.animate(page.node, 'fadeInDown', null, true);
	        }
	        if (page.loader < page.LOADED) {
	            base.setLoading(true);
	            return;
	        } else {
	            base.setLoading(false);
	        }
	        if (page.loader < page.INITED) {
	            page.run('init');
	            page.loader = page.INITED;
	        }
	        page.run('show');
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _baseKit = __webpack_require__(3);

	var _baseKit2 = _interopRequireDefault(_baseKit);

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
	    return {
	        nav: api
	    };
	};

	module.exports = exports['default'];

/***/ }
/******/ ]);