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

        // this.scrollTimer = null;
        // $.listener(this.node).on('scroll', '[data-node="slider"]', (e) => {
        //     if(this.noTitle){return;}
        //     clearTimeout(this.scrollTimer);
        //     this.scrollTimer = setTimeout(() => this.calcSelected(), 1000 / 5);
        // }, true);
    };

    config({title = ''} = {}){
        this.title = title;
    }

    scrollEffect(index = 0){
        let slider = $.find('[data-node="slider"]', this.node);
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
        // slider.scrollTop = target.offsetTop + target.clientHeight / 2 - slider.clientHeight / 2;
    }

    calcSelected(){
        let cont = $.find('[data-node="slider"]', this.node),
            lis = $.findAll('[data-index]', cont);
        let midLine = cont.clientHeight / 2,
            checkLine = midLine + cont.scrollTop;

        [].some.call(lis, (li, index) => {
            let offset = li.offsetTop + li.scrollHeight - checkLine;
            if(offset >= 0){
                this.setCurrent(index);
                return true;
            }
        }) || this.setCurrent(this.options.length - 1);
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

// console.log({
//                 current : this.current,
//                 title : this.title,
//                 options : this.options
//             })
        // if(!this.ins){
            this.ins = render(this.node, this);
        // }
        // else{
        //     this.ins.setState({
        //         current : this.current,
        //         title : this.title,
        //         options : this.data
        //     })
        // }

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
