import $ from '../../core'
import css from './style.scss'
import Control from '../../animator/control'
import render from './render.jsx';

//添加样式
$.insertStyle(css);

var findCurrent = (list, text) => {
    if(typeof text === 'number'){
        return text;
    }
    let index = 0;
    let type = typeof list[0] === 'string';
    list.some((item, i) => {
        if(type ? item === text : item.text === text){
            index = i;
            return true;
        }
    });
    return index;
}

export default class Select extends Control{
    constructor(cfg){
        super();
        super.type = 'bottom';
        this.config(cfg);

        this.data = null;
        this.current = 0;
        this.callback = null;
        this.title = '';
    };

    config({title = ''} = {}){
        this.title = title;
    };

    show(index, list, cb, title){
        this.current = findCurrent(list, index || 0);
        this.data = list || this.data;
        this.callback = cb || this.callback;
        this.title = title || this.title;

        render(this.node, this);

        return super.show();
    };
    hide(){
        return super.hide();
    };
    static show(...args){
        commonSelect.show(...args);
    }
    static hide(...args){
        commonSelect.hide(...args);
    }
}
var commonSelect = new Select;
