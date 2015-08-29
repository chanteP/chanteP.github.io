(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

},{"../../core":22,"../toggleBase":7,"./style.scss":2,"./template.html":3}],2:[function(require,module,exports){
module.exports = ".m-controls {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 300;\n  background: rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n  pointer-events: none;\n  visibility: hidden;\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  animation-duration: 0.4s;\n  -webkit-animation-delay: 0s;\n  -moz-animation-delay: 0s;\n  animation-delay: 0s;\n  /*&.[data-type=\"bottom\"] .m-controls-content{\n    }*/ }\n  .m-controls .m-controls-content {\n    position: absolute;\n    -webkit-transition: all 0.2s ease 0s;\n    -moz-transition: all 0.2s ease 0s;\n    transition: all 0.2s ease 0s; }\n  .m-controls[data-type=\"bottom\"] .m-controls-content {\n    bottom: 0;\n    width: 100%;\n    -webkit-transform: translate(0, 100%);\n    -moz-transform: translate(0, 100%);\n    transform: translate(0, 100%); }\n  .m-controls[data-type=\"middle\"] .m-controls-content {\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    text-align: center;\n    -webkit-transform: scaleY(0) translate(-50%, -50%);\n    -moz-transform: scaleY(0) translate(-50%, -50%);\n    transform: scaleY(0) translate(-50%, -50%); }\n  .m-controls[data-show] {\n    pointer-events: auto;\n    visibility: visible; }\n    .m-controls[data-show][data-type=\"bottom\"] .m-controls-content {\n      -webkit-transform: translate(0, 0);\n      -moz-transform: translate(0, 0);\n      transform: translate(0, 0); }\n    .m-controls[data-show][data-type=\"middle\"] .m-controls-content {\n      -webkit-transform: scaleY(1) translate(-50%, -50%);\n      -moz-transform: scaleY(1) translate(-50%, -50%);\n      transform: scaleY(1) translate(-50%, -50%); }\n";
},{}],3:[function(require,module,exports){
module.exports = "<div class=\"m-controls\">\n    <div class=\"m-controls-content\" data-node=\"content\"></div>\n</div>";

},{}],4:[function(require,module,exports){
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

},{"../../core":22,"../toggleBase":7,"./style.scss":5,"./template.html":6}],5:[function(require,module,exports){
module.exports = ".m-slidedrawer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #f8f8f8;\n  text-align: left;\n  z-index: 100;\n  overflow: hidden;\n  outline: 1px #ccc solid;\n  visibility: hidden;\n  /*@include transition;*/\n  -webkit-transform: translate(100%, 0);\n  -moz-transform: translate(100%, 0);\n  transform: translate(100%, 0);\n  /*@include transform(translateX(100%));*/\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  animation-duration: 0.4s; }\n  .m-slidedrawer[data-show] {\n    visibility: visible;\n    -webkit-transform: translate(0%, 0);\n    -moz-transform: translate(0%, 0);\n    transform: translate(0%, 0);\n    /*@include transform(translateX(0%));*/ }\n  .m-slidedrawer .slide-wrap {\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-slidedrawer.animated {\n    pointer-events: none;\n    /*.slide-wrap{\n            display: none;\n        }*/ }\n\nbody #wrapper {\n  -webkit-transition: all 0.4s ease 0s;\n  -moz-transition: all 0.4s ease 0s;\n  transition: all 0.4s ease 0s; }\n\nbody.drawer-sub #wrapper {\n  -webkit-transform: translateX(-40%);\n  -moz-transform: translateX(-40%);\n  transform: translateX(-40%); }\n";
},{}],6:[function(require,module,exports){
module.exports = "<div class=\"m-slidedrawer\">\n    <div class=\"slide-wrap\" data-node=\"scrollCont\"></div>\n</div>\n";

},{}],7:[function(require,module,exports){
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

},{"../../core":22}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _animatorToggleBase = require('../../animator/toggleBase');

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

},{"../../animator/toggleBase":7,"../../core":22,"./style.scss":9}],9:[function(require,module,exports){
module.exports = ".m-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  text-align: center;\n  z-index: 50;\n  /*opacity: 0;*/\n  visibility: hidden;\n  /*pointer-events:none;*/\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  /*@include transition-property(visibility);*/\n  -webkit-transition-delay: 400ms;\n  -moz-transition-delay: 400ms;\n  transition-delay: 400ms;\n  -webkit-animation-duration: 0.3s;\n  -moz-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-delay: 0.3s;\n  -moz-animation-delay: 0.3s;\n  animation-delay: 0.3s; }\n  .m-mask[data-show] {\n    /*opacity: 1;*/\n    /*pointer-events:auto;*/\n    visibility: visible;\n    -webkit-animation-delay: 0s;\n    -moz-animation-delay: 0s;\n    animation-delay: 0s;\n    -webkit-transition-delay: 0s;\n    -moz-transition-delay: 0s;\n    transition-delay: 0s; }\n";
},{}],10:[function(require,module,exports){
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

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _animatorControl = require('../../animator/control');

var _animatorControl2 = _interopRequireDefault(_animatorControl);

var _renderJsx = require('./render.jsx');

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

},{"../../animator/control":1,"../../core":22,"./render.jsx":11,"./style.scss":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('../../react');

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

},{"../../react":23}],12:[function(require,module,exports){
module.exports = ".m-masktips {\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: .12rem;\n  text-align: center;\n  color: #e0e0e0;\n  width: 25%;\n  max-width: 24%;\n  margin: auto;\n  padding: .24rem;\n  pointer-events: none; }\n  .m-masktips .m-masktips-icon {\n    margin: .24rem; }\n    .m-masktips .m-masktips-icon span {\n      display: inline-block;\n      font: normal normal normal .28rem/1 themify;\n      font-size: inherit;\n      text-rendering: auto;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      font-size: .8rem; }\n    .m-masktips .m-masktips-icon .ti-reload {\n      animation: maware 1s infinite 0s; }\n";
},{}],13:[function(require,module,exports){
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

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _animatorToggleBase = require('../../animator/toggleBase');

var _animatorToggleBase2 = _interopRequireDefault(_animatorToggleBase);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _renderJsx = require('./render.jsx');

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
            this.button = simple ? defaultBtn : cfg.button;
            (0, _renderJsx2['default'])(this.node, this);
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
        }
    }, {
        key: 'hide',
        value: function hide() {
            _mask2['default'].hide(999);
            _get(Object.getPrototypeOf(Dialog.prototype), 'hide', this).call(this);
            _core2['default'].componentHandler.remove(this);
            _core2['default'].trigger(this, 'hide');
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
    }]);

    return Dialog;
})(_animatorToggleBase2['default']);

exports['default'] = Dialog;

var commonDialog = new Dialog();
module.exports = exports['default'];

},{"../../animator/toggleBase":7,"../../core":22,"../mask":17,"./render.jsx":14,"./style.scss":15}],14:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('../../react');

var _react2 = _interopRequireDefault(_react);

var Dialog = _react2['default'].createClass({
    displayName: 'Dialog',

    getInitialState: function getInitialState() {
        return {
            button: this.props.button || [],
            content: this.props.content,
            title: this.props.title
        };
    },
    btnClick: function btnClick(e) {
        var id = e.currentTarget.dataset.diabtnid;
        var func = this.props.button[id].callback;
        //TODO
        func && func.call(this.props.component, this.props.component, e.currentTarget);
    },
    render: function render() {
        var _this = this;

        var buttons = this.props.button || [];
        var btnStyle = {
            width: 100 / buttons.length + '%'
        };

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
                    { className: 'dia-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'dia-contwrap' },
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

},{"../../react":23}],15:[function(require,module,exports){
module.exports = ".m-dialog {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  z-index: 1000;\n  -webkit-transition: all 0.2s ease 0s;\n  -moz-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -webkit-animation-duration: 0.3s;\n  -moz-animation-duration: 0.3s;\n  animation-duration: 0.3s; }\n  .m-dialog[data-show] {\n    visibility: visible; }\n  .m-dialog .dia-wrap {\n    min-width: 4.00rem;\n    margin: 0 0.14rem;\n    border-radius: .16rem;\n    background: #fff;\n    text-align: left;\n    overflow: hidden;\n    word-break: break-all; }\n  .m-dialog .dia-head {\n    position: relative;\n    height: .60rem;\n    line-height: .60rem;\n    padding: 0 0.14rem;\n    border-bottom: 1px #ddd solid; }\n    .m-dialog .dia-head h1 {\n      font-size: .28rem; }\n  .m-dialog .dia-contwrap {\n    padding: 0.48rem 0.28rem;\n    line-height: 1.5; }\n  .m-dialog .dia-content {\n    min-height: .80rem;\n    max-height: 10.00rem;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch; }\n  .m-dialog .dia-btnbox {\n    border-top: 1px solid #ddd; }\n    .m-dialog .dia-btnbox .dia-btn {\n      display: inline-block;\n      background: #fcfcfc;\n      color: #888;\n      -webkit-transition: all 0.2s ease 0s;\n      -moz-transition: all 0.2s ease 0s;\n      transition: all 0.2s ease 0s; }\n      .m-dialog .dia-btnbox .dia-btn a {\n        display: block;\n        line-height: .80rem;\n        text-align: center;\n        font-size: .3rem;\n        /*font-weight: 700;*/\n        color: inherit; }\n      .m-dialog .dia-btnbox .dia-btn:active {\n        background: #e0e0e0; }\n      .m-dialog .dia-btnbox .dia-btn.active {\n        color: #4fcbbd; }\n      .m-dialog .dia-btnbox .dia-btn.active:active {\n        background: #4fcbbd;\n        color: #fff; }\n      .m-dialog .dia-btnbox .dia-btn.disabled {\n        background: #f8f8f8;\n        color: #999; }\n      .m-dialog .dia-btnbox .dia-btn + .dia-btn a {\n        border-left: 1px solid #ddd; }\n";
},{}],16:[function(require,module,exports){
'use strict';

var Drawer = require('../../animator/drawer');

module.exports = Drawer;

},{"../../animator/drawer":4}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _animatorToggleBase = require('../../animator/toggleBase');

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

},{"../../animator/toggleBase":7,"../../core":22,"./style.scss":18}],18:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],19:[function(require,module,exports){
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

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _styleScss = require('./style.scss');

var _styleScss2 = _interopRequireDefault(_styleScss);

var _animatorControl = require('../../animator/control');

var _animatorControl2 = _interopRequireDefault(_animatorControl);

var _renderJsx = require('./render.jsx');

var _renderJsx2 = _interopRequireDefault(_renderJsx);

//添加样式
_core2['default'].insertStyle(_styleScss2['default']);

var findCurrent = function findCurrent(list, text) {
    if (typeof text === 'number') {
        return text;
    }
    var index = 0;
    var type = typeof list[0] === 'string';
    list.some(function (item, i) {
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

        this.data = null;
        this.current = 0;
        this.callback = null;
        this.title = '';
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
        key: 'show',
        value: function show(index, list, cb, title) {
            this.current = findCurrent(list, index || 0);
            this.data = list || this.data;
            this.callback = cb || this.callback;
            this.title = title || this.title;

            (0, _renderJsx2['default'])(this.node, this);

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

},{"../../animator/control":1,"../../core":22,"./render.jsx":20,"./style.scss":21}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('../../react');

var _react2 = _interopRequireDefault(_react);

var Select = _react2["default"].createClass({
    displayName: "Select",

    getInitialState: function getInitialState() {
        return {
            current: this.props.current
            // list : this.props.list
        };
    },
    onSelect: function onSelect(e) {
        var target = e.currentTarget;
        this.setState({
            current: +target.dataset.index
        });
    },
    hide: function hide() {
        this.props.component.hide();
    },
    select: function select() {
        this.props.callback && this.props.callback(this.props.list[this.state.current], this.state.current);
        this.hide();
    },
    render: function render() {
        var _this = this;

        var current = this.state.current;

        return _react2["default"].createElement(
            "div",
            { className: "m-controls-select clearfix" },
            _react2["default"].createElement(
                "div",
                { className: "m-controls-select-head" },
                _react2["default"].createElement(
                    "a",
                    { className: "m-controls-select-cancel", onClick: this.hide },
                    "取消"
                ),
                _react2["default"].createElement(
                    "a",
                    { className: "m-controls-select-submit", onClick: this.select },
                    "选择"
                ),
                _react2["default"].createElement(
                    "h1",
                    null,
                    this.props.title
                )
            ),
            _react2["default"].createElement(
                "ul",
                null,
                this.props.list.map(function (item, i) {
                    return _react2["default"].createElement(
                        "li",
                        { key: i, "data-index": i, onClick: _this.onSelect, className: (item.className || '') + (i === current ? ' current' : '') },
                        typeof item === 'string' || typeof item === 'number' ? item : item.text
                    );
                })
            )
        );
    }
});

exports["default"] = function (node, obj) {
    return _react2["default"].render(_react2["default"].createElement(Select, { current: obj.current, list: obj.data, callback: obj.callback, title: obj.title, component: obj }), node);
};

module.exports = exports["default"];

},{"../../react":23}],21:[function(require,module,exports){
module.exports = ".m-controls-select {\n  background: #fff; }\n  .m-controls-select .m-controls-select-head {\n    line-height: .66rem;\n    border-bottom: 1px solid #eee; }\n    .m-controls-select .m-controls-select-head h1 {\n      font-size: .28rem;\n      color: #333;\n      font-weight: 700;\n      text-align: center;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    .m-controls-select .m-controls-select-head .m-controls-select-cancel,\n    .m-controls-select .m-controls-select-head .m-controls-select-submit {\n      font-size: .24rem;\n      color: #4fcbbd;\n      padding: 0 1em; }\n    .m-controls-select .m-controls-select-head .m-controls-select-cancel {\n      float: left; }\n    .m-controls-select .m-controls-select-head .m-controls-select-submit {\n      float: right; }\n  .m-controls-select ul {\n    max-height: 4.5rem;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch;\n    -moz-overflow-scrolling: touch;\n    background: #f0f0f0; }\n  .m-controls-select li {\n    /*background: #fff;*/\n    color: #333;\n    border-bottom: 1px solid #e0e0e0;\n    display: block;\n    line-height: .88rem;\n    text-align: center;\n    cursor: pointer;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .m-controls-select .current {\n    font-weight: 700;\n    color: #fb7e35; }\n";
},{}],22:[function(require,module,exports){
"use strict";

module.exports = alpha;

},{}],23:[function(require,module,exports){
"use strict";

module.exports = React;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = window.alpha;
module.exports = exports["default"];

},{}],25:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var Drawer = require('../../common/components/drawer'),
    Select = require('../../common/components/select'),
    Mask = require('../../common/components/Mask'),
    MaskTips = require('../../common/components/MaskTips'),
    Dialog = require('../../common/components/dialog');
_core2['default'].register('demo', function ($) {
    return {
        init: function init() {
            var drawer = new Drawer();
            callDrawer.addEventListener('click', function (e) {
                drawer.setContent('123123123');
                drawer.show();
            });

            // var select = new Select;
            callSelect.addEventListener('click', function (e) {
                Select.show(3, [1, 2, 3, 5, 6, '吃饭吃饭场景非常非常规范郭富城不会 v 个 v ', 457, 898, 90909, 8878, 676767], function (item, index) {
                    console.log(item, index);
                }, 'fxxk');
            });

            // var select = new Select;
            callMask.addEventListener('click', function (e) {
                Mask.show(50);
                setTimeout(function () {
                    Mask.hide();
                }, 1200);
            });

            // var select = new Select;
            callDialog.addEventListener('click', function (e) {
                Dialog.show({
                    title: '什么鬼',
                    content: '什么鬼'
                }, true);
            });

            // var select = new Select;
            callMaskTips.addEventListener('click', function (e) {
                MaskTips.show({
                    icon: 'loading',
                    text: '什么鬼'
                }, true);
            });
        },
        show: function show() {},
        hide: function hide() {}
    };
});

},{"../../common/components/Mask":8,"../../common/components/MaskTips":10,"../../common/components/dialog":13,"../../common/components/drawer":16,"../../common/components/select":19,"../core":24}]},{},[25]);
