var $ = require('np-kit');

var contentTemplate = [
    '<div class="page-wrap" data-page></div>'
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
    this.name = name;
    this.list = [];
    this.lifecycle = {};
}
Controller.prototype = {
    add : function(page){
        this.list.push(page);
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

    this.contentNode = $.create(contentTemplate);
    this.contentNode.dataset.page = this.controllerKey;
    this.contentNode.dataset.uri = this.uri;

    this._state = this.HIDE;
    this._loader = this.WAIT;
};
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
        if(this._loader === this.LOADING){
            return value;
        }
        switch(value){
            case this.WAIT :
                this.loader = this.LOADING;
                (function(self){
                    var i = document.createElement('iframe');
                    i.style.cssText = 'display:block;visibility:hidden;overflow:hidden;width:0;height:0;';
                    i.onload = i.onerror = function(e){
                        document.body.removeChild(i);
                        self.loader = e.type === 'load' ? self.LOADED : self.FAILED;
                    }
                    i.src = this.uri;
                    document.body.appendChild(i);
                })(this);
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
                break;
            case this.HIDE :
                break;
            default : 
                return value;
        }
        this._state = value;
        return value;
    }

    WAIT : 0,
    LOADING : 1,
    LOADED : 2,
    FAILED : 3,

    SHOW : 5,
    HIDE : 6,

    run : function(lifecycle){
        if(this.controller.lifecycle[lifecycle]){
            this.controller.lifecycle[lifecycle].apply(this, arguments);
        }
    },
    load : function(){
        this.state = this.WAIT;
    },
    register : function(conf){
        $.merge(this.lifecycle, conf, true);
    },
    setContent : function(html){
        this.contentNode.innerHTML = html;
    }
}

module.exports = Page;