var pageGrep = /^(?:.*\:\/\/[^\/]+)?\/([^\/#\?\.]*)/;
var $ = require('../kit');
var wrapperID = '#wrapper';
var cur, loadTimer;

var url2Page = function(url){
    var rs = pageGrep.exec(url);
    return rs && rs[1] ? rs[1] : 'index';
}
var navRel = function(page){
    $.find('#mainnav').set(page);
}

var pageStorage = {};
var PageModule = function(page, dom){
    if(pageStorage[page]){
        if(dom && !pageStorage[page].node){
            pageStorage[page].node = dom;
        }
        return pageStorage[page];
    }
    pageStorage[page] = this;
    this.page = page;
    this.node = dom;
    if(!dom){
        this.build();
    }
}

PageModule.prototype = {
    LOADING : 0,
    READY : 2,
    INIT : 3,
    SHOWONCE : 4,
    SHOW : 5,
    HIDE : 6,

    status : 0,

    page : null,
    dom : null,

    build : function(){
        var self = this;
        this.status = this.LOADING;
        $.iLoad('/pages/' + this.page + ($.isOnline ? '' : '.html'), null, function(){
            window.history.go(-1);
        });
    },
    setLoading : function(bool){
        document.body.classList[bool ? 'add' : 'remove']('loading');
    },
    switchOn : function(){
        navRel(this.page);
        this.status < this.INIT && this.fetchCallback('init');
        $.find(wrapperID).innerHTML = '';
        $.find(wrapperID).appendChild(this.node);
        this.status < this.SHOWONCE && this.fetchCallback('showonce');
        this.fetchCallback('show');
        return true;
    },
    switchOff : function(){
        this.fetchCallback('hide');
        return true;
    },
    fetchCallback : function(type){
        try{
            this.callback && this.callback[type] && this.callback[type]();
        }
        catch(e){
            console.log(e)
        }
        this.status = this[type.toUpperCase()] || 10;
    }
}

var api = {
    load : function(url, dir){
        var page = url2Page(url), mod = new PageModule(page);
        if(page === url2Page(location.href) && mod === cur && dir === 1){return;}
        mod.setLoading(true);
        if(mod.status > mod.LOADING){
            clearTimeout(loadTimer);
            loadTimer = setTimeout(function(){
                mod = new PageModule(url2Page(location.href));
                cur && cur.switchOff();
                mod.switchOn()
                mod.setLoading(false);
                cur = mod;
                core.page = cur.page;
            }, 400);
        }
    },
    init : function(page, dom, callback, inFrame){
        var mod = new PageModule(page, dom);
        mod.status = mod.READY;
        try{
            mod.callback = callback(dom, $, window);
        }catch(e){
            $.log('spa.loader', e.message, 'error')
        }
    }
}
module.exports = api;
var core = require('./index');
