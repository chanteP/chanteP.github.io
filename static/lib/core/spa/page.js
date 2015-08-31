import $ from 'np-kit'
import Controller from './controller'
import effect from './effect'

var parseUrl = (url) => {
    url = url.split('#')[0].split('?')[0];
    var match = /^(?:[\w]+\:\/\/[^\/]+)?(\/?([^\/]+)[\s\S]*)$/.exec(url);
    return {
        controller : match ? match[2] : 'index',
        uri : match ? match[1] : '/index'
    };
}
//#################################################################################
var pages = {};

class Page{
    constructor(url){
        var {controller, uri} = parseUrl(url);
        if(!(this instanceof Page) && !pages[uri]){
            return null;
        }
        if(pages[uri]){
            return pages[uri];
        }

        pages[uri] = this;

        this.controller = new Controller(controller);
        this.controllerKey = controller;
        this.name = this.uri = uri;

        this.controller.add(this);


        this.node = effect.build();
        this.node.dataset.page = this.controllerKey;
        this.node.dataset.uri = this.uri;

        this._state = this.HIDE;
        this.loader = this.WAIT;
        this.needInit = false;
    }

    static show(url, force){
        var {controller, uri} = parseUrl(url);
        var pageHide, pageShow;
        pageHide = Page.current && new Page(Page.current);
        pageShow = new Page(url);

        if(Page.current === uri && !force){
            return;
        }
        $.trigger(Page, 'beforechange', [uri, controller]);
        if(Page.current !== uri && pageHide){
            pageHide.state = pageHide.HIDE;
        }

        Page.current = uri;
        Page.currentController = controller;

        pageShow.state = pageShow.SHOW;

        $.trigger(Page, 'change', [uri, controller]);
    };

    get loader(){
        if(this._loader === this.DOMREADY && this.controller.state){
            this._loader = this.LOADED;
        }
        return this._loader;
    }
    set loader(value){
        if(value <= this._loader){
            return value;
        }
        var self = this;
        switch(value){
            case this.WAIT :
                this.loader = this.LOADING;
                break;
            case this.LOADING :
                var i = document.createElement('iframe');
                i.style.cssText = 'display:block;visibility:hidden;overflow:hidden;width:0;height:0;';
                i.onload = i.onerror = function(e){
                    document.body.removeChild(i);
                    self.loader = e.type === 'load' ? self.DOMREADY : self.FAILED;
                }
                i.src = '/pages' + self.uri;
                document.body.appendChild(i);
                break;
            case this.DOMREADY : 
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
    }

    get state(){
        return this._state;
    }
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
    }


    run(lifecycle, ...args){
        var func = this.controller.get(lifecycle);
        $.log('page ' + lifecycle + ':' + this.name, 'info');
        if(typeof func === 'function'){
            func.call(this, ...args);
        }
    }
    show(force){
        Page.show(this.uri, force);
    }
    load(){
        this.state = this.WAIT;
    }
    setContent(html){
        this.node.innerHTML = html;
        this.loader = this.DOMREADY;
    }
}

Page.list = pages;
Page.parseUrl = parseUrl;
Page.current = null;
Page.currentController = null;

Page.prototype.WAIT = 0
Page.prototype.LOADING = 1
Page.prototype.DOMREADY = 2
Page.prototype.LOADED = 4
Page.prototype.FAILED = 5
Page.prototype.INITED = 9

Page.prototype.SHOW = 8
Page.prototype.HIDE = 9

export default Page