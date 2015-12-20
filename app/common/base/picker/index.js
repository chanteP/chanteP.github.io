/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
import css from './style.scss';
import render from './render.jsx'

export default class Picker{
    constructor(options, current = 0){
        this.node = $.create('<div class="m-picker"></div>');
        this.value = null;
        this.set(options, current);
    }
    set(options = [], current = 0){
        this.options = options;
        this.current = current;
        this.ins ? this.ins.setCurrent(current, true) : (this.ins = render(this.node, this));
    }
    setOptions(options){
        this.set(options, this.current);
    }
    setCurrent(current){
        this.set(this.options, current);
    }
    getCurrent(current){
        return this.current;
    }
    getValue(){
        return this.options[+this.current];
    }
    onChange(func){
        $.listener(this).on('change', func);
    }
    find(text){
        return Picker.find(this.options, text);
    }
    static find(options, text){
        if(typeof text === 'number'){
            return text;
        }
        if(!Array.isArray(options)){
            return 0;
        }
        let index = 0;
        let type = typeof options[0] === 'string';
        options.some((item, i) => {
        // console.log(type, options[i], text, '######')
            if(type ? item === text : item.text === text){
                index = i;
                return true;
            }
        });
        return index;
    }
}
