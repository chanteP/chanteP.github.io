var template = require('./template.html'),
    style = require('./style.scss');
var drawer = require('../../../../common/animator/drawer');
var base = require('../../../../lib/base');
var df = require('./df.jsx');
var preview = require('../../../../lib/dynamicform-preview');

var fixData = require('./fixData'),
    fix112Data = require('./df_attr_112_fix');

var cont, dfContent;
var dataAPI;
var dfIns;

base.insertStyle(style);

var func = {
    toggle : function(){
        var noteArray = dataAPI.get('dfGroupMetas.plan') || [];
        var attrObj = dataAPI.get('attributes') || {};
        var planHTML = preview(noteArray, attrObj);
        // console.log( planHTML );
        dataAPI.checkToggle('plan', +dataAPI.get('attributes.df_attr_45.label.storePrice')/*planHTML.length*/, function(node, check){
            node.previousElementSibling && (node.previousElementSibling.style.borderBottomStyle = check ? 'dashed' : '');
            node.innerHTML = planHTML;
        });
    },
    initDF : function(){
        // window.t1 = Date.now();
        var meta = dataAPI.get('dfGroupMetas.plan') || [],
            data = dataAPI.get('attributes');
        dfIns = df(dfContent, meta, data);
        // console.log(window.t2 = Date.now(), window.t2 - window.t1);
        fix112Data.check();
    },
    show : function(){
        func.initDF();
        cont.show({
            title : '套餐详情'
        });
    }
}

module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;
    cont = drawer(template);
    dfContent = $('[data-node="planContent"]', cont.node)[0];
    
    dataAPI.onload(function(){
        func.toggle();
    });

    if(!editable){return;}
    fix112Data = fix112Data(cont.node);

    dataAPI.addValidate('plan', function(){
        if(!dfIns){
            func.initDF();   
        }
        var rs = dfIns.getAllValidation();
        if(rs.length){
            return rs[0].result.indexOf('必填') === 0 ? '请填写必填项' : rs[0].result;
        }
        var planName = $('[name="df_attr_81"]')[0];
        if(planName && !planName.value){
            return '请填写套餐名称';
        }
        var planElemName = $('[name="name"]', cont.node);
        if(!planElemName.length || [].some.call(planElemName, function(el){
            if(!el.value){
                return true;
            }
        })){
            return '请填写服务项目名';
        }
        var planElemPrice = $('[name="price"]', cont.node);
        if(!planElemPrice.length || [].some.call(planElemPrice, function(el){
            if(!el.value){
                return true;
            }
        })){
            return '请填写服务项目价格';
        }
        var list112 = $('[name="toNumber"]', cont.node);
        if(list112.length){
            return [].some.call(list112, function(el){
                    var label = $(el).parents('[value="NRS"]')[0],
                        relFrom = $('[name="fromNumber"]', el.parentNode.parentNode)[0],
                        radio = label ? $('[type="radio"]', label)[0] : null;
                    if(label && radio && radio.checked && relFrom && (relFrom.value < el.value)){
                        return true;
                    }
                }) ? 
                    '几选几信息填写错误' : 
                    undefined;
        }
    });
    dataAPI.addValidate('planPrice', function(){
        if(!+dataAPI.get('attributes.df_attr_45.label.storePrice')){
            return '请填写套餐';
        }
    });

    $(node).on('tap', func.show);

    // $(cont.node).on('input', '[name="toNumber"]', function(){
        
    // });

    $('#planSave').on('tap', function(){
        if(dataAPI.validate('plan')){
            return;
        }

        var value = dfIns ? dfIns.getValue(null, true) : [];

        value = fixData(value, {
            node : cont.node,
            dataAPI : dataAPI
        });

        dataAPI.save({
                attributes : value
            }, {
                step : 'appplan'
            },function(){
                dataAPI.trigger('attributes');
                func.toggle();
                cont.hide();
            }, function(msg){
                // cont.hide()
            });
    });
    return {
        show : func.show
    }
}


