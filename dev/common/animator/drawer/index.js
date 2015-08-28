import $ from '../../core';
import html from './template.html';
import css from './style.scss';
//添加样式
$.insertStyle(css);

export default class Drawer {
    constructor(content){

        this.outer = $.create(html);
        this.node = $.find('[data-node="scrollCont"]', this.outer);
        document.body.appendChild(this.outer);

        this.setContent(content);
    }
    // outer = null;
    // node = null;

    setContent(content){
        if(typeof content === 'string'){
            this.node.innerHTML = content;
        }
        if($.isNode(content)){
            this.node.appendChild(content);
        }
        return this;
    };

    get isShown(){
        return this._isShown;
    };
    set isShown(value){
        if(!!this._isShown === !!value){
            return this._isShown;
        }
        this.outer[value ? 'setAttribute' : 'removeAttribute']('data-show', '1');
        $.animate(this.outer, value ? 'slideInRight' : 'slideOutRight');
        document.body.classList[value ? 'add' : 'remove']('drawer-sub');
        return this._isShown = !!value;
    };

    show(config){
        if(this.isShown){return;}
        // mask.show(90);
        this.isShown = true;
        core.componentHandler.push(this, config);
        $.trigger(this, 'show');
        return this;
    };
    hide(){
        // mask.hide();
        this.isShown = false;
        core.componentHandler.remove(this);
        $.trigger(this, 'hide');
        return this;
    };

    destroy(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    };
}
