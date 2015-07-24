/*
    1. mask只会展示一个
    2. 高index比低index优先
    3. 展示低index的时候把高index都隐藏
*/

var base = require('../../../lib/base');
var template = require('./template.html'),
    css = require('./style.scss');

// var $ = require('jquery');

base.insertStyle(css);

var mask = {}, maskStack = [], current;
var touchMarker = 'data-touch';

var func = {
    parseArg : function(args){
        var param = {
            zIndex : 50,
            text : '',
            icon : '',
            config : {}
        };
        for(var i = 0, j = args.length; i < j; i++){
            if(typeof args[i] === 'number'){
                param.zIndex = args[i];
            }
            else if(typeof args[i] === 'string' && !param.text){
                param.text = args[i];
            }
            else if(typeof args[i] === 'string'){
                param.icon = args[i];
            }
            else if(typeof args[i] === 'object'){
                param.config = args[i];
            }
        }
        return param;
    },
    get : function(zIndex){
        if(mask[zIndex]){
            return mask[zIndex];
        }
        var maskNode = $(template)[0];
        maskNode.style.zIndex = zIndex;
        mask[zIndex] = maskNode;
        $(maskNode).on('tap', function(){
            if(this.getAttribute(touchMarker)){
                api.hide();
            }
        });
        document.body.appendChild(maskNode);
        return maskNode;
    },
    show : function(zIndex){
        var node = mask[zIndex];
        if(node){
            base.animate(node, 'fadeIn');
            node.setAttribute('data-onshow', '1');
        }
        return this;
    },
    hide : function(zIndex){
        var node = mask[zIndex];
        if(node){
            base.animate(node, 'fadeOut');
            node.removeAttribute('data-onshow');
        }
        return this;
    },
    check : function(zIndex){
        var check = false;
        /*方案一，排序后删除*/
        // maskStack.sort(function(a,b){return a>b?1:-1});
        // for(var i = maskStack.length - 1; i >= 0; i--){
        //     if(maskStack[i] > zIndex){
        //         func.hide(maskStack.pop());
        //     }
        //     else if(maskStack[i] === zIndex){
        //         func.show(maskStack[i]);
        //         check = true;
        //     }
        //     else{
        //         func.hide(maskStack[i]);
        //     }
        // }
        /*方案二，直接删除*/
        for(var i = maskStack.length - 1; i >= 0; i--){
            if(maskStack[i] === zIndex){
                func.show(maskStack[i]);
                check = true;
            }
            else{
                func.hide(maskStack[i]);
            }
        }
        return check;
    }
}
// func.get();

var api = module.exports = {
    stack : maskStack,
    //zIndex, 提示文本, icon或配置, 配置
    show : function(){
        var args = func.parseArg(arguments);
        var maskNode = func.get(args.zIndex);

        $('[data-node="content"]', maskNode)[0].innerHTML = args.text;
        $('[data-node="content"]', maskNode)[0].style.display = args.text ? '' : 'none';
        $(maskNode)[0][args.config.touch ? 'setAttribute' : 'removeAttribute'](touchMarker, '1');
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