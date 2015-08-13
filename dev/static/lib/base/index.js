window.$config = window.$config || {};
window.$data = window.$data || {};

var api = {};

//错误控制
require('./errorControl')(true);

[
    //kit
    require('./kit'),
    //env
    require('./env'),
    //固定dom操作
    require('./dom'),
    //错误控制
    require('./errorControl'),
    //组件控制
    require('./componentHandler'),
    //retina优化
    require('./pixelFix');
    //overScroll
    require('./preventScroll'),
    //ga
    require('./track-ua'),
    //其他
    require('./optimization');
].forEach(function(mod){
    return mod(api, $config);
});

module.exports = api;











var api = {
    setLoading : function(bool){
        document.body.classList[bool ? 'add' : 'remove']('loading');
    },
    //插入样式
    insertStyle : function(css){
        var styleNode = document.createElement('style');
        styleNode.innerHTML = css;
        document.head.appendChild(styleNode);
    },
    //动画
    animate : function(node, type, callback){
        node.classList.add('animated');
        node.classList.add(type);
        var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';
        //var evt = 'webkitAnimationEnd';
        node.addEventListener(evt, listenerAnimate);

        function listenerAnimate(e){
            if(e.target === node){
                node.classList.remove('animated');
                node.classList.remove(type);
                node.removeEventListener(evt, listenerAnimate);
                callback && callback(this);
            }
        }
    },
    //后退控制
    componentHandler : require('./componentHandler'),

    env : (function(){
        var match = /\benv=([\w]+)\b/.exec(window.location.search);
        if(match){
            return match[1];
        }
        //TODO
        if(navigator.platform.indexOf('MacIntel') >= 0){
            return 'browser';
        }
        else{
            return 'APP';
        }
    })(),
    os : (function(){
        //TODO
        if(/\bAndroid\b/i.test(navigator.userAgent)){
            return 'Android';
        }
        if(/\biPhone\b/i.test(navigator.userAgent)){
            return 'IOS';
        }
        if(navigator.platform.indexOf('MacIntel') >= 0){
            return 'Mac';
        }
    })(),
    screen : null
}

module.exports = api;

//防止body超滚
require('./preventScroll')
    .config({
        outerBounce : true
    })
    .bind()
    .move(document.querySelectorAll('.fixed'));

//其他优化
require('./optimization')();
api.screen = require('./pixelFix')();

//下拉刷新, bug
// require('./dragRefresh')();

//ua html
require('./track-ua')();

