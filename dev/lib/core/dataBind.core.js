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
        'accessor' : function(propNS, value, dirty){
            var scope = Accessor.ns(propNS || ''), rs;
            if(arguments.length === 0){return vm;}
            if(arguments.length === 1){
                // rs = scope.get();
                return config.mode ? scope.get() : scope.parent[scope.name];
            }
            if(arguments.length >= 2){
                scope.set(value, dirty);
                return scope.value;
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
            var scope = Accessor.ns(nameNS);
            var get, set, value, change;
            propDesc = propDesc || {};
            set = propDesc.set;
            get = propDesc.get;
            change = propDesc.change;
            dirty = propDesc.dirty;
            //desc.set控制输入，响应set->change
            if(typeof set === 'function'){
                scope.set = function(value, dirty){
                    value = set.call(scope.mode ? scope : scope.parent, value, scope.value);
                    scope.__proto__.set.call(scope, value, dirty);
                    return value;
                }
            }
            //desc.get控制输出，不响应，绑定关联属性的change
            if(typeof get === 'function'){
                main.parseDeps(nameNS, scope.parentNS, get);
                var args = vm;
                scope.get = function(){
                    var value = get.call(scope.parent, args);
                    // scope.oldValue = value;
                    return value;
                }
            }
            if(typeof change === 'function'){
                list.add(nameNS, change, 'change');
            }
            scope.dirty = !!dirty;
            !scope.mode && Object.defineProperty(scope.parent, scope.name, {
                'get' : function(){
                    return scope.get();
                },
                'set' : function(value){
                    return scope.set(value);
                },
                'enumerable' : true
            });
            scope.value = scope.parent[scope.name] = typeof set === 'function' || typeof get === 'function' || typeof change === 'function' ? propDesc.value : propDesc;
        },
        'register' : function(nameNS, obj){
            var scope = Accessor.ns(nameNS);
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
            return scope;
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
            var scope = Accessor.ns(nameNS);
            args = [scope.value, scope.oldValue, {type:type, object:scope.parent, name:scope.name, nameNS:scope.nameNS}];
            args[2] = merge(args[2], extArgs);
            args[2].curNS = nameNS;
            if(evtList){
                evtList.forEach(function(func){
                    if(typeof func === 'function'){
                        func.apply(scope.parent, args);
                    }
                    else if(typeof func === 'string'){
                        list.fire(func, type, args[2]);
                    }
                });
            }
            if(scope.parentNS && scope.propagation && scope.propagationType.indexOf(type) >= 0){
                list.fire(scope.parentNS, type, args[2]);
            }
        },
        'add' : function(nameNS, func, evt){
            evt = evt || 'change';
            var evtList = list.check(nameNS, evt, true);
            if(evtList.indexOf(func) >= 0){return;}
            evtList.push(func);
        },
        'check' : function(nameNS, type, build){
            var scope = Accessor.ns(nameNS, !build);
            if(!scope){return false;}
            if(!(scope.list[type] instanceof Array)){
                if(!build){return false;}
                scope.list[type] = [];
            }
            return scope.list[type];
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
        this.propagationType = [].concat(config.propagationType);
        this.mode = config.mode;
        this.dirty = false;
        this.children = [];
        this.parentNS && Accessor.ns(this.parentNS).children.push(this.nameNS);
        collection[this.nameNS] = this;
    }
    Accessor.prototype.get = function(){
        return this.value;
    }
    Accessor.prototype.set = function(value, dirty){
        this.value = value;
        this.mode && (this.parent[this.name] = value);
        dirty = this.dirty || dirty;
        !dirty && list.fire(this.nameNS, 'set', [value, this.oldValue]);
        !dirty && value !== this.oldValue && list.fire(this.nameNS, 'change', [value, this.oldValue]);
        this.oldValue = value;
        this.dirty = false;
        return value;
    }
    Accessor.ns = function(nameNS, pure){
        if(collection[nameNS]){return collection[nameNS];}
        else if(pure){return false;}
        var props = nameNS.split('.'), name = props.pop(), parentNS = props.join('.'), parent = vm;
        var tmp, curScope = '';
        while(props.length){
            tmp = props.shift();
            if(typeof parent != 'object'){parent = null;break;}
            if(!(tmp in parent)){
                curScope += (curScope ? '.' : '') + tmp;
                main.accessor(curScope, parent[tmp] = {});
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
        var scope = Accessor.ns(nameNS, true);
        if(!scope){return;}
        scope.propagation = bool;
        type instanceof Array && (scope.propagationType = type);
    }
    Accessor.destroy = function(nameNS, deep){
        var scope = Accessor.ns(nameNS, true);
        if(scope && scope.parent){
            scope.children.forEach(Accessor.destroy);
            delete scope.parent[scope.name];
            delete collection[nameNS];
        }
    }
    //################################################################################################################
    var expApi = {};
    if('defineProperty' in Object){
        Object.defineProperty(expApi, 'observe', {'enumerable':false, 'writable':true});
        Object.defineProperty(expApi, 'destroy', {'enumerable':false, 'writable':true});   
        Object.defineProperty(expApi, 'fire', {'enumerable':false, 'writable':true});   
        Object.defineProperty(expApi, 'setPropagation', {'enumerable':false, 'writable':true});   
    }
    var DataBind = function(nameNS, obj, cfg){
        if(!arguments.length){nameNS = '';}
        else if(typeof arguments[0] !== 'string'){
            cfg = obj;
            obj = nameNS;
            nameNS = '';
        }
        var scope = main.register(nameNS, obj);
        cfg = cfg || {};
        this.name = nameNS;
        'propagation' in cfg && Accessor.setPropagation(nameNS, cfg.propagation, cfg.propagationType);
        // this.scope = scope;
        if(!config.mode){
            var exports = scope.parent ? scope.parent[scope.name] : vm;
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
    DataBind.prototype.set = function(propNS, value, dirty){
        return main.accessor(main.parseNS(this.__proto__._name || this.name, propNS), value, dirty);
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
