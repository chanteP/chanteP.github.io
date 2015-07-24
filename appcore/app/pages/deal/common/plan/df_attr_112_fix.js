var setTableLimit = function(tableItemNode, length){
    var numberNode = $('[name="number"]', tableItemNode),
        unitNode = $('[name="unit"]', tableItemNode);
    numberNode.each(function(i, e){
        if(e.value != 1){
            $(e).val('1').trigger('input');
        }
    });
    unitNode.each(function(i, e){
        if(e.value != '次'){
            $(e).val('次').trigger('input');
        }
    });

    var targetNumberNode = $('label[value="NRS"] [name="fromNumber"]', tableItemNode.nextElementSibling)[0];
    var toNumberNode = $('label[value="NRS"] [name="toNumber"]', tableItemNode.nextElementSibling)[0];

    if(targetNumberNode && +targetNumberNode.value !== length){
        targetNumberNode.value = length;
        $(targetNumberNode).trigger('input');
    }
    if(toNumberNode){
        if(toNumberNode.value > length){
            toNumberNode.value = length;
            $(toNumberNode).trigger('input');
        }
        else if(toNumberNode.value < 1 || isNaN(toNumberNode.value)){
            toNumberNode.value = 1;
            $(toNumberNode).trigger('input');
        }
    }
}

var fixNumber = function(tableItemNode){
    if(!tableItemNode){return;}
    setTableLimit(tableItemNode, $('.dynamicform-list-content', tableItemNode).length);
}
var delNumber = function(tableItemNode){
    if(!tableItemNode){return;}
    setTableLimit(tableItemNode, $('.dynamicform-list-content', tableItemNode).length - 1);//这个时候item还没有被删除
}
module.exports = function(node){
    $(node).on('tap', '.dynamic-form-item.table [data-type="add"]', function(){
        fixNumber($(this).parents('.dynamic-form-item.table')[0]);
    });
    $(node).on('touchend', '.dynamic-form-item.table [data-type="del"]', function(){
        delNumber($(this).parents('.dynamic-form-item.table')[0]);
    });

    return {
        check : function(){
            [].forEach.call($('.dynamic-form-item.table', node), fixNumber);
        }
    }
}
