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

	module.exports = __webpack_require__(15);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = window.alpha;
	module.exports = exports["default"];

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Drawer = __webpack_require__(5);

	module.exports = Drawer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _templateHtml = __webpack_require__(7);

	var _templateHtml2 = _interopRequireDefault(_templateHtml);

	var _styleScss = __webpack_require__(8);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _toggleBase2 = __webpack_require__(12);

	var _toggleBase3 = _interopRequireDefault(_toggleBase2);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var Drawer = (function (_toggleBase) {
	    _inherits(Drawer, _toggleBase);

	    function Drawer() {
	        var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	        _classCallCheck(this, Drawer);

	        _get(Object.getPrototypeOf(Drawer.prototype), 'constructor', this).call(this, ['slideInRight', 'slideOutRight']);
	        this.outer = _core2['default'].create(_templateHtml2['default']);
	        this.node = _core2['default'].find('[data-node="scrollCont"]', this.outer);
	        document.body.appendChild(this.outer);

	        this.setContent(content);
	    }

	    // outer = null;
	    // node = null;

	    _createClass(Drawer, [{
	        key: 'setContent',
	        value: function setContent(content) {
	            if (typeof content === 'string') {
	                this.node.innerHTML = content;
	            }
	            if (_core2['default'].isNode(content)) {
	                this.node.appendChild(content);
	            }
	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show(config) {
	            if (!_get(Object.getPrototypeOf(Drawer.prototype), 'show', this).call(this, true)) {
	                return;
	            }
	            document.body.classList.add('drawer-sub');
	            _core2['default'].componentHandler.push(this, config);
	            _core2['default'].trigger(this, 'show');
	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (!_get(Object.getPrototypeOf(Drawer.prototype), 'hide', this).call(this, true)) {
	                return;
	            }
	            document.body.classList.remove('drawer-sub');
	            _core2['default'].componentHandler.remove(this);
	            _core2['default'].trigger(this, 'hide');
	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
	        }
	    }]);

	    return Drawer;
	})(_toggleBase3['default']);

	exports['default'] = Drawer;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = alpha;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-slidedrawer\">\n    <div class=\"slide-wrap\" data-node=\"scrollCont\"></div>\n</div>\n";

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
	exports.push([module.id, ".m-slidedrawer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #f8f8f8;\n  text-align: left;\n  z-index: 100;\n  overflow: hidden;\n  outline: 1px #ccc solid;\n  visibility: hidden;\n  /*@include transition;*/\n  -webkit-transform: translate(100%, 0);\n  -moz-transform: translate(100%, 0);\n  transform: translate(100%, 0);\n  /*@include transform(translateX(100%));*/\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  animation-duration: 0.4s; }\n  .m-slidedrawer[data-show] {\n    visibility: visible;\n    -webkit-transform: translate(0%, 0);\n    -moz-transform: translate(0%, 0);\n    transform: translate(0%, 0);\n    /*@include transform(translateX(0%));*/ }\n  .m-slidedrawer .slide-wrap {\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-slidedrawer.animated {\n    pointer-events: none;\n    /*.slide-wrap{\n            display: none;\n        }*/ }\n\nbody #wrapper {\n  -webkit-transition: all 0.4s ease 0s;\n  -moz-transition: all 0.4s ease 0s;\n  transition: all 0.4s ease 0s; }\n\nbody.drawer-sub #wrapper {\n  -webkit-transform: translateX(-40%);\n  -moz-transform: translateX(-40%);\n  transform: translateX(-40%); }\n", ""]);

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
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

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

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

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
	        key: 'isShown',
	        get: function get() {
	            return this._isShown;
	        },
	        set: function set(value) {
	            if (!!this._isShown === !!value) {
	                return this._isShown;
	            }
	            if (this.outer) {
	                if (value) {
	                    this.outer.setAttribute('data-show', '1');
	                    this._aniTypes[0] && _core2['default'].animate(this.outer, this._aniTypes[0]);
	                } else {
	                    this.outer.removeAttribute('data-show');
	                    this._aniTypes[1] && _core2['default'].animate(this.outer, this._aniTypes[1]);
	                }
	            }
	            return this._isShown = !!value;
	        }
	    }]);

	    return toggleBase;
	})();

	exports['default'] = toggleBase;
	module.exports = exports['default'];

/***/ },
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _core = __webpack_require__(2);

	var _core2 = _interopRequireDefault(_core);

	var _commonComponentsDrawer = __webpack_require__(4);

	var _commonComponentsDrawer2 = _interopRequireDefault(_commonComponentsDrawer);

	var pages = {
	    controls: __webpack_require__(16),
	    icon: __webpack_require__(17),
	    plugins: __webpack_require__(18),
	    forms: __webpack_require__(39)
	};

	_core2['default'].register('demo', function ($) {
	    return {
	        init: function init() {
	            $.listener(this.node).on('click', '[data-act="page"]', function () {
	                var forPage = this.dataset['for'];
	                var drawer;
	                if (pages[forPage] instanceof _commonComponentsDrawer2['default']) {} else {
	                    drawer = new _commonComponentsDrawer2['default']();
	                    pages[forPage](drawer.node);
	                    pages[forPage] = drawer;
	                }
	                pages[forPage].show();
	            });
	        },
	        show: function show() {},
	        hide: function hide() {}
	    };
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (node) {
	    React.render(React.createElement(
	        "div",
	        null,
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "checkbox", className: "ui-checkbox", name: "checkbox" }),
	            React.createElement(
	                "span",
	                null,
	                "checkbox"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "checkbox", className: "ui-checkbox", name: "checkbox", checked: "checked" }),
	            React.createElement(
	                "span",
	                null,
	                "checkbox"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "checkbox", className: "ui-checkbox", disabled: "disabled" }),
	            React.createElement(
	                "span",
	                null,
	                "checkbox"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "checkbox", className: "ui-checkbox", disabled: "disabled", checked: "checked" }),
	            React.createElement(
	                "span",
	                null,
	                "checkbox"
	            )
	        ),
	        React.createElement("hr", { className: "claerfix" }),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "radio", className: "ui-radio", name: "check" }),
	            React.createElement(
	                "span",
	                null,
	                "radio"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "radio", className: "ui-radio", name: "check", checked: "checked" }),
	            React.createElement(
	                "span",
	                null,
	                "radio"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "radio", className: "ui-radio", disabled: "disabled" }),
	            React.createElement(
	                "span",
	                null,
	                "radio"
	            )
	        ),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "radio", className: "ui-radio", disabled: "disabled", checked: "checked" }),
	            React.createElement(
	                "span",
	                null,
	                "radio"
	            )
	        ),
	        React.createElement("hr", { className: "claerfix" }),
	        React.createElement(
	            "label",
	            null,
	            React.createElement("input", { type: "checkbox", className: "ui-switch" }),
	            React.createElement("span", null),
	            "switch"
	        )
	    ), node);
	};

	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (node) {
	    React.render(React.createElement(
	        "div",
	        null,
	        React.createElement("i", { className: "icon succ" }),
	        React.createElement("i", { className: "icon error" }),
	        React.createElement("i", { className: "icon info" }),
	        React.createElement("i", { className: "icon warn" }),
	        React.createElement("br", null),
	        React.createElement(
	            "i",
	            { className: "icon check" },
	            " 普通的icon"
	        ),
	        React.createElement(
	            "i",
	            { className: "icon red close" },
	            " 普通的icon"
	        ),
	        React.createElement("br", null),
	        React.createElement(
	            "i",
	            { className: "icon plus" },
	            " 添加"
	        ),
	        React.createElement(
	            "i",
	            { className: "icon minus red" },
	            " 删除"
	        ),
	        React.createElement("br", null),
	        React.createElement(
	            "i",
	            { className: "icon transparent close" },
	            " 一个简单的x"
	        ),
	        React.createElement(
	            "i",
	            { className: "icon ti-github" },
	            " 其他"
	        )
	    ), node);
	};

	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _commonComponentsDrawer = __webpack_require__(4);

	var _commonComponentsDrawer2 = _interopRequireDefault(_commonComponentsDrawer);

	var _commonComponentsSelect = __webpack_require__(19);

	var _commonComponentsSelect2 = _interopRequireDefault(_commonComponentsSelect);

	var _commonComponentsMask = __webpack_require__(28);

	var _commonComponentsMask2 = _interopRequireDefault(_commonComponentsMask);

	var _commonComponentsMaskTips = __webpack_require__(31);

	var _commonComponentsMaskTips2 = _interopRequireDefault(_commonComponentsMaskTips);

	var _commonComponentsDialog = __webpack_require__(35);

	var _commonComponentsDialog2 = _interopRequireDefault(_commonComponentsDialog);

	var drawer = new _commonComponentsDrawer2['default']();
	var callDrawer = function callDrawer(e) {
	    drawer.setContent('123123123');
	    drawer.show();
	};

	var options = [],
	    num = 20;
	while (num) {
	    options.unshift(num--);
	}
	// var select = new Select;
	var options1 = [].concat(options);
	var callSelect = function callSelect(e) {
	    _commonComponentsSelect2['default'].show(3, options1, function (item, index) {
	        console.log('haha', item, index);
	    }, 'fxxk');
	};
	var options2 = [].concat(options.reverse());
	var callSelectNoTitle = function callSelectNoTitle(e) {
	    _commonComponentsSelect2['default'].show(3, options2, function (item, index) {
	        console.log('hehe', item, index);
	    }, null);
	};
	// var select = new Select;
	var callMask = function callMask(e) {
	    _commonComponentsMask2['default'].show(50);
	    setTimeout(function () {
	        _commonComponentsMask2['default'].hide();
	    }, 1200);
	};

	// var select = new Select;
	var callDialog = function callDialog(e) {
	    _commonComponentsDialog2['default'].show({
	        title: '什么鬼',
	        type: 'info',
	        content: '什么鬼'
	    }, true);
	};

	// var select = new Select;
	var callMaskTips = function callMaskTips(e) {
	    _commonComponentsMaskTips2['default'].show({
	        icon: 'loading',
	        text: '什么鬼'
	    }, true);
	};

	exports['default'] = function (node) {
	    React.render(React.createElement(
	        'div',
	        null,
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callDrawer || function () {} },
	                    'Drawer'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callSelect || function () {} },
	                    'Select'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callSelectNoTitle || function () {} },
	                    'SelectNoTitle'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callDialog || function () {} },
	                    'Dialog'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callPicview || function () {} },
	                    'Picview'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callMask || function () {} },
	                    'Mask'
	                )
	            )
	        ),
	        React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: callMaskTips || function () {} },
	                    'MaskTips'
	                )
	            )
	        )
	    ), node);
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ('value' in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _styleScss = __webpack_require__(20);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _animatorControl = __webpack_require__(22);

	var _animatorControl2 = _interopRequireDefault(_animatorControl);

	var _renderJsx = __webpack_require__(26);

	var _renderJsx2 = _interopRequireDefault(_renderJsx);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var findCurrent = function findCurrent(options, text) {
	    if (typeof text === 'number') {
	        return text;
	    }
	    var index = 0;
	    var type = typeof options[0] === 'string';
	    options.some(function (item, i) {
	        if (type ? item === text : item.text === text) {
	            index = i;
	            return true;
	        }
	    });
	    return index;
	};

	var Select = (function (_Control) {
	    _inherits(Select, _Control);

	    function Select(cfg) {
	        _classCallCheck(this, Select);

	        _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this);
	        _set(Object.getPrototypeOf(Select.prototype), 'type', 'bottom', this);
	        this.config(cfg);

	        this.options = null;
	        this.current = 0;
	        this.callback = null;
	        this.title = '';

	        this.ins = null;
	    }

	    _createClass(Select, [{
	        key: 'config',
	        value: function config() {
	            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            var _ref$title = _ref.title;
	            var title = _ref$title === undefined ? '' : _ref$title;

	            this.title = title;
	        }
	    }, {
	        key: 'scrollEffect',
	        value: function scrollEffect(slider) {
	            var _this = this;

	            var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            if (!slider) {
	                return;
	            }
	            var target = _core2['default'].find('[data-index="' + index + '"]', slider) || _core2['default'].find('[data-index="0"]', slider);
	            if (!target) {
	                return;
	            }
	            this.tweenAni && this.tweenAni.stop();
	            return this.tweenAni = _core2['default'].tween({
	                begin: slider.scrollTop,
	                end: target.offsetTop + target.clientHeight / 2 - slider.clientHeight / 2,
	                duration: 300,
	                func: function func(num) {
	                    slider.scrollTop = num;
	                },
	                endfunc: function endfunc() {
	                    _this.tweenAni = null;
	                }
	            });
	        }
	    }, {
	        key: 'setCurrent',
	        value: function setCurrent(index) {
	            this.ins && this.ins.setCurrent(index);
	        }
	    }, {
	        key: 'show',
	        value: function show(index, options, cb, title) {
	            this.current = findCurrent(options, index || 0);
	            this.options = options || this.options;
	            this.callback = cb || this.callback;
	            this.title = title === undefined ? this.title : title;
	            this.noTitle = typeof this.title !== 'string';

	            this.ins = (0, _renderJsx2['default'])(this.node, this);
	            this.setCurrent(this.current);

	            return _get(Object.getPrototypeOf(Select.prototype), 'show', this).call(this);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            return _get(Object.getPrototypeOf(Select.prototype), 'hide', this).call(this);
	        }
	    }], [{
	        key: 'show',
	        value: function show() {
	            commonSelect.show.apply(commonSelect, arguments);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            commonSelect.hide.apply(commonSelect, arguments);
	        }
	    }]);

	    return Select;
	})(_animatorControl2['default']);

	exports['default'] = Select;

	var commonSelect = new Select();
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".m-controls-select {\n  background: #fff; }\n  .m-controls-select .m-controls-select-head {\n    line-height: .66rem;\n    border-bottom: 1px solid #dedede;\n    overflow: hidden; }\n    .m-controls-select .m-controls-select-head h1 {\n      font-size: .28rem;\n      line-height: .66rem;\n      color: #333;\n      font-weight: 700;\n      text-align: center;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    .m-controls-select .m-controls-select-head .m-controls-select-cancel,\n    .m-controls-select .m-controls-select-head .m-controls-select-submit {\n      font-size: .24rem;\n      color: #4fcbbd;\n      padding: 0 1em; }\n    .m-controls-select .m-controls-select-head .m-controls-select-cancel {\n      float: left; }\n    .m-controls-select .m-controls-select-head .m-controls-select-submit {\n      float: right; }\n  .m-controls-select .m-controls-slidercont {\n    position: relative;\n    background: #fff; }\n  .m-controls-select .m-controls-slider {\n    width: 100%;\n    max-height: 4.4rem;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-controls-select li {\n    /*background: #fff;*/\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    line-height: 0.88rem;\n    height: 0.88rem;\n    border: 0 solid #e0e0e0;\n    color: #333;\n    text-align: center;\n    cursor: pointer; }\n  .m-controls-select li + li {\n    border-top-width: 1px; }\n  .m-controls-select .m-controls-select-head + .m-controls-slidercont {\n    background: #f0f0f0;\n    -webkit-mask-image: linear-gradient(0deg, transparent 0, #fff 20%, #fff 80%, transparent 100%); }\n    .m-controls-select .m-controls-select-head + .m-controls-slidercont:before {\n      content: '';\n      display: block;\n      line-height: 0.88rem;\n      height: 0.88rem;\n      border: 0 solid #e0e0e0;\n      -webkit-transform: translate(0, -50%);\n      -moz-transform: translate(0, -50%);\n      transform: translate(0, -50%);\n      position: absolute;\n      top: 50%;\n      left: 0;\n      width: 100%;\n      border-top-width: 1px;\n      border-bottom-width: 1px;\n      pointer-events: none;\n      background: white;\n      z-index: -1; }\n    .m-controls-select .m-controls-select-head + .m-controls-slidercont li {\n      border-color: transparent; }\n    .m-controls-select .m-controls-select-head + .m-controls-slidercont li:first-child {\n      margin-top: 2.64rem; }\n    .m-controls-select .m-controls-select-head + .m-controls-slidercont li:last-child {\n      margin-bottom: 2.64rem; }\n  .m-controls-select .current {\n    font-weight: 700;\n    color: #fb7e35; }\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _templateHtml = __webpack_require__(23);

	var _templateHtml2 = _interopRequireDefault(_templateHtml);

	var _styleScss = __webpack_require__(24);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _toggleBase2 = __webpack_require__(12);

	var _toggleBase3 = _interopRequireDefault(_toggleBase2);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var typeList = ['middle', 'bottom', 'right', 'left', 'top'];

	var Control = (function (_toggleBase) {
	    _inherits(Control, _toggleBase);

	    function Control() {
	        var _this = this;

	        var type = arguments.length <= 0 || arguments[0] === undefined ? typeList[0] : arguments[0];
	        var touchable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	        _classCallCheck(this, Control);

	        _get(Object.getPrototypeOf(Control.prototype), 'constructor', this).call(this, ['fadeIn', 'fadeOut']);

	        this.outer = _core2['default'].create(_templateHtml2['default']);
	        this.node = _core2['default'].find('[data-node="content"]', this.outer);
	        window.document.body.appendChild(this.outer);

	        this.outer.addEventListener('click', function (e) {
	            _this.touchable && e.target === _this.outer && _this.hide();
	        });

	        this.touchable = touchable;
	        this.type = type;
	    }

	    _createClass(Control, [{
	        key: 'setContent',
	        value: function setContent(content) {
	            if (typeof content === 'string') {
	                this.node.innerHTML = content;
	            }
	            if (_core2['default'].isNode(content)) {
	                this.node.appendChild(content);
	            }
	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show(config) {
	            if (!_get(Object.getPrototypeOf(Control.prototype), 'show', this).call(this, true)) {
	                return;
	            }
	            _core2['default'].componentHandler.push(this, config);
	            _core2['default'].trigger(this, 'show');
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (!_get(Object.getPrototypeOf(Control.prototype), 'hide', this).call(this, true)) {
	                return;
	            }
	            _core2['default'].componentHandler.remove(this);
	            _core2['default'].trigger(this, 'hide');
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return this._type;
	        },
	        set: function set(value) {
	            if (typeList.indexOf(value) < 0) {
	                value = this._type || typeList[0];
	            }
	            this.outer.dataset.type = value;
	            return this._type = value;
	        }
	    }]);

	    return Control;
	})(_toggleBase3['default']);

	exports['default'] = Control;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-controls\">\n    <div class=\"m-controls-content\" data-node=\"content\"></div>\n</div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(25);
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".m-controls {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 300;\n  background: rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n  pointer-events: none;\n  visibility: hidden;\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -webkit-animation-duration: 0.3s;\n  -moz-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-delay: 0s;\n  -moz-animation-delay: 0s;\n  animation-delay: 0s;\n  -webkit-perspective: 8rem;\n  perspective: 8rem;\n  /*&.[data-type=\"bottom\"] .m-controls-content{\n    }*/ }\n  .m-controls .m-controls-content {\n    -webkit-transition: all 0.4s ease 0s;\n    -moz-transition: all 0.4s ease 0s;\n    transition: all 0.4s ease 0s; }\n  .m-controls[data-type=\"bottom\"] .m-controls-content {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    -webkit-transform: translate(0, 100%);\n    -moz-transform: translate(0, 100%);\n    transform: translate(0, 100%); }\n  .m-controls[data-type=\"middle\"] {\n    text-align: center; }\n    .m-controls[data-type=\"middle\"]:before {\n      content: '';\n      display: inline-block;\n      vertical-align: middle;\n      height: 100%; }\n    .m-controls[data-type=\"middle\"] .m-controls-content {\n      display: inline-block;\n      opacity: 0;\n      -webkit-transform-origin: center;\n      -moz-transform-origin: center;\n      transform-origin: center;\n      -webkit-transform: rotateX(-90deg);\n      -moz-transform: rotateX(-90deg);\n      transform: rotateX(-90deg); }\n  .m-controls[data-show] {\n    pointer-events: auto;\n    visibility: visible; }\n    .m-controls[data-show][data-type=\"bottom\"] .m-controls-content {\n      -webkit-transform: translate(0, 0);\n      -moz-transform: translate(0, 0);\n      transform: translate(0, 0); }\n    .m-controls[data-show][data-type=\"middle\"] .m-controls-content {\n      opacity: 1;\n      -webkit-transform: rotateX(0);\n      -moz-transform: rotateX(0);\n      transform: rotateX(0); }\n", ""]);

	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var Select = _react2['default'].createClass({
	    displayName: 'Select',

	    getInitialState: function getInitialState() {
	        return {
	            current: null
	        };
	    },
	    setCurrent: function setCurrent(index, cb) {
	        var _this = this;

	        this.setState({
	            current: index
	        }, function () {
	            _this.props.component.scrollEffect && _this.props.component.scrollEffect(_react2['default'].findDOMNode(_this.refs['slider']), index);
	            cb && cb();
	        });
	    },
	    calcSelected: function calcSelected() {
	        var _this2 = this;

	        var cont = _react2['default'].findDOMNode(this.refs['slider']),
	            lis = cont.children;

	        var midLine = cont.clientHeight / 2,
	            checkLine = midLine + cont.scrollTop;

	        [].some.call(lis, function (li, index) {
	            var offset = li.offsetTop + li.scrollHeight - checkLine;
	            if (offset >= 0) {
	                _this2.setCurrent(index);
	                return true;
	            }
	        }) || this.setCurrent(this.props.options.length - 1);
	    },

	    onTouchstart: function onTouchstart() {
	        this.props.component.tweenAni && this.props.component.tweenAni.stop();
	    },
	    onScroll: function onScroll() {
	        var _this3 = this;

	        if (this.props.component.noTitle) {
	            return;
	        }
	        clearTimeout(this.scrollTimer);
	        this.scrollTimer = setTimeout(function () {
	            return _this3.calcSelected();
	        }, 1000 / 5);
	    },
	    onSelect: function onSelect(e) {
	        var _this4 = this;

	        if (!this.props.component.noTitle) {
	            return;
	        }
	        var target = e.currentTarget,
	            index = +target.dataset.index;
	        this.setCurrent(index, function () {
	            _this4.select();
	        });
	    },

	    hide: function hide() {
	        this.props.component.hide();
	    },
	    select: function select() {
	        this.props.callback && this.props.callback(this.props.options[this.state.current], this.state.current);
	        this.hide();
	    },

	    render: function render() {
	        var _this5 = this;

	        var current = this.state.current;

	        return _react2['default'].createElement(
	            'div',
	            { className: 'm-controls-select clearfix' },
	            !this.props.component.noTitle ? _react2['default'].createElement(
	                'div',
	                { className: 'm-controls-select-head' },
	                _react2['default'].createElement(
	                    'a',
	                    { className: 'm-controls-select-cancel', onClick: this.hide },
	                    '取消'
	                ),
	                _react2['default'].createElement(
	                    'a',
	                    { className: 'm-controls-select-submit', onClick: this.select },
	                    '选择'
	                ),
	                _react2['default'].createElement(
	                    'h1',
	                    null,
	                    this.props.title
	                )
	            ) : null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'm-controls-slidercont' },
	                _react2['default'].createElement(
	                    'ul',
	                    { className: 'm-controls-slider', 'data-node': 'slider', ref: 'slider', onTouchstart: this.onTouchstart, onScroll: this.onScroll },
	                    this.props.options.map(function (item, i) {
	                        var option = typeof item === 'string' || typeof item === 'number' ? { text: item } : item;
	                        return _react2['default'].createElement(
	                            'li',
	                            { key: i, 'data-index': i, onClick: _this5.onSelect, className: (option.className || '') + (i === current ? ' current' : '') },
	                            option.text
	                        );
	                    })
	                )
	            )
	        );
	    }
	});

	exports['default'] = function (node, obj) {
	    return _react2['default'].render(_react2['default'].createElement(Select, { current: obj.current, options: obj.options, callback: obj.callback, title: obj.title, component: obj }), node);
	};

	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _styleScss = __webpack_require__(29);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _animatorToggleBase = __webpack_require__(12);

	var _animatorToggleBase2 = _interopRequireDefault(_animatorToggleBase);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var masks = {},
	    maskStack = [],
	    current = [];

	var Mask = (function (_toggleBase) {
	    _inherits(Mask, _toggleBase);

	    function Mask() {
	        var zIndex = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];

	        _classCallCheck(this, Mask);

	        _get(Object.getPrototypeOf(Mask.prototype), 'constructor', this).call(this, ['fadeIn', 'fadeOut']);
	        this.zIndex = zIndex;
	        this.outer = this.node = _core2['default'].create('<div class="m-mask" style="z-index:' + zIndex + ';"></div>');
	        document.body.appendChild(this.node);
	        masks[zIndex] = this;
	    }

	    _createClass(Mask, [{
	        key: 'show',
	        value: function show() {
	            if (!_get(Object.getPrototypeOf(Mask.prototype), 'show', this).call(this, true)) {
	                return;
	            }
	            current.push(this);
	            this.stackIndex = maskStack.length - 1;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (!_get(Object.getPrototypeOf(Mask.prototype), 'hide', this).call(this, true)) {
	                return;
	            }
	            // if(this.stackIndex === maskStack.length - 1){
	            current.splice(this.stackIndex, 1);
	            // }
	        }
	    }], [{
	        key: 'show',
	        value: function show() {
	            var zIndex = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];

	            if (!masks[zIndex]) {
	                new Mask(zIndex);
	            }
	            masks[zIndex].show();
	        }
	    }, {
	        key: 'hide',
	        value: function hide(zIndex) {
	            if (!zIndex) {
	                current.forEach(function (item) {
	                    return item.hide();
	                });
	                return;
	            }
	            if (!masks[zIndex]) {
	                return;
	            }
	            masks[zIndex].hide();
	        }
	    }]);

	    return Mask;
	})(_animatorToggleBase2['default']);

	exports['default'] = Mask;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".m-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  text-align: center;\n  z-index: 50;\n  /*opacity: 0;*/\n  visibility: hidden;\n  /*pointer-events:none;*/\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  /*@include transition-property(visibility);*/\n  -webkit-transition-delay: 400ms;\n  -moz-transition-delay: 400ms;\n  transition-delay: 400ms;\n  -webkit-animation-duration: 0.3s;\n  -moz-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-delay: 0.3s;\n  -moz-animation-delay: 0.3s;\n  animation-delay: 0.3s; }\n  .m-mask[data-show] {\n    /*opacity: 1;*/\n    /*pointer-events:auto;*/\n    visibility: visible;\n    -webkit-animation-delay: 0s;\n    -moz-animation-delay: 0s;\n    animation-delay: 0s;\n    -webkit-transition-delay: 0s;\n    -moz-transition-delay: 0s;\n    transition-delay: 0s; }\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ('value' in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _styleScss = __webpack_require__(32);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _animatorControl = __webpack_require__(22);

	var _animatorControl2 = _interopRequireDefault(_animatorControl);

	var _renderJsx = __webpack_require__(34);

	var _renderJsx2 = _interopRequireDefault(_renderJsx);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var current;

	var MaskTips = (function (_Control) {
	    _inherits(MaskTips, _Control);

	    function MaskTips(cfg) {
	        _classCallCheck(this, MaskTips);

	        _get(Object.getPrototypeOf(MaskTips.prototype), 'constructor', this).call(this);
	        this.node.classList.add('m-masktips');
	        _set(Object.getPrototypeOf(MaskTips.prototype), 'type', 'middle', this);
	        this.config(cfg);

	        this.data = null;
	        this.current = 0;
	        this.callback = null;
	        this.title = '';
	    }

	    _createClass(MaskTips, [{
	        key: 'config',
	        value: function config() {
	            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            var _ref$icon = _ref.icon;
	            var icon = _ref$icon === undefined ? '' : _ref$icon;
	            var _ref$text = _ref.text;
	            var text = _ref$text === undefined ? '' : _ref$text;
	            var _ref$touchable = _ref.touchable;
	            var touchable = _ref$touchable === undefined ? true : _ref$touchable;

	            this.icon = icon;
	            this.text = text;
	            this.touchable = touchable;
	        }
	    }, {
	        key: 'show',
	        value: function show(cfg) {
	            if (cfg) {
	                this.config(cfg);
	            }
	            (0, _renderJsx2['default'])(this.node, this);

	            current && current.hide();
	            current = this;

	            return _get(Object.getPrototypeOf(MaskTips.prototype), 'show', this).call(this);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            current = null;
	            return _get(Object.getPrototypeOf(MaskTips.prototype), 'hide', this).call(this);
	        }
	    }], [{
	        key: 'show',
	        value: function show() {
	            commonMaskTips.show.apply(commonMaskTips, arguments);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            commonMaskTips.hide.apply(commonMaskTips, arguments);
	        }
	    }]);

	    return MaskTips;
	})(_animatorControl2['default']);

	exports['default'] = MaskTips;

	var commonMaskTips = new MaskTips();
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".m-masktips {\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: .12rem;\n  text-align: center;\n  color: #e0e0e0;\n  min-width: 7em;\n  max-width: 40%;\n  margin: auto;\n  padding: .24rem;\n  pointer-events: none; }\n  .m-masktips .m-masktips-icon {\n    margin: .24rem; }\n    .m-masktips .m-masktips-icon span {\n      display: inline-block;\n      font: normal normal normal .28rem/1 themify;\n      font-size: inherit;\n      text-rendering: auto;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      font-size: .8rem; }\n    .m-masktips .m-masktips-icon .ti-reload {\n      animation: maware 1s infinite 0s; }\n  .m-masktips .m-masktips-text {\n    line-height: 1.5; }\n", ""]);

	// exports


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	exports["default"] = function (node, obj) {
	    return _react2["default"].render(_react2["default"].createElement(
	        "div",
	        { className: "" },
	        _react2["default"].createElement(
	            "div",
	            { className: "m-masktips-icon" },
	            (function (icon) {
	                switch (icon) {
	                    case 'loading':
	                        return _react2["default"].createElement("span", { className: "ti-reload" });
	                    case 'succ':
	                        return _react2["default"].createElement("span", { className: "ti-face-smile" });
	                    case 'error':
	                        return _react2["default"].createElement("span", { className: "ti-face-sad" });
	                    default:
	                        return _react2["default"].createElement("span", { className: "ti-" + icon });
	                }
	            })(obj.icon)
	        ),
	        _react2["default"].createElement(
	            "div",
	            { className: "m-masktips-text" },
	            obj.text
	        )
	    ), node);
	};

	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    唯一
	    btn状态： '' || disabled || active
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _core = __webpack_require__(6);

	var _core2 = _interopRequireDefault(_core);

	var _styleScss = __webpack_require__(36);

	var _styleScss2 = _interopRequireDefault(_styleScss);

	var _animatorToggleBase = __webpack_require__(12);

	var _animatorToggleBase2 = _interopRequireDefault(_animatorToggleBase);

	var _mask = __webpack_require__(28);

	var _mask2 = _interopRequireDefault(_mask);

	var _renderJsx = __webpack_require__(38);

	var _renderJsx2 = _interopRequireDefault(_renderJsx);

	//添加样式
	_core2['default'].insertStyle(_styleScss2['default']);

	var defaultBtn = [{
	    text: '确定',
	    style: 'active',
	    callback: function callback() {
	        this.hide();
	    }
	}];

	var Dialog = (function (_toggleBase) {
	    _inherits(Dialog, _toggleBase);

	    function Dialog(cfg, simple) {
	        _classCallCheck(this, Dialog);

	        _get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).call(this, ['zoomIn', 'zoomOut']);

	        this.outer = this.node = document.createElement('div');
	        this.node.className = 'm-dialog mid';
	        document.body.appendChild(this.node);

	        this.config(cfg, simple);
	    }

	    _createClass(Dialog, [{
	        key: 'config',
	        value: function config(cfg, simple) {
	            if (cfg === undefined) cfg = {};

	            this.title = cfg.title || '';
	            this.content = cfg.content || '';
	            this.type = cfg.type || '';
	            this.button = simple ? defaultBtn : cfg.button;
	            this.ins = (0, _renderJsx2['default'])(this.node, this);
	        }
	    }, {
	        key: 'setContent',
	        value: function setContent(content) {
	            this.ins.setContent(content);
	        }
	    }, {
	        key: 'show',
	        value: function show(cfg, simple) {
	            //写默认太累...加一个simple参数...
	            if (cfg) {
	                this.config(cfg, simple);
	            }
	            _mask2['default'].show(999);
	            _get(Object.getPrototypeOf(Dialog.prototype), 'show', this).call(this);
	            _core2['default'].componentHandler.push(this, cfg);
	            _core2['default'].trigger(this, 'show');
	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            _mask2['default'].hide(999);
	            _get(Object.getPrototypeOf(Dialog.prototype), 'hide', this).call(this);
	            _core2['default'].componentHandler.remove(this);
	            _core2['default'].trigger(this, 'hide');
	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.node.parentNode && this.node.parentNode.removeChild(this.node);
	        }
	    }], [{
	        key: 'show',
	        value: function show() {
	            return commonDialog.show.apply(commonDialog, arguments);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            return commonDialog.hide.apply(commonDialog, arguments);
	        }
	    }, {
	        key: 'setContent',
	        value: function setContent() {
	            return commonDialog.setContent.apply(commonDialog, arguments);
	        }
	    }]);

	    return Dialog;
	})(_animatorToggleBase2['default']);

	exports['default'] = Dialog;

	var commonDialog = new Dialog();
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(37);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".m-dialog {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  z-index: 1000;\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -webkit-animation-duration: 0.3s;\n  -moz-animation-duration: 0.3s;\n  animation-duration: 0.3s; }\n  .m-dialog[data-show] {\n    visibility: visible; }\n  .m-dialog .dia-wrap {\n    min-width: 4.00rem;\n    margin: 0 0.3rem;\n    border-radius: .16rem;\n    background: #fff;\n    text-align: left;\n    overflow: hidden;\n    word-break: break-all; }\n  .m-dialog .dia-head {\n    position: relative;\n    line-height: 3;\n    padding: 0 0.3rem;\n    text-align: center;\n    font-size: .32rem;\n    color: #666; }\n  .m-dialog .dia-contwrap {\n    padding: 0.2rem 0.3rem 0.5rem;\n    line-height: 1.5;\n    text-align: center; }\n  .m-dialog .dia-content {\n    min-height: .80rem;\n    max-height: 10.00rem;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-dialog .dia-btnbox {\n    border-top: 1px solid #ddd; }\n    .m-dialog .dia-btnbox .dia-btn {\n      display: inline-block;\n      background: #fcfcfc;\n      color: #888;\n      -webkit-transition: all 0.2s ease 0s;\n      -moz-transition: all 0.2s ease 0s;\n      transition: all 0.2s ease 0s; }\n      .m-dialog .dia-btnbox .dia-btn a {\n        display: block;\n        line-height: .80rem;\n        text-align: center;\n        font-size: .3rem;\n        /*font-weight: 700;*/\n        color: inherit; }\n      .m-dialog .dia-btnbox .dia-btn:active {\n        background: #e0e0e0; }\n      .m-dialog .dia-btnbox .dia-btn.active {\n        color: #4fcbbd; }\n      .m-dialog .dia-btnbox .dia-btn.active:active {\n        background: #4fcbbd;\n        color: #fff; }\n      .m-dialog .dia-btnbox .dia-btn.disabled {\n        background: #f8f8f8;\n        color: #999; }\n      .m-dialog .dia-btnbox .dia-btn + .dia-btn a {\n        border-left: 1px solid #ddd; }\n", ""]);

	// exports


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var Dialog = _react2['default'].createClass({
	    displayName: 'Dialog',

	    btnClick: function btnClick(e) {
	        var id = e.currentTarget.dataset.diabtnid;
	        var func = this.props.button[id].callback;
	        //TODO
	        func && func.call(this.props.component, this.props.component, e.currentTarget);
	    },
	    setContent: function setContent(content) {
	        var contentNode = _react2['default'].findDOMNode(this.rels['content']);
	        if (typeof content === 'string') {
	            contentNode.innerHTML = content;
	        } else if (content && content.nodeType) {
	            contentNode.innerHTML = '';
	            contentNode.appendChild(content);
	        }
	    },
	    render: function render() {
	        var _this = this;

	        var buttons = this.props.button || [];
	        var btnStyle = {
	            width: 100 / buttons.length + '%'
	        };
	        var type = this.props.type;
	        switch (type) {
	            case 'succ':
	                type = 'check';break;
	            case 'error':
	                type = 'error close';break;
	            case 'info':
	                type = 'info ti-info';break;
	            case 'warn':
	                type = 'warn ti-bolt-alt';break;
	        }

	        return _react2['default'].createElement(
	            'div',
	            { className: 'midcont' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'dia-wrap' },
	                _react2['default'].createElement(
	                    'div',
	                    { style: { display: this.props.title ? '' : 'none' } },
	                    _react2['default'].createElement(
	                        'h1',
	                        { className: 'dia-head' },
	                        this.props.title
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'dia-content', rel: 'content' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'dia-contwrap' },
	                        type ? _react2['default'].createElement('i', { className: "icon " + type }) : null,
	                        this.props.content
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'dia-btnbox' },
	                    buttons.map(function (btn, i) {
	                        return _react2['default'].createElement(
	                            'div',
	                            { key: i, className: "dia-btn " + btn.style, style: btnStyle },
	                            _react2['default'].createElement(
	                                'a',
	                                { 'data-diabtnid': i, onClick: _this.btnClick },
	                                btn.text
	                            )
	                        );
	                    })
	                )
	            )
	        );
	    }
	});

	module.exports = function (node, obj) {
	    _react2['default'].render(_react2['default'].createElement(Dialog, { button: obj.button, title: obj.title, content: obj.content, component: obj }), node);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (node) {
	    React.render(React.createElement(
	        "div",
	        null,
	        React.createElement(
	            "div",
	            { className: "form-cont" },
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "div",
	                    { className: "form-group-title" },
	                    "测试title"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "div",
	                        { className: "form-line-head" },
	                        React.createElement(
	                            "span",
	                            null,
	                            "什么鬼"
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "form-line-content" },
	                        React.createElement("input", { placeholder: "哈哈哈哈哈哈" })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "label",
	                        { className: "form-line-content" },
	                        "什么鬼",
	                        React.createElement("input", { type: "checkbox", className: "ui-switch" }),
	                        React.createElement("span", null)
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line tips" },
	                    React.createElement(
	                        "div",
	                        { className: "form-line-content" },
	                        "Tips"
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "div",
	                    { className: "form-group-title" },
	                    "321"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "label",
	                        { className: "form-line-content" },
	                        React.createElement("input", { type: "radio", className: "ui-radio", name: "a1" }),
	                        React.createElement(
	                            "span",
	                            null,
	                            "喵了个咪"
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "label",
	                        { className: "form-line-content" },
	                        React.createElement("input", { type: "radio", className: "ui-radio", name: "a1" }),
	                        React.createElement(
	                            "span",
	                            null,
	                            "喵了",
	                            React.createElement("input", { className: "form-input-mark", size: "3" }),
	                            "个咪"
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "label",
	                        { className: "form-line-content" },
	                        React.createElement("input", { type: "checkbox", className: "ui-checkbox", name: "a1" }),
	                        React.createElement(
	                            "span",
	                            null,
	                            "喵了个咪"
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement(
	                        "label",
	                        { className: "form-line-content" },
	                        React.createElement("input", { type: "checkbox", className: "ui-checkbox", name: "a1" }),
	                        React.createElement(
	                            "span",
	                            null,
	                            "喵了",
	                            React.createElement("input", { className: "form-input-mark", size: "3" }),
	                            "个咪"
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "div",
	                    { className: "form-group-title" },
	                    "321"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "form-line" },
	                    React.createElement("textarea", { placeholder: "喵喵喵喵喵喵喵" })
	                )
	            )
	        )
	    ), node);
	};

	module.exports = exports["default"];

/***/ }
/******/ ]);