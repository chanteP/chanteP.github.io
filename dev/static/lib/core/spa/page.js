var $ = require('np-kit');

var contentTemplate = [
    '<div class="page-wrap" data-page>...</div>'
].join('');

var parseUrl = function(url){
    url = url.split('#')[0].split('?')[0];
    var match = /^(?:[\w]+\:\/\/[^\/]+)?(\/?([^\/]+)[\s\S]*)$/.exec(url);
    return {
        controller : match ? match[2] : 'page',
        uri : match ? match[1] : '/page/index'
    };
}
//#################################################################################
var controllers = {}
var Controller = function(name){
    if(controllers[name]){
        return controllers[name];
    }

    controllers[name] = this;

    this.name = name;
    this.list = [];
    this.lifecycle = {};
}
Controller.list = controllers;
Controller.prototype = {
    add : function(page){
        this.list.push(page);
    },
    set : function(conf){
        $.merge(this.lifecycle, conf, true);
    },
    get : function(name){
        return this.lifecycle[name];
    }
};
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

    if(!controllers[controller]){
        new Controller(controller);
    }
    controllers[controller].add(this);

    this.controller = controllers[controller];
    this.controllerKey = controller;
    this.name = this.uri = uri;

    this.node = $.create(contentTemplate);
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
};
Page.prototype = {
    get loader(){
        return this._loader;
    },
    set loader(value){
        if(this._loader === this.LOADING || this._loader === this.LOADED){
            return value;
        }
        var self = this;
        switch(value){
            case this.WAIT :
                this.loader = this.LOADING;
                setTimeout(function(){
                    if(self._loader === self.LOADING || self._loader === self.LOADED){return;}
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
                $.find('#wrapper').innerHTML = '';
                $.find('#wrapper').appendChild(this.node);
                break;
            case this.HIDE :
                $.remove(this.node);
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

module.exports = {Controller, Page};