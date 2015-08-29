import $ from '../../core';
import css from './style.scss';
import toggleBase from '../../animator/toggleBase';
//添加样式
$.insertStyle(css);

var masks = {}, maskStack = [], current = [];

export default class Mask extends toggleBase{
    constructor(zIndex = 50){
        super(['fadeIn', 'fadeOut']);
        this.zIndex = zIndex;
        this.outer = this.node = $.create(`<div class="m-mask" style="z-index:${zIndex};"></div>`);
        document.body.appendChild(this.node);
        masks[zIndex] = this;
    }
    show(){
        if(!super.show(true)){return;}
        current.push(this);
        this.stackIndex = maskStack.length - 1;
    }
    hide(){
        if(!super.hide(true)){return;}
        // if(this.stackIndex === maskStack.length - 1){
        current.splice(this.stackIndex, 1);
        // }
    }
    static show(zIndex = 50){
        if(!masks[zIndex]){
            new Mask(zIndex);
        }
        masks[zIndex].show();
    }
    static hide(zIndex){
        if(!zIndex){
            current.forEach((item) => item.hide());
            return;
        }
        if(!masks[zIndex]){
            return;
        }
        masks[zIndex].hide();
    }
}
