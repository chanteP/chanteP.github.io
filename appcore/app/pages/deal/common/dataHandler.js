/*
    数据控制&分发

    demo:
        root : {
            id: 21172155
            dealId : 21172155

            categoryId: 16
            categoryName: "美食·素食"
            priceRate: 6

            rejectReason: null

            dfGroupMetas : []
            attributes : []

            photoTypes
            photos

            pois
        }

    数据：
        sync([attr], callback); //首先注册某个段的数据回填
        save(....) 
        merge([attr], mergeFunc); //提交完之后自己merge进去，顺便出发attrs的回填
        check([attr]); //然后就会自动回填啦

*/
var mask = require('../../../common/components/mask');
var dialog = require('../../../common/components/dialog');

var io = require('./io');
var base = require('../../../lib/base');

var rootData = {},
    syncRel = {}, syncList = [];

var globalDealId;

var diaBtnList = [{
        text : '确定',
        style : 'active',
        callback : function(){
            this.hide();
        }
    }];

var func = {
    query : function(url, data, succFunc, errFunc){
        return io.get(url, data, succFunc, errFunc);
    },
    getNS : function(data, ns){
        ns = ns.replace(/\battributes\b/, 'attributesMap');
        var nsArr = ns.split('.'), key;
        while(nsArr.length){
            key = nsArr.shift();
            if(!data || typeof data !== 'object'){
                return null;
            }
            data = data[key];
        }
        return data;
    },
    setNS : function(data, ns, value){
        ns = ns.replace(/\battributes\b/, 'attributesMap');
        var root = data,
            nsArr = ns.split('.'), 
            key, 
            attrMark;
        while(nsArr.length > 1){
            key = nsArr.shift();
            if(key === 'attributesMap' && !attrMark){
                attrMark = nsArr[0];
            }
            if(!data[key] || typeof data[key] !== 'object'){
                data[key] = {};
            }
            data = data[key];
        }
        data[nsArr.pop()] = value;
        if(attrMark){
            func.setAttr(attrMark, root.attributesMap[attrMark]);
        }
    },
    setAttr : function(attr, value){
        var item = func.findAttr(attr);
        if(item){
            item.attrValue = (value && typeof value === 'object') ? 
                JSON.stringify(value) : 
                value;
        }
    },
    findAttr : function(attrCode, data){
        return (data || api.data).attributes.filter(function(attr){
            return attr.attrCode === attrCode;
        })[0];
    },
    transAttr : function(attrData){
        var map = {};
        attrData.forEach(function(attr){
            try{
                map[attr.attrCode] = JSON.parse(attr.attrValue);
            }
            catch(e){
                map[attr.attrCode] = attr.attrValue;
            }
        });
        return map;
    },
    mergeData : function(data){
        if(!data){return;}
        //TODO 成功之后自动合并到现有数据里面
        if(data.attributes){
            data.attributes.forEach(function(item){
                try{
                    api.set('attributes.' + item.attrCode, JSON.parse(item.attrValue));
                }
                catch(e){
                    api.set('attributes.' + item.attrCode, item.attrValue);
                }
            });
        }
        //photos 特殊处理...save和实际值区别
    },
    parseSaveArgs : function(args){
        var param = {
            data : null,
            extra : null,
            succFunc : null,
            errFunc : null,
            noTips : false
        };
        for(var i = 0, j = args.length; i < j; i++){
            if(typeof args[i] === 'object' && !param.data){
                param.data = args[i];
            }
            else if(typeof args[i] === 'object' && param.data){
                param.extra = args[i];
            }
            else if(typeof args[i] === 'function' && !param.succFunc){
                param.succFunc = args[i];
            }
            else if(typeof args[i] === 'function' && param.succFunc){
                param.errFunc = args[i];
            }
            else if(typeof args[i] === 'boolean'){
                param.noTips = args[i];
            }
        }
        return param;
    }
}

var api = module.exports = {
    data : rootData,
    //初始化请求
    query : function(callback){
        mask.show(1000, '加载中...');
        api.queryState(function(){
            if(!rootData.categoryId){
                mask.hide();
                callback && callback();
            }
            else{
                api.queryData(callback);
            }
        });
    },
    //deal数据请求 
    queryState : function(callback){
        globalDealId = /\bdealId=([\d]+)\b/.exec(window.location.search);
        globalDealId = globalDealId ? globalDealId[1] : 0;

        func.query('/deal/simple/info' + (globalDealId ? '?dealId='+globalDealId : ''), {}, function(data){
                base.componentHandler.block = false;
                data = data || {};

                // data.id = (['', '21172205'] || /dealId=([\d]+)\b/.exec(location.href))[1];

                rootData.categoryId = data.categoryId;
                rootData.categoryName = data.categoryName;
                rootData.id = data.id;
                rootData.dealId = data.id;
                rootData.priceRate = data.priceRate;
                rootData.rejectReason = data.rejectReason;

                rootData.isOnline = data.isOnline;

                rootData.isSupportEditMtPrice = data.isSupportEditMtPrice;
                rootData.unusedAttrIds = data.unusedAttrIds;
                rootData.verifiable = data.verifiable;
                rootData.show = data.show;

                callback();
            }, function(msg){
                base.componentHandler.block = false;
                rootData = {};
                callback();
            });
    },
    //deal数据请求 
    queryData : function(callback){
        func.query('/deal/template/attributes?dealId=' + rootData.id, {}, function(data){
        // func.query('/deal/template/attributes?dealId='+(['', '21172205'] || /dealId=([\d]+)\b/.exec(location.href))[1], {}, function(data){
                data = data || {};

                rootData.dfGroupMetas = data.dfGroupMetas || []; 
                rootData.attributes = data.attributes || []; 
                rootData.photoTypes = data.photoTypes || [];
                rootData.photos = data.photos || {};
                rootData.pois = data.pois || [];

                rootData.change = data.change || [];

                rootData.attributesMap = api.transAttr(rootData.attributes);

                api.check(rootData);
                
                $(api).triggerHandler('queryLoaded');
                mask.hide();
                callback && callback();
            }, function(msg){
                mask.hide();
                dialog().show({
                    content : msg || '请求失败'
                }, true);
            });
    },
    //加载完数据之后执行的func
    onload : function(func){
        $(api).on('queryLoaded', func);
    },
    //attr数据转化
    transAttr : func.transAttr,
    findAttr : func.findAttr,
    get : function(ns){
        return func.getNS(api.data, ns);
    },
    set : function(ns, value){
        return func.setNS(api.data, ns, value);
    },

    //check
    check : function(attrs, funcList){
        var list = [];
        if(!Array.isArray(attrs)){
            for(var attr in attrs){
                if(attrs.hasOwnProperty(attr)){
                    list.push(attr);
                }
            }
        }
        else{
            list = attrs;
        }
        //TODO 优化，复数attr和单个func
        list.forEach(function(attr){
            //TODO 什么鬼
            (funcList || syncRel[attr] || []).forEach(function(func){
                func(api.data[attr]);
            })
        });
    },
    //属性改变触发的func
    sync : function(attrs, callback){
        if(!callback){return;}
        attrs = [].concat(attrs);
        attrs.forEach(function(attr){
            syncRel[attr] = syncRel[attr] || [];

            syncRel[attr].push(callback);
            // syncList.push(attr);
        });
        // api.check
    },
    //保存
    // save : function(data, succFunc, errFunc, noTips){
    save : function(){
        if(!api.data.id){
            dialog().show('缺少项目id，提交失败', true);
            return;
        }
        var {data, extra, succFunc, errFunc, noTips} = func.parseSaveArgs(arguments);

        mask.show(9999, '保存中');

        base.componentHandler.block = true;

        var postData = {
            dealId : api.data.id,
            from : 7,
            data : JSON.stringify({data : data})
        };

        if(extra){
            for(var key in extra){
                if(extra.hasOwnProperty(key)){
                    postData[key] = extra[key];
                }
            }
        }

        io.post('/deal/save', postData, function(){
                base.componentHandler.block = false;

                func.mergeData(data);
                mask.hide();
                !noTips ?
                    dialog().show({
                        content : '<span style="font-size:.36rem;">保存成功</span>',
                        type : 'succ',
                        button : [{
                            text : '确定',
                            style : 'active',
                            callback : function(){
                                this.hide();
                                succFunc && succFunc();
                            }
                        }]
                    }) : 
                    (succFunc && succFunc());
            }, 
            function(msg){
                base.componentHandler.block = false;
                mask.hide();
                dialog().show({
                    content : '<span style="font-size:.36rem;">'+(msg || '提交失败，请检查网络')+'</span>',
                    type : 'error'
                }, true);
                // mask.show(9999, msg, {touch:true});
                errFunc && errFunc(msg);
        });
    },
    submit : function(succFunc, errFunc){
        mask.show(9999, '提交中');
        io.post('/deal/submit.json', {
                dealId : api.data.id,
                from : 8
            }, function(){
                mask.hide();
                succFunc && succFunc();
            }, 
            function(msg){
                mask.hide();
                dialog().show({
                    content : msg || '提交失败，请检查网络',
                    type : 'error'
                }, true);
                // mask.show(9999, msg, {touch:true});
                errFunc && errFunc(msg);
        });
    },
    //触发sync
    trigger : function(attrs){
        api.check([].concat(attrs));
    },

    validateList : [],
    validateMap : {},
    addValidate : function(id, checkFunc, callback){
        var item = {
            id : id,
            check : checkFunc,
            callback : callback
        };
        api.validateMap[id] = item;
        api.validateList.push(item);
        return this;
    },
    validate : function(id, args, msgFix){
        var list, check;
        if(id){
            list = api.validateMap[id] ? [api.validateMap[id]] : [];
        }
        else{
            list = api.validateList;
        }
        list.some(function(item){
            var rs = args ? item.check.apply(item, args) : item.check();
            //返回失败信息
            if(rs){
                rs = msgFix ? msgFix(item.id, rs) : rs;
                check = true;
                dialog().show({
                    type : 'error',
                    content : rs
                }, true);
                item.callback && item.callback();
                return true;
            }
        });
        return check;
    },

    // placeholder和数据节点的toggle
    checkToggle : function(key, checked, buildFunc){
        var nodes = $('.form-toggle[data-for="'+key+'"]'),
            valueNode = $('.form-toggle[data-for="'+key+'"][data-while="1"]')[0];
        if(!nodes.length){
            return;
        }
        nodes.attr('data-value', checked ? '1' : '0');
        buildFunc && buildFunc(valueNode, checked);
    }
}



