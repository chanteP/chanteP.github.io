var pageGrep = /^(?:.*\:\/\/[^\/]+)?\/([^\/#\?\.]*)/;
var $ = require('../kit');
var wrapperID = '#wrapper';
var cur, loadTimer;

var url2Page = function(url){
    var rs = pageGrep.exec(url);
    return rs && rs[1] ? rs[1] : 'index';
}

var pageStorage = {};
var PageModule = function(page, dom){
    if(pageStorage[page]){
        return pageStorage[page];
    }
    pageStorage[page] = this;
    this.page = page;
    this.node = dom;

}

PageModule.prototype = {
    LOADING : 0,
    LOADINGSCRIPT : 1,
    READY : 2,
    INITED : 3,

    status : 0,

    page : null,
    dom : null,

    load : function(){
        this.status = this.LOADING;
    },
    loadScript : function(){
        this.status = this.LOADINGSCRIPT;
        var s = document.createElement('script');
        s.src = $.isOnline ? 
            '/static/js/' + this.page + '.js' : 
            '/page/' + this.page + '/init.js';
        s.onload = function(){
            $.remove(s);
        }
    },
    build : function(url){
        var self = this;
        this.status = this.LOADING;
        $.iLoad(url, null, function(){
            window.history.go(-1);
        });
    },
    setLoading : function(bool){
        // $.find(wrapperID).innerHTML = '';
        document.body.classList[bool ? 'add' : 'remove']('loading');
    },
    switchOn : function(){
        this.navRel();
        $.find(wrapperID).innerHTML = '';
        $.find(wrapperID).appendChild(this.dom);
        return true;
    },
    switchOff : function(){
        return true;
    },
    navRel : function(){
        $.find('#mainnav').set(this.page);
    }
}

var api = {
    load : function(url){
        var page = url2Page(url), mod = PageModule(page);
        if(!mod){
            mod = new PageModule(page);
        }
        if(page === url2Page(location.href) && mod === cur){return;}
        mod.setLoading(true);
        if(mod.status > mod.LOADING){
            clearTimeout(loadTimer);
            loadTimer = setTimeout(function(){
                cur && cur.switchOff() && cur.callback && cur.callback.hide && cur.callback.hide();
                if(mod.switchOn() && mod.callback){
                    if(mod.status < mod.INITED && mod.callback.init){
                        mod.callback.init();
                        mod.status = mod.INITED;
                    }
                    mod.callback.show && mod.callback.show();
                }
                mod.setLoading(false);
                cur = mod;
            }, 400);
        }
    },
    setDOM : function(page, dom){
        new PageModule(page, dom);
    },
    init : function(dom, obj){
        var page = dom.dataset.page;
        var mod = PageModule(page);
        if(!mod){
            mod = new PageModule(page, dom, obj);
        }
        else{
            mod.set(dom, obj);
        }
        // mod.status = mod.INITED;
    },
    set : function(page, callback){
        var mod = PageModule(page);
        mod.callback = callback(mod.dom, $);
    },
    init : function(page, dom){
        var mod = new PageModule(page, dom);
        mod.loadScript();
    }
}
module.exports = api;
