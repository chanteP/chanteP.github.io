/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    show : 
*/
import {$, Promise} from '../../core'
import Control from '../../base/control'
import css from './style.scss'
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

export default class ActionSheet extends Control{
    constructor(){
        super('bottom', true);

        this.options = null;
    };

    select(index){
        this.res(this.options[index]);
    }
    show(options, message){
        if(this._isShown){
            this.hide();
        }

        this.message = message;
        this.options = Array.isArray(options) ? options : [];

        this.ins = render(this.node, this);

        setTimeout(() => {
            super.show();
        });
        return this.promise = new Promise((res) => {
            this.res = res;
        });
    };
    hide(){
        super.hide();
    };
    static show(...args){
        return checkActionSheet().show(...args);
    }
    static hide(...args){
        return checkActionSheet().hide(...args);
    }
}
var commonActionSheet;
var checkActionSheet = () => {
    if(commonActionSheet){
        return commonActionSheet;
    }
    return commonActionSheet = new ActionSheet;
}
