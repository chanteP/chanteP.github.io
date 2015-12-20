/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
import html from './template.html';
import css from './style.scss';
import Toggle from '../toggle';

var typeList = ['middle', 'bottom', 'right', 'left', 'top'];

export default class Control extends Toggle {
    constructor(type = typeList[0], touchable = true){
        super(['fadeIn', 'fadeOut']);

        this.outer = $.create(html);
        this.node = $.find('[data-node="content"]', this.outer);
        window.document.body.appendChild(this.outer);

        this.outer.addEventListener('click', (e) => {
            this.touchable && e.target === this.outer && this.hide();
        });

        this.touchable = touchable;
        this.type = type;
    }

    setContent(content){
        if(typeof content === 'string'){
            this.node.innerHTML = content;
        }
        if($.isNode(content)){
            this.node.innerHTML = '';
            this.node.appendChild(content);
        }
        return this;
    }

    get type(){
        return this._type;
    }
    set type(value){
        if(typeList.indexOf(value) < 0){
            value = this._type || typeList[0];
        }
        this.outer.dataset.type = value;
        return this._type = value;
    }

    show(config){
        if(!super.show(true)){return;}
        clearTimeout(this.timer);
        this.outer.style.display = '';
        if(this.type === 'bottom'){
            this.animate(this.node, 'slideInUp');
        }
        $.trigger(this, 'show');
    }
    hide(){
        if(!super.hide(true)){return;}
        if(this.type === 'bottom'){
            this.animate(this.node, 'slideOutDown');
        }
        $.trigger(this, 'hide');

        //噩梦
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.outer.style.display = 'none';
            this.timer = setTimeout(() => {
                this.outer.style.display = '';
            }, 0);
        }, 500);
    }

    destroy(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    }
}

