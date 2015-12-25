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

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    $: window.top.alpha,
	    React: window.top.React
	};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _core = __webpack_require__(2);

	var _commonUiDrawer = __webpack_require__(4);

	var _commonUiDrawer2 = _interopRequireDefault(_commonUiDrawer);

	var _frameScss = __webpack_require__(13);

	var _frameScss2 = _interopRequireDefault(_frameScss);

	_core.$.register('blog', function ($) {
	    var drawer = new _commonUiDrawer2['default']();
	    drawer.setContent('<iframe class="blog-drawer" name="blogPage"></iframe>');
	    var iframe = $.find('[name=blogPage]', drawer.node);
	    iframe.onload = iframe.onerror = function () {
	        drawer.node.classList.remove('loading');
	    };
	    return {
	        init: function init() {
	            $.listener(this.node).on('click', '[data-act="open"]', function (e) {
	                e.preventDefault();
	                var href = this.getAttribute('href');
	                iframe.src = href;
	                drawer.node.classList.add('loading');
	                drawer.show({
	                    href: href
	                });
	            });
	        },
	        show: function show() {},
	        hide: function hide() {}
	    };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(5);

	var PushPage = __webpack_require__(6);

	var Drawer = (function (_PushPage) {
		_inherits(Drawer, _PushPage);

		function Drawer() {
			var _this = this;

			_classCallCheck(this, Drawer);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(Drawer.prototype), 'constructor', this).apply(this, args);
			_core.$.listener(this.outer).on('click', '[data-act="closeDwarer"]', function () {
				_this.hide();
			});
		}

		return Drawer;
	})(PushPage);

	exports['default'] = Drawer;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		$: window.alpha,
		Promise: window.alpha.promise,
		React: window.React
	};
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(5);

	var _templateHtml = __webpack_require__(7);

	var _templateHtml2 = _interopRequireDefault(_templateHtml);

	var _styleScss = __webpack_require__(8);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _toggle = __webpack_require__(12);

	var _toggle2 = _interopRequireDefault(_toggle);

	var pushPage = (function (_Toggle) {
	    _inherits(pushPage, _Toggle);

	    function pushPage() {
	        var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	        _classCallCheck(this, pushPage);

	        _get(Object.getPrototypeOf(pushPage.prototype), 'constructor', this).call(this, ['slideInRight', 'slideOutRight']);
	        this.outer = _core.$.create(_templateHtml2['default']);
	        this.node = _core.$.find('[data-node="scrollCont"]', this.outer);
	        document.body.appendChild(this.outer);

	        this.setContent(content);
	    }

	    // outer = null;
	    // node = null;

	    _createClass(pushPage, [{
	        key: 'setContent',
	        value: function setContent(content) {
	            if (typeof content === 'string') {
	                this.node.innerHTML = content;
	            }
	            if (_core.$.isNode(content)) {
	                this.node.appendChild(content);
	            }
	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show(config) {
	            if (!_get(Object.getPrototypeOf(pushPage.prototype), 'show', this).call(this, true)) {
	                return;
	            }
	            this.outer.style.zIndex = pushPage.counterBase + pushPage.counter;
	            pushPage.counter++;
	            document.body.classList.add('pushpage-sub');
	            this.componentsApi.push(this, config);
	            _core.$.trigger(this, 'show');
	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (!_get(Object.getPrototypeOf(pushPage.prototype), 'hide', this).call(this, true)) {
	                return;
	            }
	            pushPage.counter--;
	            document.body.classList.remove('pushpage-sub');
	            this.componentsApi.remove(this);
	            _core.$.trigger(this, 'hide');
	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.componentsApi.remove(this);
	            this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
	        }
	    }]);

	    return pushPage;
	})(_toggle2['default']);

	exports['default'] = pushPage;

	pushPage.counterBase = 85;
	pushPage.counter = 0;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<!-- track@alpha:{\"version\":\"0.2.43\",\"build\":\"2015-12-18 22:34:52\",\"hash\":\"\"} --> \n<div class=\"m-pushpage fullscreen\">\n    <div class=\"slide-wrap\" data-node=\"scrollCont\"></div>\n</div>\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "/** track@alpha:{\"version\":\"0.2.43\",\"build\":\"2015-12-18 22:34:52\",\"hash\":\"\"} */\n/** track@alpha:{\"version\":\"0.2.43\",\"build\":\"2015-12-18 22:34:52\",\"hash\":\"\"} */\n.m-pushpage {\n  position: fixed;\n  background: #f8f8f8;\n  text-align: left;\n  z-index: 100;\n  outline: 1px #ccc solid;\n  visibility: hidden;\n  /*@include transition;*/\n  transform: translate(100%, 0);\n  -webkit-transform: translate(100%, 0);\n  animation-duration: 0.4s;\n  -webkit-animation-duration: 0.4s; }\n  .m-pushpage[data-show] {\n    visibility: visible;\n    transform: translate(0%, 0);\n    -webkit-transform: translate(0%, 0); }\n  .m-pushpage .slide-wrap {\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    overflow-scrolling: touch;\n    -webkit-overflow-scrolling: touch;\n    transform: translateZ(0);\n    -webkit-transform: translateZ(0); }\n  .m-pushpage.animated {\n    pointer-events: none;\n    /*.slide-wrap{\n            display: none;\n        }*/ }\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _core = __webpack_require__(5);

	var componentsApi = {};
	var emptyFunc = function emptyFunc() {};
	componentsApi.push = componentsApi.remove = componentsApi.pop = emptyFunc;

	var toggleBase = (function () {
	    function toggleBase() {
	        var aniTypes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        _classCallCheck(this, toggleBase);

	        this._isShown = false;
	        this._aniTypes = aniTypes;
	    }

	    _createClass(toggleBase, [{
	        key: 'show',
	        value: function show(check) {
	            if (check && this.isShown) {
	                return false;
	            }
	            this.isShown = true;
	            return true;
	        }
	    }, {
	        key: 'hide',
	        value: function hide(check) {
	            if (check && !this.isShown) {
	                return false;
	            }
	            this.isShown = false;
	            return true;
	        }
	    }, {
	        key: 'destory',
	        value: function destory() {
	            if (this.outer && this.outer.parentNode) {
	                this.outer.parentNode.removeChild(this.outer);
	            }
	        }
	    }, {
	        key: 'isShown',
	        get: function get() {
	            return this._isShown;
	        },
	        set: function set(value) {
	            if (!!this._isShown === !!value) {
	                return this._isShown;
	            }
	            this.outer = this.outer || this.node;
	            if (this.outer) {
	                if (value) {
	                    // setTimeout(() => {
	                    this.outer.setAttribute('data-show', '1');
	                    typeof this._aniTypes[0] === 'string' ? this.animate(this.outer, this._aniTypes[0]) : this.outer.style.display = 'block';
	                    // }, 0);
	                } else {
	                        // setTimeout(() => {
	                        this.outer.removeAttribute('data-show');
	                        typeof this._aniTypes[1] === 'string' ? this.animate(this.outer, this._aniTypes[1]) : this.outer.style.display = 'none';
	                        // }, 0);
	                    }
	            }
	            return this._isShown = !!value;
	        }
	    }]);

	    return toggleBase;
	})();

	exports['default'] = toggleBase;

	toggleBase.prototype.componentsApi = _core.$.components || componentsApi;
	toggleBase.prototype.animate = _core.$.animate || function (node, type, cb) {
	    setTimeout(cb, 0);
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./frame.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./frame.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".blog-drawer {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  padding: 0;\n  margin: 0; }\n", ""]);

	// exports


/***/ }
/******/ ]);