var $ = require('np-kit');
var controllers = {}
var Controller = function(name){
    if(controllers[name]){
        return controllers[name];
    }
    if(!(this instanceof Controller)){
        return new Controller(name);
    }

    controllers[name] = this;

    this.name = name;
    this.list = [];
    this.lifecycle = {};
    this.state = 0;
}
Controller.list = controllers;
Controller.prototype = {
    add : function(page){
        this.list.push(page);
    },
    set : function(conf){
        this.state = 1;
        $.merge(this.lifecycle, conf, true);
    },
    get : function(name){
        return this.lifecycle[name];
    },
    check : function(){
        this.list.forEach(function(page){
            if(page.state === page.SHOW && page.loader !== page.INITED){
                page.show(true);
            }
        });
    }
};
module.exports = Controller;