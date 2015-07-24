var calcSum = function(node, data, dataAPI){
    var plans = $('.dynamic-form-item.table', node);
    return [].map.call(plans, function(table){
        //首先取到相关的几选几radio块
        var radioCont = $(table.previousElementSibling).hasClass('radio') ? table.previousElementSibling : $(table.nextElementSibling).hasClass('radio') ? table.nextElementSibling : null;
        //是否全部可用
        var isAll = radioCont ? 
            !!$('input[type="radio"][value="A"]:checked', radioCont)[0] :
            true;
        //计算每个项目的价格，返回一个list
        var listOuter = $('.dynamicform-list', table);
        if(!listOuter){return 0;}
        var lists = $('.dynamicform-list-content', listOuter);
        var itemPriceList = [].map.call(lists, function(block){
            var price = $('[name="price"]', block).val() || 0,
                number = $('[name="number"]', block).val() || 1;
            return price * number;
        });
        //最后取几个
        var toNumberNode = $('label[value="NRS"] [name="toNumber"]', radioCont);
        var toValue = +toNumberNode[0].value;
        if(toValue > itemPriceList.length){
            toNumberNode[0].value = itemPriceList.length;
            toValue = itemPriceList.length;
            toNumberNode.trigger('input');
        }
        if(toValue <= 0 || isNaN(toValue)){
            toNumberNode[0].value = 1;
            toValue = 1;
            toNumberNode.trigger('input');
        }

        var targetNumber = isAll ? itemPriceList.length : toValue || 1;

        itemPriceList.sort(function(a, b){
            return a > b ? -1 : 1;
        });
        if(!itemPriceList.length){
            return 0;
        }
        return itemPriceList.reduce(function(e, price, index){
            return index > targetNumber - 1 ? 
                e : 
                e + price;
        });
    })[0];
}
var isHighestPrice = function(){
    return 'Y';
}


module.exports = function(data, cfg){
    var node = cfg.node,
        dataAPI = cfg.dataAPI;

    data.push({
        attrCode: "df_attr_45",
        attrValue: {
            "label":{
                "storePrice": calcSum(node, data, dataAPI) + ''
            },
            "template":"{storePrice}元"
        }
    });

    data.push({
        attrCode: "df_attr_121",
        attrValue: isHighestPrice()
    });
    return data;
}