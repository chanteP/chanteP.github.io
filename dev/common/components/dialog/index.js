/*
    唯一
    btn状态： '' || disabled || active
*/
var core = require('../../core');
var css = require('./style.scss');

var mask = require('../mask');
var render = require('./render.jsx');
// var $ = require('jquery');

var defaultBtn = [{
    text : '确定',
    style : 'active',
    callback : function(){
        this.hide();
    }
}];
//添加样式
core.insertStyle(css);

var commonDialog;

var func = {
    buildWrap : function(obj){
        obj.node = document.createElement('div');
        obj.node.className = 'm-dialog mid';
        document.body.appendChild(obj.node);
        func.bind(obj);
    },
    bind : function(obj){
        $(obj.node).on('click', '[data-node="btnbox"] [data-diabtnid]', function(){
            var id = +this.getAttribute('data-diabtnid');
            obj.configData.button[id] && obj.configData.button[id].callback && obj.configData.button[id].callback.call(obj);
        });
    }
}

var Dialog = function(cfg){
    if(!(this instanceof Dialog)){
        commonDialog.config(cfg);
        return commonDialog;
    }
    func.buildWrap(this);
    this.configData = {};
    this.config(cfg);
}

Dialog.prototype = {
    constructor : Dialog,

    node : null,
    titleNode : null,
    contentNode : null,
    btnNode : null,

    setContent : function(content, noWrap){
        this.configData.content = content || '';
        if(content && content.nodeType){
            $('[data-node="content"]', this.node)[0].appendChild(content);
        }
        else{
            content = typeof content === 'string' ? content : '';
            $('[data-node="content"]', this.node)[0].innerHTML = noWrap ? content : '<div class="dia-contwrap">' + content + '</div>';
        }
    },
    setPosition : function(x, y){
        if(!arguments.length){
            var height = this.node.scrollHeight;
        }
        //TODO
    },

    config : function(cfg){
        if(!cfg){return;}
        this.configData = {
            title : 'title' in cfg ? cfg.title : this.configData.title || '',
            content : 'content' in cfg ? cfg.content : this.configData.content || '',
            button : 'button' in cfg ? cfg.button : this.configData.button || [],
            type : 'type' in cfg ? cfg.type : '',
            noWrap : 'noWrap' in cfg ? cfg.noWrap : this.configData.noWrap
        };
        render(this.node, this.configData);
        this.setContent(this.configData.content, this.configData.noWrap);
    },

    on : function(evt, func){
        $(this).on(evt, func);
    },
    off : function(evt, func){
        $(this).off(evt, func);
    },

    isShown : false,
    show : function(cfg, simple){
        //写默认太累...加一个simple参数...
        if(simple){
            cfg = typeof cfg === 'string' ? {
                    title : '',
                    content : cfg,
                    button : defaultBtn
                } : $.extend({
                    title : '',
                    content : '',
                    button : defaultBtn
                }, cfg);
        }
        this.config(cfg);

        mask.show(999);
        this.isShown = true;
        core.animate(this.node, 'zoomIn');
        core.componentHandler.push(this, cfg);
        this.node.setAttribute('data-onshow', '1');
        $(this).triggerHandler('show');
        return this;
    },
    hide : function(){
        mask.hide();
        this.isShown = false;
        core.animate(this.node, 'zoomOut');
        this.node.removeAttribute('data-onshow');
        core.componentHandler.remove(this);
        $(this).triggerHandler('hide');
        return this;
    },

    destroy : function(){
        this.node.parentNode && this.node.parentNode.removeChild(this.node);
    }
}

commonDialog = new Dialog();

module.exports = Dialog;