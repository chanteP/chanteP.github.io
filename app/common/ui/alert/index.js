/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    唯一
    btn状态： '' || disabled || active
*/
import {$} from '../../core';
import css from './style.scss';
import Control from '../../base/control';
import render from './render.jsx';

var defaultBtn = [{
    text : '确定',
    style : 'active',
    callback : function(){
        this.hide();
    }
}];

export default class Alert extends Control{
    /*
        cfg : {
            title : ''
            type : ''
            content : ''
            button : {}
        }
    */
    constructor(cfg, simple){
        super('middle', false);

        this.node.classList.add('m-alert');
        this.config(cfg, simple);
    }

    config(cfg = {}, simple){
        this.title = cfg.title || '';
        this.content = cfg.content || '';
        this.type = cfg.type || '';
        this.button = simple ? defaultBtn : cfg.button;
        this.ins = render(this.node, this);
    }

    setContent(content){
        this.ins.setContent(content);
    }
    show(cfg, simple){
        //写默认太累...加一个simple参数...
        if(cfg){
            this.config(cfg, simple);
        }
        super.show();
        this.animate(this.node, 'zoomIn');
        return this;
    }
    hide(){
        super.hide();
        this.animate(this.node, 'zoomOut');
        $.trigger(this, 'hide');
        return this;
    }

    destroy(){
        this.node.parentNode && this.node.parentNode.removeChild(this.node);
    }

    static show(...args){
        return checkAlert().show(...args);
    }
    static hide(...args){
        return checkAlert().hide(...args);
    }
    static setContent(...args){
        return checkAlert().setContent(...args);
    }
}

var commonAlert;
var checkAlert = () => {
    if(commonAlert){
        return commonAlert;
    }
    return commonAlert = new Alert;
}
