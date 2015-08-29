/*
    唯一
    btn状态： '' || disabled || active
*/
import $ from '../../core';
import css from './style.scss';
import toggleBase from '../../animator/toggleBase';
import mask from '../mask';
import render from './render.jsx';
//添加样式
$.insertStyle(css);

var defaultBtn = [{
    text : '确定',
    style : 'active',
    callback : function(){
        this.hide();
    }
}];

export default class Dialog extends toggleBase{
    constructor(cfg, simple){
        super(['zoomIn', 'zoomOut']);

        this.outer = this.node = document.createElement('div');
        this.node.className = 'm-dialog mid';
        document.body.appendChild(this.node);

        this.config(cfg, simple);
    }

    config(cfg = {}, simple){
        this.title = cfg.title || '';
        this.content = cfg.content || '';
        this.button = simple ? defaultBtn : cfg.button;
        render(this.node, this);
    }

    show(cfg, simple){
        //写默认太累...加一个simple参数...
        if(cfg){
            this.config(cfg, simple);
        }
        mask.show(999);
        super.show();
        $.componentHandler.push(this, cfg);
        $.trigger(this, 'show');
    }
    hide(){
        mask.hide(999);
        super.hide();
        $.componentHandler.remove(this);
        $.trigger(this, 'hide');
    }

    destroy(){
        this.node.parentNode && this.node.parentNode.removeChild(this.node);
    }

    static show(...args){
        return commonDialog.show(...args);
    }
    static hide(...args){
        return commonDialog.hide(...args);
    }
}

var commonDialog = new Dialog();
