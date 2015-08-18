var $ = require('np-kit');
var storage = {};

var loadingTemplate = [
    '<div class="page-wrap" data-page></div>'
].join('');

var Page = function(pageName, relPageName){
    if(pageName in storage){
        return storage[pageName];
    }
    if(!(this instanceof Page) && !storage[pageName]){
        return null;
    }
    storage[pageName] = this;

    this.pageKey = pageName;
    this.pageName = relPageName || pageName;
    this.contentNode = $.create(loadingTemplate);

    this.contentNode.dataset.page = this.pageName;
    this.contentNode.dataset.pagekey = pageName;
    this.lifecycle = {};
};
Page.current = null;
Page.show = function(pageName){
    Page.hide(Page.current);

    var page = Page(pageName);
    if(!page){return;}
    var wrapper = $.find('#wrapper');
    wrapper.appendChild(page.contentNode);

    Page.current = pageName;
    if(page.state === page.SHOW){return;}

    if(!page.inited){
        page.run('init');
        page.inited = true;
    }

    page.state = page.SHOW;
    page.run('show');
};
Page.hide = function(pageName){
    var page = Page(pageName);
    if(!page || page.state === page.HIDE){return;}

    page.state = page.HIDE;
    page.run('hide');
    $.remove(page.contentNode);
};
Page.prototype = {
    loaded : false,
    loading : false,

    state : 0,

    SHOW : 1,
    HIDE : 0,

    run : function(lifecycle){
        if(this.lifecycle[lifecycle]){
            this.lifecycle[lifecycle].apply(this.lifecycle, arguments);
        }
    },

    extend : function(pageKey){
        var page = new Page(pageKey, this.pageName);
        page.__proto__ = this;
    },
    register : function(conf){
        $.merge(this.lifecycle, conf, true);
    },
    setContent : function(html){
        this.contentNode.innerHTML = html;
    }
}

module.exports = Page;