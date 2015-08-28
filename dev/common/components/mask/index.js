/*
    1. mask只会展示一个
    2. 高index比低index优先
    3. 展示低index的时候把高index都隐藏
*/

var template = require('./template.html'),
    css = require('./style.scss');

var $ = require('../../core');

core.insertStyle(css);

var mask = {}, maskStack = [], current;
var touchMarker = 'data-touch';

var func = {
    show : function(zIndex){
        var node = mask[zIndex];
        if(node){
            core.animate(node, 'fadeIn');
            node.setAttribute('data-onshow', '1');
        }
        return this;
    },
    hide : function(zIndex){
        var node = mask[zIndex];
        if(node){
            core.animate(node, 'fadeOut');
            node.removeAttribute('data-onshow');
        }
        return this;
    }
};
// func.get();

var api = module.exports = {
    stack : maskStack,
    //zIndex, 提示文本, icon或配置, 配置
    show : function(){
        var args = func.parseArg(arguments);
        var maskNode = func.get(args.zIndex);

        $.find('[data-node="content"]', maskNode)[0].innerHTML = args.text;
        $.find('[data-node="content"]', maskNode)[0].style.display = args.text ? '' : 'none';
        maskNode[args.config.touch ? 'setAttribute' : 'removeAttribute'](touchMarker, '1');
        if(current && current === args.zIndex){
            return this;
        }
        // $('[data-node="content"]', maskNode)[0].innerHTML = args.text;

        if(!func.check(args.zIndex)){
            maskStack.push(args.zIndex);
            func.show(args.zIndex);
        }
        current = args.zIndex;
        return this;
    },
    hide : function(){
        maskStack.pop();
        func.hide(current);
        current = maskStack[maskStack.length - 1];
        func.show(current);
        return this;
    }
}