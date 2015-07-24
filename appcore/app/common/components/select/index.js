var base = require('../../../lib/base');

var css = require('./style.scss');
base.insertStyle(css);

var Controls = require('../../animator/controls');

var render = require('./render.jsx');

var commonSelect;

var func = {
    parseArgs : function(args){
        var param = {
            list : [],
            current : 0,
            text : '',
            callback : null
        };
        for(var i = 0, j = args.length; i < j; i++){
            if(Array.isArray(args[i])){
                param.list = args[i];
            }
            else if(typeof args[i] === 'string'){
                param.text = args[i];
            }
            else if(typeof args[i] === 'number'){
                param.current = args[i];
            }
            else if(typeof args[i] === 'function'){
                param.callback = args[i];
            }
        }
        //文本优先
        if(param.text){
            param.list.some(function(item, i){
                var rs = typeof item === 'object' ? item.text === param.text : item === param.text;
                if(rs){
                    param.current = i;
                    return true;
                }
            });
        }
        return param;
    }
}

var Select = function(cfg){
    if(!(this instanceof Select)){
        commonSelect.config(cfg);
        return commonSelect;
    }
    this.config(cfg);
    this.build();
    this.bind();
}
Select.prototype = {
    constructor : Select,
    controls : null,
    node : null,

    data : null,
    callback : null,


    build : function(){
        this.controls = new Controls();
        this.controls.instance = this;
        this.node = this.controls.node;
    },
    bind : function(){
        var self = this;
        $(this.node).on('tap', '[data-act="select"]', function(e){
            e.preventDefault();
            var index = this.getAttribute('data-index');
            if(self.callback){
                try{
                    self.callback.call(self, self.data[index]);
                }
                catch(e){}
            }
            self.hide();
        });
    },
    config : function(){

    },

    show : function(){
        var args = func.parseArgs(arguments);
        var current = args.current || 0;
        var self = this;
        this.data = args.list || this.data;
        this.callback = args.callback || callback;

        this.node.style.display = 'none';
        render(this.node, this.data, current);

        //TODO rlg
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            self.node.style.display = '';
            self.controls.show();

            $('.m-controls-select', self.node)[0].scrollTop = 45 * current;

            base.animate($('.m-controls-select', self.node)[0], 'slideInUp');
        }, 0)
    },
    hide : function(){
        base.animate($('.m-controls-select', this.node)[0], 'slideOutDown');
        this.controls.hide();
    }
}
commonSelect = new Select;
module.exports = Select