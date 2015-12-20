/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, Promise} from '../../core'
import css from './style.scss'
import ModalView from '../../base/modalView'
import Picker from '../../base/picker'

export default class Select extends ModalView{
    constructor(cfg, ...args){
        super($.merge({
            text : '选择'
        }, cfg), ...args);

        this.picker = new Picker([]);
        this.content.classList.add('m-picker-marker');
        this.content.classList.add('m-picker-background');
        this.content.appendChild(this.picker.node);
    };

    setCurrent(index){
        this.picker.setCurrent(index);
    }

    show(options, index, title){
        super.config({
            title : title || '',
            callback : () => {
                this.res(options[this.picker.getCurrent()]);
                this.hide();
            }
        });
        this.picker.set(options, Picker.find(options, index));
        super.show();
        return this.promise = new Promise((res) => {
            this.res = res;
        });
    };
    hide(){
        super.hide();
    };
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
