import $ from '../../core';
import html from './template.html';
import css from './style.scss';
import toggleBase from '../toggleBase';
//添加样式
$.insertStyle(css);

export default class Drawer extends toggleBase {
    constructor(content = ''){
        super(['slideInRight', 'slideOutRight']);
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

    show(config){
        if(!super.show(true)){return;}
        document.body.classList.add('drawer-sub');
        $.componentHandler.push(this, config);
        $.trigger(this, 'show');
        return this;
    };
    hide(){
        if(!super.hide(true)){return;}
        document.body.classList.remove('drawer-sub');
        $.componentHandler.remove(this);
        $.trigger(this, 'hide');
        return this;
    };

    destroy(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    };
}
