(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _templateHtml = require('./template.html');

var _templateHtml2 = _interopRequireDefault(_templateHtml);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _toggleBase2 = require('../toggleBase');

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

},{"../../core":6,"../toggleBase":4,"./style.scss":2,"./template.html":3}],2:[function(require,module,exports){
module.exports = ".m-slidedrawer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #f8f8f8;\n  text-align: left;\n  z-index: 100;\n  overflow: hidden;\n  outline: 1px #ccc solid;\n  visibility: hidden;\n  /*@include transition;*/\n  -webkit-transform: translate(100%, 0);\n  -moz-transform: translate(100%, 0);\n  transform: translate(100%, 0);\n  /*@include transform(translateX(100%));*/\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  animation-duration: 0.4s; }\n  .m-slidedrawer[data-show] {\n    visibility: visible;\n    -webkit-transform: translate(0%, 0);\n    -moz-transform: translate(0%, 0);\n    transform: translate(0%, 0);\n    /*@include transform(translateX(0%));*/ }\n  .m-slidedrawer .slide-wrap {\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-slidedrawer.animated {\n    pointer-events: none;\n    /*.slide-wrap{\n            display: none;\n        }*/ }\n\nbody #wrapper {\n  -webkit-transition: all 0.4s ease 0s;\n  -moz-transition: all 0.4s ease 0s;\n  transition: all 0.4s ease 0s; }\n\nbody.drawer-sub #wrapper {\n  -webkit-transform: translateX(-40%);\n  -moz-transform: translateX(-40%);\n  transform: translateX(-40%); }\n";
},{}],3:[function(require,module,exports){
module.exports = "<div class=\"m-slidedrawer\">\n    <div class=\"slide-wrap\" data-node=\"scrollCont\"></div>\n</div>\n";

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _core = require('../../core');

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

},{"../../core":6}],5:[function(require,module,exports){
'use strict';

var Drawer = require('../../animator/drawer');

module.exports = Drawer;

},{"../../animator/drawer":1}],6:[function(require,module,exports){
"use strict";

module.exports = alpha;

},{}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _commonComponentsDrawer = require('../../common/components/drawer');

var _commonComponentsDrawer2 = _interopRequireDefault(_commonComponentsDrawer);

_core2['default'].register('blog', function ($) {
    var drawer = new _commonComponentsDrawer2['default']();
    drawer.setContent('<iframe class="blog-drawer" name="blogPage"></iframe>');
    return {
        init: function init() {
            $.evt(this.node).on('click', '[data-act="open"]', function (e) {
                drawer.show({
                    href: this.getAttribute('href')
                });
            });
        },
        show: function show() {},
        hide: function hide() {}
    };
});

},{"../../common/components/drawer":5,"../core":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = window.alpha;
module.exports = exports["default"];

},{}]},{},[7]);
