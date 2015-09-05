import $ from '../../core'
import css from './style.scss'
import Control from '../../animator/control'
import render from './render.jsx';

//添加样式
$.insertStyle(css);

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
        this.callback = null;
        this.title = '';

        this.ins = null;
    };

    config({title = ''} = {}){
        this.title = title;
    }

    scrollEffect(slider, index = 0){
        if(!slider){return;}
        let target = $.find('[data-index="'+index+'"]', slider) || $.find('[data-index="0"]', slider);
        if(!target){return;}
        this.tweenAni && this.tweenAni.stop();
        return this.tweenAni = $.tween({
            begin : slider.scrollTop,
            end : target.offsetTop + target.clientHeight / 2 - slider.clientHeight / 2,
            duration: 300,
            func : (num) => {
                slider.scrollTop = num;
            },
            endfunc : () => {
                this.tweenAni = null;
            }
        });
    }


    setCurrent(index){
        this.ins && this.ins.setCurrent(index);
    }

    show(index, options, cb, title){
        this.current = findCurrent(options, index || 0);
        this.options = options || this.options;
        this.callback = cb || this.callback;
        this.title = title === undefined ? this.title : title;
        this.noTitle = typeof this.title !== 'string';

        this.ins = render(this.node, this);
        this.setCurrent(this.current);

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
