var style = require('./style.scss');
var base = require('../../../../lib/base');
var dialog = require('../../../../common/components/dialog')();

var dataAPI;

base.insertStyle(style);

module.exports = function(dataHandler, node, editable){
    if(!node){return;}

    dataAPI = dataHandler;

    dataAPI.sync('rejectReason', function(){
        if(dataAPI.get('rejectReason')){
            node.style.display = 'block';
        }
        else{
            node.style.display = 'none';
        }
    });
    $(node).on('tap', function(){
        var content = dataAPI.get('rejectReason');
        if(!content){return;}

        var contentText, contentArr;

        var {selfModifyRejectReason, rejectReasons} = content; 

        if(selfModifyRejectReason){
            contentText = [
                selfModifyRejectReason.typeNameStr ? `<p>${selfModifyRejectReason.typeNameStr}</p>` : '',
                selfModifyRejectReason.supplements && selfModifyRejectReason.supplements.length > 0 ? 
                    '<p>补充说明：</p>' : 
                    '',
                '<ul>',
                    (selfModifyRejectReason.supplements || []).map(function(supplement, i){
                        return `<li style="list-style:disc;">${i + 1}：${supplement}</li>`;
                    }).join(''),
                '</ul>'
            ].join('');
        }
        else if(rejectReasons){
            contentText = [
                '<ul>',
                    rejectReasons.map(function(rejectReason, i){
                        return [
                            `<li style="list-style:disc;">${i + 1}.【${rejectReason.typeName}】页面：`,
                            (rejectReason.subTypeName ? `${rejectReason.subTypeName}` : ''),
                            (rejectReason.subTypeName ? '（' : ''),
                            ((rejectReason.reason) ? `${rejectReason.reason}` : ''),
                            (rejectReason.subTypeName ? '）' : ''),
                            `</li>`
                        ].join('');
                    }).join(''),
                '</ul>'
            ].join('');
        }
        else{
            contentText = '数据获取错误';
        }

        dialog.show({
            content : contentText
        }, true);
    });
}