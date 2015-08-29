import $ from '../../core';
import html from './template.html';
import css from './style.scss';
import toggleBase from '../toggleBase';
//添加样式
$.insertStyle(css);

var typeList = ['middle', 'bottom', 'right', 'left', 'top'];

export default class Control extends toggleBase {
    constructor(type = typeList[0], content = ''){
        super(['fadeIn', 'fadeOut']);

        this.outer = $.create(html);
        this.node = $.find('[data-node="content"]', this.outer);
        window.document.body.appendChild(this.outer);

        this.outer.addEventListener('click', (e) => {
            e.target === this.outer && this.hide();
        });
        this.type = type;
        this.setContent(content);
    }


    setContent(content){
        if(typeof content === 'string'){
            this.node.innerHTML = content;
        }
        if($.isNode(content)){
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
        $.componentHandler.push(this, config);
        $.trigger(this, 'show');
    }
    hide(){
        if(!super.hide(true)){return;}
        $.componentHandler.remove(this);
        $.trigger(this, 'hide');
    }

    destroy(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    }
}

