/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, Promise} from '../../core'
import css from './style.scss'
import Control from '../../base/control'
import render from './render.jsx';

var findCurrent = (options, text) => {
    if(typeof text === 'number'){
        return text;
    }
    let index = 0;
    let type = typeof options[0] === 'string';
    options.some((item, i) => {
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

        this.options = null;
        this.current = 0;

        this.ins = null;

        this.promise = null;
    };

    config({} = {}){
    }

    setCurrent(index){
        this.ins && this.ins.setCurrent(index);
    }
    select(index){
        this.res(this.options[index]);
        this.hide();
    }

    show(options, index, cfg){
        this.current = findCurrent(options, index || 0);
        this.options = options || this.options;
        this.cfg = cfg || {};

        this.ins = render(this.node, this);
        this.setCurrent(this.current);

        super.show();
        return this.promise = new Promise((res) => {
            this.res = res;
        });
    };
    hide(){
        this.promise = this.res = null;
        super.hide();
    };
    static findCurrent(...args){
        return findCurrent(...args);
    }
    static show(...args){
        return checkSelect().show(...args);
    }
    static hide(...args){
        return checkSelect().hide(...args);
    }
}
var commonSelect;
var checkSelect = () => {
    if(commonSelect){
        return commonSelect;
    }
    return commonSelect = new Select;
}
