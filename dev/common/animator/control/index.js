import $ from '../../core';
import html from './template.html';
import css from './style.scss';
//添加样式
$.insertStyle(css);

var checkTarget = function(){
    
}

class Control {
    constructor(type, content){
        obj.outer = $.create(html);
        obj.node = $.find('[data-node="content"]', obj.outer);
        window.document.body.appendChild(obj.outer);

        obj.outer.addEventListener('click', function(e){
            e.target === obj.outer && obj.hide();
        });
        this.type = type;
        this.setContent(content);
    }

    public static typeList = ['middle', 'bottom', 'right', 'left', 'top'];

    public outer = null;
    public node = null;

    public setContent(content){
        if(typeof content === 'string'){
            this.node.innerHTML = content;
        }
        if($.isNode(content)){
            this.node.appendChild(content);
        }
        return this;
    }


    var _type = 'middle';
    get type(){
        return this._type;
    };
    set type(value){
        if(this.typeList.indexOf(value) < 0){
            return this._type;
        }
        this.node.classList.add('type-'+value);
        return this._type = value;
    };


    var _isShown = false,
    get isShown(){
        return this._isShown;
    },
    set isShown(value){
        if(this._isShown === !!value){
            return this._isShown;
        }
        this.outer[value ? 'setAttribute' : 'removeAttribute']('data-show', '1');
        $.animate(this.outer, value ? 'fadeIn' : 'fadeOut');
        return this._isShown = !!value;
    },

    public show(config){
        this.isShown = true;
        $.componentHandler.push(this, config);
        $(this).triggerHandler('show');
        return this;
    }
    public hide(){
        this.isShown = false;
        $.componentHandler.remove(this);
        $(this).triggerHandler('hide');
        return this;
    }

    public destroy(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    }
}


module.exports = Control;