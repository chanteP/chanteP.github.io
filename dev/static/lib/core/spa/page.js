var $ = require('np-kit');
var storage = {};

var loadingTemplate = [
    '<div class="wrap" data-page></div>'
].join('');

var Page = function(pageName, relPageName){
    if(pageName in storage){
        return storage[pageName];
    }
    storage[pageName] = this;

    this.pageName = relPageName || pageName;
    this.contentNode = $.create(loadingTemplate);

    this.contentNode.dataset.page = this.pageName;
    this.lifecycle = {};
};

Page.prototype = {
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