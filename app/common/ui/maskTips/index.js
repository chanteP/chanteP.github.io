/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    MaskTips.show({
        icon : 'loading',
        text : '什么鬼'
    }, true);
*/
import {$} from '../../core'
import css from './style.scss'
import Control from '../../base/control'
import render from './render.jsx';

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
        checkMaskTips().show(...args);
    }
    static hide(...args){
        checkMaskTips().hide(...args);
    }
}
var commonMaskTips;
var checkMaskTips = function(){
    if(commonMaskTips){
        return commonMaskTips;
    }
    return commonMaskTips = new MaskTips;
}
