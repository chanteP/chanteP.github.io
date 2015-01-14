(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./bg":3,"./config":4,"./kit":6,"./nav":7,"./spa":9,"np-databind":31}],2:[function(require,module,exports){
var npc;

var contWidth, contHeight, contPercent = .6, R;
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
    color_lite = 'hsl('+mainColor+', 61.23%, 90%)',
    color_base = 'hsl('+mainColor+', 61.23%, 72%)',
    color_deep = 'hsl('+(mainColor+5)+', 71.23%, 60%)'
    ;
var defaultDeg = 104;
var toArc = function(deg){
    return deg * 2 * PI / 360;
}

var initWater = function(){
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight/npc.pixelRatio, 2) + pow(contWidth/npc.pixelRatio, 2));

    water = npc.create(.5 * contWidth, .5 * contHeight, function(ctx, fps){
        this.rotate += this.targetRotateDis * 2 / fps;
        // this.rotate += (this.targetRotate - this.rotate) / fps;
        this.deg += (this.targetDeg - this.deg) / fps;

        var arcTime = sin(toArc(this.timer++));

        var px = (R * sin(this.deg)) | 0, py = (R * cos(this.deg)) | 0;
        var wave = (arcTime * min(100, R - abs(py))) | 0;
        ctx.rotate(toArc(this.rotate));

        ctx.beginPath();

        ctx.arc(0, 0, R, PI / 2 + this.deg, PI / 2 - this.deg, true);
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(0, py + wave, 0, py - wave, -px, py);

        //TODO优化
        var gradient = npc.ctx.createLinearGradient(0, py, 0, contHeight - this.y);
        gradient.addColorStop(0, color_lite);
        gradient.addColorStop(0.5, color_base);
        gradient.addColorStop(1, color_deep);

        ctx.strokeStyle = color_base;
        ctx.strokeWidth = 1;
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
}

var setWater = function(rotate, deg, force){
    rotate = rotate === null ? water.targetRotate : rotate;
    water.targetRotate = rotate;
    water.targetRotateDis = -rotate - water.rotate;
    if(water.targetRotateDis > 180){
        water.targetRotateDis -= 360;
    }
    else if(water.targetRotateDis < -180){
        water.targetRotateDis += 360;
    }
    water.targetDeg = toArc(deg);
    // npc.canvas.style.backgroundColor = 'hsla(177, 61.23%, 55%, '+ min(.1, max(0, 1 - water.deg + 1.13 - .6))+')';
}
var calcHorizon = function(x, y, z){
    var g1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var rotate = Math.acos(y / g1) * 360 / 2 / Math.PI;
    // document.getElementsByTagName('h1')[0].innerHTML = g1 + ' ' +z;
    var deg = (z < 0 ? g1 : 10 - g1 + 14) / 10 / 2 * 180;

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    deg = max(80, min(deg, 180));
    setWater(rotate, deg);
}

var initBase = function(engine){
    npc = engine;
    initWater();
    var lock = false;
    var counter = 0;
    if (window.DeviceOrientationEvent) {
        window.addEventListener('devicemotion', function(e){
            if(counter++ > 3){
                counter = 0;
                if(lock){return;}
                calcHorizon(e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z);
            }
        });
　　}
    var timer;
    //TODO
    page.onPageChange(function(pageName){
        clearTimeout(timer);
        if(pageName === 'index'){
            lock = false;
            setWater(null, defaultDeg);
            npc.play();
        }
        else{
            lock = true;
            setWater(0, 180);
            timer = setTimeout(function(){
                npc.pause();
            }, 5000);
        }
    });
    var battery = navigator.battery || navigator.webkitBattery;
    if (battery) {
        battery.addEventListener("levelchange", function (e){
            if(battery.level < .5){
                npc.stop();
            }
        });
    }
}
module.exports = {
    init : initBase,
    name : 'Aqua'
}
var page = require('../spa');

},{"../spa":9}],3:[function(require,module,exports){
var $ = require('../kit');
var NPCanvas = require('np-canvas');
var core = require('../spa');
// var effect = $.isMobileMode && require('./Aqua');
var effect = require('./Aqua');
var databind = require('np-databind');
var npc;

var fitPage = function(page, prePage){
    if(!page){return;}
    if((page === 'index') ^ (prePage === 'index')){
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var canvas = $.find('#npc');
    if(!canvas){return;}
    npc = canvas.engine = new NPCanvas(canvas, {
        autoFit : true,
        pixelRatio : window.devicePixelRatio
    });
    effect && effect.init(npc);
    npc.play();
    core.onPageChange(fitPage);

    new DataBind('style', effect ? effect.name : 'prototype');
    $.evt(document.body, $.isMobileMode && {})
        .on($.isMobileMode ? 'tap' : 'click', '[data-npc]', function(){
            if(this.dataset.npc === 'pause'){
                npc.pause();
                this.dataset.npc = 'play';
            }
            else if(this.dataset.npc === 'play'){
                npc.play();
                this.dataset.npc = 'pause';
            }
        });
});

module.exports = npc;

},{"../kit":6,"../spa":9,"./Aqua":2,"np-canvas":20,"np-databind":31}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map
},{}],6:[function(require,module,exports){
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
var Hammer = require('./hammer.min');
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
                if(data){
                    var hammer = new Hammer(element, data); 
                    hammer.on(evt, cb, capture);
                }
                else{
                    element.addEventListener(evt, cb, capture);
                }
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
require('./preventBounceScroll').bind();

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

},{"./config":4,"./hammer.min":5,"./preventBounceScroll":8,"./touch.kit":12,"./tween":13}],7:[function(require,module,exports){
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

},{"../kit":6}],8:[function(require,module,exports){
var startPos, curPos;
var notPreventScrollElement = function(element){
    return isExtraElement(element) || isScrollElement(element);
}
//其他不爽的element
var isExtraElement = function(element){
    switch(true){
        case element.tagName === 'INPUT' && element.type === 'range':;
            return true;
        default :
            return false;
    }
}
//能滚的element
var isScrollElement = function(element) {
    while(element) {
        if (checkScrollElement(element)){
            return element;
        }
        element = element.parentElement;
    }
    return false;
}
var checkScrollElement = function(element){
    //任性
    return (window.getComputedStyle(element)['overflow'] === 'auto' || window.getComputedStyle(element)['overflow'] === 'scroll')
        && element.scrollHeight > element.clientHeight
        && !(startPos <= curPos && element.scrollTop === 0)
        && !(startPos >= curPos && element.scrollHeight - element.scrollTop === window.parseInt(window.getComputedStyle(element).height));

        // && element.scrollHeight > element.offsetHeight;
}

//bind
var bindFunc = {
    move : function(e) {
        curPos = e.touches ? e.touches[0].screenY : e.screenY;
        notPreventScrollElement(e.target) || e.preventDefault();
    },
    start : function(e){
        startPos = e.touches ? e.touches[0].screenY : e.screenY;
    }
}
module.exports = {
    bind : function(){
        document.addEventListener('touchmove', bindFunc.move, false);
        document.addEventListener('touchstart', bindFunc.start, false);
    },
    destory : function(){
        document.removeEventListener('touchmove', bindFunc.move, false);
        document.removeEventListener('touchstart', bindFunc.start, false);
    }
}

},{}],9:[function(require,module,exports){

var $ = require('../kit');
var url = require('./url');
var api;
var self = window.self;
var page = '', pageCallback = [];

var inited = false;

var defaultTitle = 'neetproject @2015'

var init = function(){
    init = function(){};
    $.evt(document.body, $.isMobileMode && {})
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
        })
        .on($.isMobileMode ? 'tap' : 'click', 'a[href^="/"]', function(e){
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
    set page(value){
        pageCallback.forEach(function(func){
            func(value, page);
        });
        page = value;
    },
    get page(){
        return page;
    },
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
    onUrlChange : url.on,
    onPageChange : function(func){
        pageCallback.push(func);
    }
}
var loader = require('./loader');

},{"../kit":6,"./loader":10,"./url":11}],10:[function(require,module,exports){
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
            console.log(e)
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
                core.page = cur.page;
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
var core = require('./index');

},{"../kit":6,"./index":9}],11:[function(require,module,exports){

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
},{}],12:[function(require,module,exports){
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
},{"./kit":6}],13:[function(require,module,exports){
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

},{"./kit":6}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
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
},{"_process":16}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
var requestAnimationFrame = require('./kit').requestAnimationFrame;
var merge = require('./kit').merge;
var CanvasObject = require('./object');

var max = Math.max;

var Engine = function(canvasNode, config){
    if(!canvasNode){throw 'canvasNode not found';}
    this.list = [];

    this.canvas = canvasNode;
    this._status = 0;

    this.fps = 60;
    this.number = 0;

    this.ctx = canvasNode.getContext('2d');
    this.ctx.translate(.5, .5);

    this.cfg = {};
    this.config(config);
    if(this.cfg.autoFix){
        this.width = this.canvas.clientWidth * this.cfg.pixelRatio;
        this.height = this.canvas.clientHeight * this.cfg.pixelRatio;
    }
}
Engine.extend = CanvasObject.extend;
Engine.create = function(x, y, shape){
    return new CanvasObject(x, y, shape);
}
Engine.prototype = {
    constructor : Engine,

    config : function(cfg){
        cfg = cfg || {};

        this.cfg = merge({
            renderCallback : function(){}
            ,autoFix : true
            ,pixelRatio : 1
        }, this.cfg, cfg);

        this.renderCallback = this.cfg.renderCallback;
        this.pixelRatio = this.cfg.pixelRatio;
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
    set status(value){
        if(this._status === this.DESTROY){
            this._status = this.DESTROY;
        }
        return this._status = value;
    },
    get status(){
        return this._status;
    },

    STOP : 0,
    PAUSE : 1,
    PLAY : 2,
    WAIT : 4,
    DESTROY : 9,

    play : function(){
        if(this.status === this.STOP){
            this.status = this.PLAY;
            this.refresh();
        }
        this.status = this.PLAY;
        return this;
    },
    stop : function(){
        this.status = this.STOP;
        this.list.length = 0;
        this.number = 0;
        return this;
    },
    pause : function(){
        this.status = this.PAUSE;
        return this;
    },

    refresh : function(){
        if(this.status === this.DESTROY){return;}
        if(this.status === this.PLAY){
            this.number = 0;
            if(!this.static){
                this.ctx.clearRect(0, 0, this.width, this.height);
                
                this.render(this.list);
            }
            else{
                this.list.length = 0;
            }
            if(this.number === 0){
                this.status = this.WAIT;
            }
        }
        this.fpsCalc();
        requestAnimationFrame(this.refresh.bind(this));
    },
    //render---------------------------------------------
    static : false, //静态
    render : function(list){
        var obj, 
            fps = this.fps, 
            context = this.ctx;
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            if(Array.isArray(obj)){
                if(obj.config){
                    context.save();
                    this.config(obj.config);
                    this.render(obj);
                    context.restore();
                }
                else{
                    this.render(obj);
                }
                continue;
            }
            obj.life = this.timestamp - obj.timestamp;
            context.save();
            context.translate(obj.x, obj.y);
            obj.draw(context, max(fps, 30));
            this.number++;
            context.restore();
            if(obj.die){
                list.splice(i, 1);
                i--;
            }
        };
        return this;
    },
    //object---------------------------------------------
    create : function(x, y, shape){
        return Engine.create(x, y, shape);
    },
    add : function(obj, list){
        (list || this.list).push(obj);
        obj.engine = this;
        obj.timestamp = this.timestamp;
        obj.life = 0;
        if(this.status === this.WAIT){
            this.status = this.PLAY;
        }
        return this;
    },
    del : function(obj){
        obj.die = true;
        return this;
    },
    //fps---------------------------------------------
    timestamp : null,
    timer : 0,
    _fpsCounter : 1,
    _fpsFrequency : 60,
    fpsCalc : function(){
        if(this._fpsCounter++ >= this._fpsFrequency){
            if(this.timestamp){
                this.fps = (this._fpsFrequency / (Date.now() - this.timestamp) * 1000).toFixed(2);
            }
            this.timestamp = Date.now();
            this._fpsCounter = 1;
            this.renderCallback(this);
        }
        this.timer++;
    },
    //distroy---------------------------------------------
    destroy : function(){
        this.stop();
        this.status = this.DESTROY;
        this.list = [];
    }
};

window.NPCanvas = Engine;
module.exports = Engine;
},{"./kit":18,"./object":19}],18:[function(require,module,exports){
var $ = {
    requestAnimationFrame : null
        || window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.oRequestAnimationFrame
        || function(callback) {setTimeout(callback, 1000 / 60);},
    merge : function(){
        var rs = {}, cur, args = arguments;
        for(var i = 0, j = arguments.length; i < j; i++){
            cur = arguments[i];
            for(var key in cur){
                if(!cur.hasOwnProperty(key)){continue;}
                rs[key] = cur[key];
            }
        }
        return rs;
    }
}
module.exports = $;
},{}],19:[function(require,module,exports){

var marker = 'np';
var CanvasObject = function(x, y, shape){
    if(typeof x === 'function'){
        shape = x;
        x = 0;
    }
    this.x = x || 0;
    this.y = y || 0;
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
    if(typeof newClassConstructor === 'function'){
        return this.constructor.extend(newClassConstructor, this);
    }
    else{
        if(typeof newClassConstructor !== 'object' || newClassConstructor.toString() !== '[object Object]'){
            newClassConstructor = {};
        }
        for(var key in newClassConstructor){
            if(!newClassConstructor.hasOwnProperty(key)){continue;}
            newClassConstructor[key] = {value:newClassConstructor[key], writable:true};
        }
        return Object.create(this, newClassConstructor);
    }
}

//绘制
CanvasObject.prototype.draw = function(ctx, fps){
    this.shape(ctx, fps);
}
module.exports = CanvasObject;
},{}],20:[function(require,module,exports){
module.exports = require('./dev/engine');
},{"./dev/engine":17}],21:[function(require,module,exports){
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

},{"./ArrayExtend":22,"./Observer":27,"./config":28,"./kit":30}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
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
},{"./Accessor":21,"./Observer":27,"./config":28,"./kit":30}],24:[function(require,module,exports){
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



},{"./DataBind":23,"./config":28,"./kit":30}],25:[function(require,module,exports){
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


},{"./DataBind":23,"./Filter":26,"./config":28,"./kit":30,"art-template":34}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./Accessor":21,"./kit":30}],28:[function(require,module,exports){
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
},{"./kit":30}],29:[function(require,module,exports){
/*!
    Σヾ(ﾟДﾟ)ﾉ
*/
var name = require('./config').name;
if(name in window){return;}
module.exports = window[name] = require('./DataBind').init();
require('./Expression.artTemplate');
require('./DomExtend');
},{"./DataBind":23,"./DomExtend":24,"./Expression.artTemplate":25,"./config":28}],30:[function(require,module,exports){
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

},{"./config":28}],31:[function(require,module,exports){
module.exports = require('./dev/init');
},{"./dev/init":29}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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
},{"fs":14,"path":15}],34:[function(require,module,exports){
/*!
 * artTemplate[NodeJS]
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */

var node = require('./_node.js');
var template = require('../dist/template-debug.js');
module.exports = node(template);
},{"../dist/template-debug.js":32,"./_node.js":33}]},{},[1]);
