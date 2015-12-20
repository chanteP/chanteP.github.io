/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
import html from './template.html';
import css from './style.scss';
import Toggle from '../toggle';

export default class pushPage extends Toggle {
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
        this.outer.style.zIndex = pushPage.counterBase + pushPage.counter;
        pushPage.counter++;
        document.body.classList.add('pushpage-sub');
        this.componentsApi.push(this, config);
        $.trigger(this, 'show');
        return this;
    };
    hide(){
        if(!super.hide(true)){return;}
        pushPage.counter--;
        document.body.classList.remove('pushpage-sub');
        this.componentsApi.remove(this);
        $.trigger(this, 'hide');
        return this;
    };

    destroy(){
        this.componentsApi.remove(this);
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    };
}
pushPage.counterBase = 85;
pushPage.counter = 0;
