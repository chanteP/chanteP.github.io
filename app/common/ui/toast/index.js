/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core'
import css from './style.scss'
import Toggle from '../../base/toggle';

export default class Toast extends Toggle{
    constructor(text, touchable, delay){
        super(['fadeIn', 'fadeOut']);
        this.outer = $.create('<div class="m-toast"><span></span></div>');
        this.node = this.outer.firstChild;
        document.body.appendChild(this.outer);
        this.text = this.node.innerHTML = text;
        this.touchable = typeof touchable === 'boolean' ? touchable : true;
        this.delay = delay || 0;

        if(this.delay && typeof this.delay === 'number'){
            setTimeout(() => {this.hide()}, delay);
        }
        this.outer.addEventListener('click', (e) => {
            this.touchable && this.hide();
        });
    }
    show(){
        if(Toast.list.length){
            var offset = document.body.clientHeight - getLastToast().outer.getBoundingClientRect().top;
            this.outer.style.bottom = offset + 'px';
        }
        if(super.show(true)){
            Toast.list.push(this);
        }
        return this;
    }
    hide(){
        super.hide(true)
        Toast.list.some((toast, i) => {
            if(toast === this){
                Toast.list.splice(i, 1);
                return true;
            }
        });
        setTimeout(() => {
            this.destory();
        }, 500);
    }
    static show(text, ...args){
        if(getLastToast() && getLastToast().text === text){return getLastToast();}
        return new Toast(text, ...args).show();
    }
    static clear(){
        Toast.list.forEach((toast) => {toast.hide()});
    }
}
var getLastToast = () => {
    return Toast.list[Toast.list.length - 1];
}
Toast.list = [];