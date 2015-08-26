var core = require('../../core');
var html = require('./template.html'),
    css = require('./style.scss');

// var $ = require('jquery');
// var mask = require('../../components/mask');

//添加样式
core.insertStyle(css);

var func = {
    buildWrap : function(obj){
        obj.node = $(html)[0];
        obj.contentNode = $('[data-node="scrollCont"]', obj.node)[0];
        document.body.appendChild(obj.node);
    },
    bind : function(obj){
        // $(obj.contentNode).on('swipeRight', function(){
            // obj.hide();
        // });
    }
}

var Drawer = function(content){
    if(!(this instanceof Drawer)){
        return new Drawer(content);
    }
    func.buildWrap(this);
    func.bind(this);
    this.setContent(content);
}

Drawer.prototype = {
    constructor : Drawer,

    node : null,
    contentNode : null,

    setContent : function(content){
        if(typeof content === 'string'){
            this.contentNode.innerHTML = content;
        }
        if(content && content.nodeType){
            this.contentNode.appendChild(content);
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
        if(this.isShown){return;}
        // mask.show(90);
        this.isShown = true;
        this.node.setAttribute('data-onshow', '1');
        $('#wrapper').addClass('drawer-sub');
        core.animate(this.node, 'slideInRight');
        core.componentHandler.push(this, config);
        $(this).triggerHandler('show');
        return this;
    },
    hide : function(){
        // mask.hide();
        this.isShown = false;
        core.animate(this.node, 'slideOutRight');
        this.node.removeAttribute('data-onshow');
        $('#wrapper').removeClass('drawer-sub');
        core.componentHandler.remove(this);
        $(this).triggerHandler('hide');
        return this;
    },

    extend : function(constructor){
    },

    destroy : function(){
        this.node.parentNode && this.node.parentNode.removeChild(this.node);
    }
}


module.exports = Drawer;
