var base = require('../../../lib/base');

var html = require('./template.html'),
    css = require('./style.scss');

base.insertStyle(css);

var func = {
    buildWrap : function(obj){
        obj.outer = $(html)[0];
        // obj.node = $('.m-controls-content', obj.outer)[0];
        obj.node = obj.outer;
        window.document.body.appendChild(obj.outer);
    },
    bind : function(obj){
        $(obj.outer).on('tap', function(e){
            if(e.target === obj.outer){
                obj.hide();
            }
        });
    }
}

var Controls = function(content){
    if(!(this instanceof Controls)){
        return new Controls(content);
    }
    func.buildWrap(this);
    func.bind(this);
    this.setContent(content);
}

Controls.prototype = {
    constructor : Controls,

    outer : null,
    node : null,

    setContent : function(content){
        if(typeof content === 'string'){
            this.node.innerHTML = content;
        }
        if(content && content.nodeType){
            this.node.appendChild(content);
        }
        return this;
    },

    on : function(evt, func){
        return $(this).on(evt, func);
    },
    off : function(evt, func){
        return $(this).off(evt, func);
    },

    isShown : false,
    show : function(config){
        //TODO hehe
        // if(document.body.lastChild !== this.outer){
        //     window.document.body.appendChild(this.outer);
        // }
        this.isShown = true;
        this.outer.setAttribute('data-onshow', '1');
        base.animate(this.outer, 'fadeIn');
        base.componentHandler.push(this, config);
        $(this).triggerHandler('show');
        return this;
    },
    hide : function(){
        this.isShown = false;
        base.animate(this.outer, 'fadeOut');
        this.outer.removeAttribute('data-onshow');
        base.componentHandler.remove(this);
        $(this).triggerHandler('hide');
        //TODO 太挫...还是把继承写好吧
        // if(this.instance && arguments.callee.caller !== this.instance.hide){
        //     this.instance.hide();
        // }
        return this;
    },

    extend : function(constructor){
    },

    destroy : function(){
        this.outer.parentNode && this.outer.parentNode.removeChild(this.outer);
    }
}


module.exports = Controls;