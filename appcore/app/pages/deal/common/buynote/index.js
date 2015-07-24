var template = require('./template.html'),
    style = require('./style.scss');
var drawer = require('../../../../common/animator/drawer');
var base = require('../../../../lib/base');
var df = require('./df.jsx');
var preview = require('../../../../lib/dynamicform-preview');

var minRadio = require('../../../../common/formItem/minRadio');


var cont, dfContent;
var dataAPI;
var dfIns;

base.insertStyle(style);

var toggle = function(){
    var noteArray = dataAPI.get('dfGroupMetas.buynote') || [];
    var attrObj = dataAPI.get('attributes') || {};
    //生成预览
    var notes = preview(noteArray, attrObj);
    dataAPI.checkToggle('buynote', notes.length, function(node){
        node.previousElementSibling && (node.previousElementSibling.style.borderBottomStyle = notes.length ? 'dashed' : '');
        node.innerHTML = notes;
    });
}
var initDF = function(){
    var meta = dataAPI.get('dfGroupMetas.buynote') || [],
        data = dataAPI.get('attributes');
    dfIns = df(dfContent, meta, data);
}
var show = function(){
    initDF();
    cont.show({
        title : '购买须知'
    });
}


module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;
    cont = drawer(template);
    dfContent = $('[data-node="buynoteContent"]', cont.node)[0];

    dataAPI.onload(function(){
        toggle();
    });

    if(!editable){return;}
    minRadio(cont.node);
    
    dataAPI.addValidate('buynote', function(){
        if(!dfIns){
            initDF();
        }
        var rs = dfIns.getAllValidation();
        if(rs.length){
            return rs[0].result.indexOf('必填') === 0 ? '请填写必填项' : rs[0].result;
        }        
    });
    $(node).on('tap', show);

    $('#buynoteSave').on('tap', function(){
        if(dataAPI.validate('buynote')){
            return;
        }
        var value = dfIns ? dfIns.getValue(null, true) : [];

        dataAPI.save({
                attributes : value
            }, {
                step : 'appbuynote'
            }, function(){
                toggle();
                cont.hide();
            }, function(msg){
                // cont.hide()
            });
    });
    return {
        show : show
    }
}




