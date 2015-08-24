var $ = require('np-kit');
var Controller = require('./controller');
var effect = require('./effect');

var parseUrl = function(url){
    url = url.split('#')[0].split('?')[0];
    var match = /^(?:[\w]+\:\/\/[^\/]+)?(\/?([^\/]+)[\s\S]*)$/.exec(url);
    return {
        controller : match ? match[2] : 'index',
        uri : match ? match[1] : '/index'
    };
}
//#################################################################################
var pages = {};
var Page = function(url){
    var {controller, uri} = parseUrl(url);
    if(!(this instanceof Page) && !pages[uri]){
        return null;
    }
    if(pages[uri]){
        return pages[uri];
    }

    pages[uri] = this;

    this.controller = Controller(controller);
    this.controllerKey = controller;
    this.name = this.uri = uri;

    this.controller.add(this);


    this.node = effect.build();
    this.node.dataset.page = this.controllerKey;
    this.node.dataset.uri = this.uri;

    this._state = this.HIDE;
    this.loader = this.WAIT;
};
Page.list = pages;
Page.parseUrl = parseUrl;
Page.current = null;
Page.show = function(url){
    var {controller, uri} = parseUrl(url);
    if(Page.current === uri){
        return;
    }
    if(Page.current){
        Page(Page.current).state = Page.prototype.HIDE;
    }

    Page.current = uri;

    (new Page(url)).state = Page.prototype.SHOW;

    $.trigger(Page, 'change');
};
Page.prototype = {
    get loader(){
        return this._loader;
    },
    set loader(value){
        if(value <= this.loader){
            return value;
        }
        var self = this;
        switch(value){
            case this.WAIT :
                this.loader = this.LOADING;
                setTimeout(function(){
                    if(self.loader === self.LOADING){return;}
                    var i = document.createElement('iframe');
                    i.style.cssText = 'display:block;visibility:hidden;overflow:hidden;width:0;height:0;';
                    i.onload = i.onerror = function(e){
                        document.body.removeChild(i);
                        self.loader = e.type === 'load' ? self.LOADED : self.FAILED;
                    }
                    i.src = '/page' + self.uri;
                    document.body.appendChild(i);
                }, 0);
                break;
            case this.LOADING :
                break;
            case this.LOADED :
                break;
            case this.FAILED :
                break;
            case this.INITED :
                break;
            default :
                return value;
        }
        this._loader = value;
        return value;
    },

    get state(){
        return this._state;
    },
    set state(value){
        switch(value){
            case this.SHOW :
                effect.show(this);
                break;
            case this.HIDE :
                effect.hide(this);
                break;
            default : 
                return value;
        }
        this._state = value;
        return value;
    },

    WAIT : 0,
    LOADING : 1,
    LOADED : 2,
    FAILED : 3,
    INITED : 4,

    SHOW : 5,
    HIDE : 6,

    run : function(lifecycle){
        var func = this.controller.get(lifecycle);
        if(typeof func === 'function'){
            func.apply(this, arguments);
        }
    },
    show : function(){
        Page.show(this.uri);
    },
    load : function(){
        this.state = this.WAIT;
    },
    setContent : function(html){
        this.node.innerHTML = html;
        this.loader = this.LOADED;
    }
}

module.exports = Page;