import $ from '../../core'
import css from './style.scss'
import Control from '../../animator/control'
import render from './render.jsx';

//添加样式
$.insertStyle(css);

var current;

export default class MaskTips extends Control{
    constructor(cfg){
        super();
        this.node.classList.add('m-masktips');
        super.type = 'middle';
        this.config(cfg);

        this.data = null;
        this.current = 0;
        this.callback = null;
        this.title = '';
    };

    config({icon = '', text = '', touchable = true} = {}){
        this.icon = icon;
        this.text = text;
        this.touchable = touchable;
    };

    show(cfg){
        if(cfg){
            this.config(cfg);
        }
        render(this.node, this);

        current && current.hide();
        current = this;

        return super.show();
    };
    hide(){
        current = null;
        return super.hide();
    };
    static show(...args){
        commonMaskTips.show(...args);
    }
    static hide(...args){
        commonMaskTips.hide(...args);
    }
}
var commonMaskTips = new MaskTips;
