
var dialog = require('../../../common/components/dialog');
var dataAPI;
var func = {
    toggle : function(bool){
        var checkValue = bool || +$('#mtPriceInput')[0].value;
        dataAPI.checkToggle('mtprice', checkValue);
        dataAPI.checkToggle('dealprice', checkValue);
    },
    calcClosingPrice : function(mtPrice){
        return (Math.round(+mtPrice * (100 - dataAPI.get('priceRate'))) / 100).toFixed(2);
    },
    getValue : function(){
        var mtPrice = +$('#mtPriceInput')[0].value.trim(),
            closingPrice = func.calcClosingPrice(mtPrice);
        return [
            {
                attrCode : 'df_attr_630',
                attrValue : {
                    label : {
                        mtPrice : mtPrice + '',
                        template : '{mtPrice}元'
                    },
                }
            },
            {
                attrCode : 'df_attr_46',
                attrValue : {
                    label : {
                        closingPrice : closingPrice + '',
                        template : '{closingPrice}元'
                    }
                }
            }
        ]
    },
    getMtprice : function(){
        return $('#mtPriceInput')[0].value.trim();
    },
    save : function(callback){
        var value = func.getValue();

        if(dataAPI.validate('main', [value])){
            return;
        }

        dataAPI.save({
                attributes : value
            }, function(){
                callback && callback();   
            }, function(msg){
            }, true);
    }
}
module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;

    //数据请求完初始化
    dataAPI.onload(function(){
        // $('#mtPriceInput')[0].value = dataAPI.get('attributes.df_attr_630.label.mtPrice') || 0;
        $('#closingPrice')[0].innerHTML = dataAPI.get('attributes.df_attr_46.label.closingPrice') || 0;
        $('#priceRate')[0].innerHTML = dataAPI.get('priceRate') || 0;
        func.toggle();
    });

    dataAPI.sync('attributes', function(){
        $('#storePrice')[0].innerHTML = dataAPI.get('attributes.df_attr_45.label.storePrice') || 0;
    });

    if(!editable){
        $('#mtPriceInput').prop('disabled', true);
        return;
    }

    dataAPI.addValidate('main', function(data){
        var mtPrice = data ? data[0].attrValue.label.mtPrice : dataAPI.get('attributes.df_attr_630.label.mtPrice');

        if(!+mtPrice || isNaN(mtPrice)){
            return '请填写美团价';
        }
        if(+mtPrice <= 0){
            return '请正确填写美团价';
        }

        if(+mtPrice > (+dataAPI.get('attributes.df_attr_45.label.storePrice') || 0)){
            return '美团价不能大于原价';
        }

        if(+mtPrice == (+dataAPI.get('attributes.df_attr_45.label.storePrice') || 0)){
            return '美团价不能等于原价';
        }
    });


    $('#mtpriceCont').on('tap', function(){
        func.toggle(true);
        setTimeout(function(){
            $('#mtPriceInput')[0].focus();
        }, 200);
    });
    // $('#mtPriceInput').on('blur', function(){
    //     func.toggle();
    // });
    $('#mtPriceInput').on('input', function(){
        //TODO 防止超出原价
        var value = this.value;
        if(value && /\d$/.test(value)){
            value = +value;
            this.value = value;
        }
        $('#closingPrice')[0].innerHTML = func.calcClosingPrice(value);
        // debugger
        // this.style.width = String(value).length/1.4 + 'em';
    });
    $('#mainSave').on('tap', function(){
        func.save(function(){
            dialog().show({
                content : '保存完成后，请尽快完成上单'
            }, true);
        });
    });

    return {
        save : func.save
    }
}