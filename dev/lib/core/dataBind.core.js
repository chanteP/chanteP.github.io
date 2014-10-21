/*
    mode ? accessor : defineProp
    var db = new DataBind('prop1.prop2', {
        a: {
            get: func
            set: func
            value: value
        }
    });
    accessor :
        db.set('a', 1);
        db.observe('a', func, 'change');
    defineProp :
        db.a = 1;
        DataBind.observe('')
    propagation : 
*/
;(function(window, name, $){
    if(name in window){return;}
    //信息容器&操作对象实体
    var collection = {}, vm = {};
    //设置，模式&冒泡
    var config = {
        'mode' : 0,
        'propagation' : true,
        'propagationType' : ['change']
    };
    
    //################################################################################################################
    var isEmptyObject = function(obj){
        for(var key in obj){
            if(!obj.hasOwnProperty(key)){continue;}
            return false;
        }
        return true;
    }
    var merge = $.merge;
    //################################################################################################################
    var main = {
        'parseNS' : function(name, propNS){
            propNS = propNS || '';
            return name + (name !== undefined && name !== '' && propNS !== '' ? '.' : '') + propNS;
        },
        'accessor' : function(propNS, value){
            var data = Accessor.ns(propNS || ''), rs;
            if(arguments.length === 0){return vm;}
            if(arguments.length === 1){
                // rs = data.get();
                return config.mode ? data.get() : data.parent[data.name];
            }
            if(arguments.length >= 2){
                data.set(value);
                return data.value;
            }
        },
        'parseDeps' : function(nameNS, parentNS, func){
            // var argsContext = /^function\s?\(\s*([^,\s\)\/]*)/.exec(func.toString());
            var code = func.toString()
                .replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg, '')
                .replace(/^\s*\/\/.*$/mg, '')
                .replace(/(this|vm)\.[\w\.]+(\(|\s*\=)/mg, '')
                .replace(/\bthis\b/g, 'vm.' + parentNS);

            var contextReg = /\bvm\.([\w|\.]+)\b/g;
            var deps = [], match;
            while ((match = contextReg.exec(code))) {
                if (match[1]) {
                    deps.push(match[1]);
                }
            }
            Accessor.ns(nameNS).deps = deps;
            deps.forEach(function(dep){
                list.add(dep, nameNS, 'change');
            });
        },
        'defProp' : function(nameNS, propDesc){
            var col = Accessor.ns(nameNS);
            var get, set, value, change;
            propDesc = propDesc || {};
            set = propDesc.set;
            get = propDesc.get;
            change = propDesc.change;
            //desc.set控制输入，响应set->change
            if(typeof set === 'function'){
                col.set = function(value){
                    value = set.call(col.mode ? col : col.parent, value, col.value);
                    col.__proto__.set.call(col, value);
                    return value;
                }
            }
            //desc.get控制输出，不响应，绑定关联属性的change
            if(typeof get === 'function'){
                main.parseDeps(nameNS, col.parentNS, get);
                var args = vm;
                col.get = function(){
                    var value = get.call(col.parent, args);
                    // col.oldValue = value;
                    return value;
                }
            }
            if(typeof change === 'function'){
                list.add(nameNS, change, 'change');
            }
            !col.mode && Object.defineProperty(col.parent, col.name, {
                'get' : function(){
                    return col.get();
                },
                'set' : function(value){
                    return col.set(value);
                },
                'enumerable' : true
            });
            col.value = col.parent[col.name] = typeof set === 'function' || typeof get === 'function' || typeof change === 'function' ? propDesc.value : propDesc;
        },
        'register' : function(nameNS, obj){
            var col = Accessor.ns(nameNS);
            if(typeof obj === 'object' && obj !== null
                && typeof obj.set !== 'function'
                && typeof obj.get !== 'function'
                && typeof obj.change !== 'function'
                && !('value' in obj)
                && !isEmptyObject(obj)){
                for(var prop in obj){
                    if(!obj.hasOwnProperty(prop)){continue;}
                    main.register(main.parseNS(nameNS, prop), obj[prop]);
                }
            }
            else if(typeof obj === 'undefined'){
                main.defProp(nameNS);
            }
            else{
                main.defProp(nameNS, obj);
            }
            return col;
        }
    }
    //################################################################################################################
    var list = {
        'fire' : function(nameNS, type, extArgs){
            if(type instanceof Array){
                type.forEach(function(type){
                    list.fire(nameNS, type, extArgs);
                });
                return;
            }
            var evtList = list.check(nameNS, type);
            var col = Accessor.ns(nameNS);
            args = [col.value, col.oldValue, {type:type, object:col.parent, name:col.name}];
            args[2] = merge(args[2], extArgs);
            if(evtList){
                evtList.forEach(function(func){
                    if(typeof func === 'function'){
                        func.apply(col.parent, args);
                    }
                    else if(typeof func === 'string'){
                        list.fire(func, type, args[2]);
                    }
                });
            }
            if(col.parentNS && col.propagation && col.propagationType.indexOf(type) >= 0){
                list.fire(col.parentNS, type, args[2]);
            }
        },
        'add' : function(nameNS, func, evt){
            evt = evt || 'change';
            var evtList = list.check(nameNS, evt, true);
            if(evtList.indexOf(func) >= 0){return;}
            evtList.push(func);
        },
        'check' : function(nameNS, type, build){
            var col = Accessor.ns(nameNS, !build);
            if(!col){return false;}
            if(!(col.list[type] instanceof Array)){
                if(!build){return false;}
                col.list[type] = [];
            }
            return col.list[type];
        }
    }
    //################################################################################################################
    var Accessor = function(data){
        this.name = data.name;
        this.nameNS = data.nameNS;
        this.parent = data.parent;
        this.parentNS = data.parentNS;
        this.list = {};
        this.value = data.value;
        this.oldValue = data.value;
        this.deps = [];
        this.propagation = config.propagation;
        this.propagationType = config.propagationType;
        this.mode = config.mode;
        this.children = [];
        this.parentNS && Accessor.ns(this.parentNS).children.push(this.nameNS);
        collection[this.nameNS] = this;
    }
    Accessor.prototype.get = function(){
        return this.value;
    }
    Accessor.prototype.set = function(value){
        this.value = value;
        this.mode && (this.parent[this.name] = value);
        list.fire(this.nameNS, 'set', [value, this.oldValue]);
        value !== this.oldValue && list.fire(this.nameNS, 'change', [value, this.oldValue]);
        this.oldValue = value;
        return value;
    }
    Accessor.ns = function(nameNS, pure){
        if(collection[nameNS]){return collection[nameNS];}
        else if(pure){return false;}
        var props = nameNS.split('.'), name = props.pop(), parentNS = props.join('.'), parent = vm;
        var tmp;
        while(props.length){
            tmp = props.shift();
            if(typeof parent != 'object'){parent = null;break;}
            if(!(tmp in parent)){
                parent[tmp] = {};
            }
            parent = parent[tmp];
        }
        return new Accessor({
            'name' : name,
            'nameNS' : nameNS,
            'value' : nameNS === '' ? vm : parent[props.pop()],
            'parent' : nameNS === '' ? null : parent, 
            'parentNS' : parentNS === '' ? null : parentNS
        });
    };
    Accessor.setPropagation = function(nameNS, bool, type){
        var col = Accessor.ns(nameNS, true);
        if(!col){return;}
        col.propagation = bool;
        type instanceof Array && (col.propagationType = type);
    }
    Accessor.destroy = function(nameNS, deep){
        var col = Accessor.ns(nameNS, true);
        if(col && col.parent){
            col.children.forEach(Accessor.destroy);
            delete col.parent[col.name];
            delete collection[nameNS];
        }
    }
    //################################################################################################################
    var expApi = {};
    if('defineProperty' in Object){
        Object.defineProperty(expApi, 'observe', {'enumerable':false, 'writable':true});
        Object.defineProperty(expApi, 'destroy', {'enumerable':false, 'writable':true});   
        Object.defineProperty(expApi, 'setPropagation', {'enumerable':false, 'writable':true});   
    }
    var DataBind = function(nameNS, obj, cfg){
        if(!arguments.length){nameNS = '';}
        else if(typeof arguments[0] !== 'string'){
            cfg = obj;
            obj = nameNS;
            nameNS = '';
        }
        var col = main.register(nameNS, obj);
        cfg = cfg || {};
        this.name = nameNS;
        'propagation' in cfg && Accessor.setPropagation(nameNS, cfg.propagation, cfg.propagationType);
        // this.col = col;
        if(!config.mode){
            var exports = col.parent ? col.parent[col.name] : vm;
            exports.__proto__ = Object.create(expApi, {'_name':{'value' : nameNS}});
            return exports;
        }
    };
    DataBind.config = function(cfg){
        'mode' in cfg && (config.mode = cfg.mode);
        'propagation' in cfg && (config.propagation = cfg.propagation);
    }
    DataBind.collection = collection;
    DataBind.accessor = main.accessor;
    DataBind.observe = list.add;
    DataBind.destroy = Accessor.destroy;
    DataBind.setPropagation = Accessor.setPropagation;
    DataBind.prototype.get = function(propNS){
        return main.accessor(main.parseNS(this.__proto__._name || this.name, propNS));
    }
    DataBind.prototype.set = function(propNS, value){
        return main.accessor(main.parseNS(this.__proto__._name || this.name, propNS), value);
    }
    DataBind.prototype.setPropagation = expApi.setPropagation = function(bool, type){
        propNS = main.parseNS(this.__proto__._name || this.name, propNS);
        Accessor.setPropagation(propNS, bool, type);
        return this;
    };
    DataBind.prototype.observe = expApi.observe = function(propNS, func, evt){
        propNS = main.parseNS(this.__proto__._name || this.name, propNS);
        list.add(propNS, func, evt);
        return this;
    };
    DataBind.prototype.fire = expApi.fire = function(propNS, evt, args){
        propNS = main.parseNS(this.__proto__._name || this.name, propNS);
        var value = main.accessor(propNS);
        list.fire(propNS, [evt], [value, value]);
        return this;
    };
    DataBind.prototype.destroy = expApi.destroy = function(deep){
        Accessor.destroy(this.__proto__._name || this.name);        
    };
    //################################################################################################################
    window[name] = DataBind;
})(window, 'DataBind', window.NPWEB_Core);
