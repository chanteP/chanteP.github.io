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

	module.exports = __webpack_require__(2);


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

/***/ }
/******/ ]);