/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core'
import Control from '../control'
import css from './style.scss'
import renderHead from './head.jsx'

var defaultConfig = {
    title : '',
    text : '确定',
    callback : function(){this.hide();},
    textL : '取消',
    callbackL : function(){this.hide();}
}

export default class ModalView extends Control{
    constructor(cfg, touchable = true){
        super('bottom', touchable);
        this.node.classList.add('m-modalview');
        this.head = $.create('<div class="m-modalview-head"></div>');
        this.content = $.create('<div class="m-modalview-cont"></div>');
        this.node.appendChild(this.head);
        this.node.appendChild(this.content);

        this.cfg = {};
        this.config($.merge(defaultConfig, cfg));
    }

    config(cfg){
        $.merge(this.cfg, cfg, true);
        this.title = this.cfg.title;
        renderHead(this.head, this);
    }
}





