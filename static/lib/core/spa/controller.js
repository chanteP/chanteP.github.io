import $ from 'np-kit'
var controllers = {}

class Controller{
    constructor(name){
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
    add(page){
        this.list.push(page);
    }
    set(conf){
        this.state = 1;
        $.merge(this.lifecycle, conf, true);
    }
    get(name){
        return this.lifecycle[name];
    }
    check(){
        this.state && this.list.forEach((page) => {
            if(page.state === page.SHOW && page.loader !== page.INITED){
                page.show(true);
            }
        });
    }
};
Controller.list = controllers;

module.exports = Controller;