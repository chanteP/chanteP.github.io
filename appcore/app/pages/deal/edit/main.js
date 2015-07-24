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
        var value = {
            photos : {
                '1' : dataAPI.get('photos.1'),
                '2' : dataAPI.get('photos.2')
            },
            attributes : [
            ]
        }
        if(dataAPI.get('isSupportEditMtPrice')){
            value.attributes.push(
                {
                    attrCode : 'df_attr_630',
                    attrValue : '{"label":{"mtPrice":"'+mtPrice+'"},"template":"{mtPrice}元"}'
                },
                {
                    attrCode : 'df_attr_46',
                    attrValue : '{"label":{"closingPrice":"'+closingPrice+'"},"template":"{closingPrice}元"}'
                }
            )
        }
        if($('[name="df_attr_52"]')[0]){
            value.attributes.push(
                {
                    attrCode : 'df_attr_52',
                    attrValue : $('[name="df_attr_52"]')[0].value
                }
            )
        }
        return value;
    },
    getMtprice : function(){
        return $('#mtPriceInput')[0].value.trim();
    },
    save : function(callback){
        if(dataAPI.validate('main')){
            return;
        }

        var data = func.getValue();
        dataAPI.save(data, function(){
                callback && callback();
            }, function(msg){
            }, true);
    }
}
module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;

    //数据请求完初始化
    dataAPI.onload(function(){
        $('#mtPriceInput')[0].value = dataAPI.get('attributes.df_attr_630.label.mtPrice') || 0;
        $('#closingPrice')[0].innerHTML = dataAPI.get('attributes.df_attr_46.label.closingPrice') || 0;
        $('#storePrice')[0].innerHTML = dataAPI.get('attributes.df_attr_45.label.storePrice') || 0;
        $('[name="df_attr_52"]')[0] && ($('[name="df_attr_52"]')[0].innerHTML = dataAPI.get('attributes.df_attr_52') || '');
        $('#priceRate')[0].innerHTML = dataAPI.get('priceRate');
        func.toggle();

        !dataAPI.get('isSupportEditMtPrice') && ($('#mtPriceInput')[0].readOnly = true); 
        (dataAPI.get('unusedAttrIds') || []).forEach(function(id){
            $('[data-blockname="'+id+'"]').remove();
        });
    });

    dataAPI.addValidate('main', function(data){
        var mtPrice = $('#mtPriceInput')[0].value,
            isSupportEditMtPrice = dataAPI.get('isSupportEditMtPrice');
        if(!dataAPI.get('photos.1.length') || !dataAPI.get('photos.2.length')){
            return '请上传手机/电脑首图';
        }
        if(isSupportEditMtPrice && !+mtPrice){
            return '请填写美团价';
        }
        if(isSupportEditMtPrice && (isNaN(mtPrice) || +mtPrice < 0)){
            return '请正确填写美团价';
        }
        if(isSupportEditMtPrice && +mtPrice >= (dataAPI.get('attributes.df_attr_45.label.storePrice') || 0)){
            return '美团价不能大于原价';
        }
    });


    if(!editable){
        $('#mtPriceInput').prop('disabled', true);
        return;
    }

    $('#mtPriceTitle').on('tap', function(){
        dialog().show({
            title : '',
            content : '美团价必填，不能高于门店价',
            button : [{
                text : '确定',
                style : 'active',
                callback : function(){
                    this.hide();
                }
            }]
        });
    });
    $('#mtpriceCont').on('tap', function(){
        func.toggle(true);
        setTimeout(function(){
            $('#mtPriceInput')[0].focus();
        }, 200);
    });
    $('#mtPriceInput').on('input', function(){
        //TODO 防止超出原价
        var value = this.value;
        if(value && /\d$/.test(value)){
            value = +value;
            this.value = value;
        }
        $('#closingPrice')[0].innerHTML = func.calcClosingPrice(value);
    });
    $('#mainSave').on('tap', function(){
        func.save(function(){
            dialog().show({
                content : '完成修改后，请"提交审核"'
            }, true);
        })
    });
    return {
        save : func.save
    }
}