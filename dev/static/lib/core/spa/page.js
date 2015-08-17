var $ = require('np-kit');
var storage = {};

var Page = function(pageName, contentNode){
    if(pageName in storage){
        return storage[pageName];
    }
    storage[pageName] = this;

    this.contentNode = contentNode || LOADINGNODE;
};

Page.prototype = {
    run : function(lifecycle){
        if(this[lifecycle]){
            this[lifecycle].apply(this, arguments);
        }
    },
    // init : function(){},
    // show : function(){},
    // hide : function(){},
    // destroy : function(){},

    extend : function(pageKey, contentNode){
        var page = new Page(pageKey, contentNode);
        page.__proto__ = this;
    },
    register : function(conf){
        $.merge(this, conf, true);
    }
}

module.exports = Page;