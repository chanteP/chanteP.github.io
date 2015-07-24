var base = require('../../../lib/base');
var dataHandler = require('../common/dataHandler');
var Dialog = require('../../../common/components/dialog');

var style = require('./style.scss');
base.insertStyle(style);

var editable = $data.editable;
var submitDia = new Dialog();

var page = {
    //主页面
    main : require('./main')(dataHandler, $('#main')[0], editable),
    //品类选择
    category : require('../common/category/index.coffee')(dataHandler, $('#category')[0], editable),
    //首图
    banner : require('../common/banner')(dataHandler, $('#banner')[0], editable),
    //门店
    poi : require('../common/poi')(dataHandler, $('#poi')[0], editable),
    //套餐
    plan : require('../common/plan')(dataHandler, $('#plan')[0], editable),
    //服务图
    picmin : require('../common/picmin')(dataHandler, $('#picMin')[0], editable),
    //有效期
    validitly : require('../common/validity')(dataHandler, $('#validity')[0], editable),
    //使用时间
    useTime : require('../common/useTime')(dataHandler, $('#useTime')[0], editable),
    //购买须知
    buynote : require('../common/buynote')(dataHandler, $('#buyNote')[0], editable),
    //驳回原因
    rejectReason : require('../common/rejectReason')(dataHandler, $('#rejectReason')[0], editable)
};

dataHandler.query(function(){
    var match;
    //无品
    if(!dataHandler.get('categoryId')){
        page.category.show();
    }
    //创建poi回跳
    else if(match = /\bnewpoi=([\d\,]+)\b/.exec(window.location.search)){
        page.poi.show(match[1]);
    }
    // page.category.show();
    // base.setLoading(true);
});
//丽人品类修改也是这个模版
dataHandler.onload(function(){
    +dataHandler.get('isOnline') && base.componentHandler.setTitle('自助修改');
});

var validateFixMap = {
    buynote : '购买须知：',
    plan : '套餐详情：'
};
var validateMsg = function(id, msg){
    page[id] && page[id].show && page[id].show();
    page[id] && validateFixMap[id] && (msg = validateFixMap[id] + msg);
    return msg;
}

var showCloseDialog = function(){
    base.componentHandler.block = true;
    Dialog().show({
        content : '您确认不保存信息直接返回吗？返回后填写内容将丢失',
        button : [{
            text : '取消',
            callback : function(){
                base.componentHandler.block = false;
                this.hide();
                base.componentHandler.pushState();
            }
        }, {
            text : '确认',
            style : 'active',
            callback : function(){
                base.componentHandler.block = false;
                this.hide();   
                window.location.href = "merchant://webview?action=back";
                window.close();
            }
        }]
    }, true);
}
try{
    page.category.setOnBack(showCloseDialog);
}
catch(e){
}

$('#submit').on('tap', function(){
    page.main.save(function(){
        if(dataHandler.validate(null, null, validateMsg)){
            return;
        }
        dataHandler.submit(
            function(){
                submitDia.show({
                    content : '<div style="text-align:center;"><h2 style="font-size:.36rem;font-weight:700;">提交成功</h2><p style="font-size:.3rem;margin-top:.28rem;">项目审核中，请到项目管理－待上线项目查看</p></div>',
                    button : [
                        {
                            text : '继续上单',
                            callback : function(){
                                this.hide();
                                window.location.href = window.location.href.replace(window.location.search, '');
                            }
                        },
                        {
                            text : '查看项目',
                            style : 'active',
                            callback : function(){
                                this.hide();
                                window.location.href = 'merchant://webview/deal/list';
                                window.close();
                            }
                        }
                    ]
                });
            }, 
            function(msg){
            }
        );
    }, true);
});
$(base.componentHandler).on('init', function(){
    editable && base.componentHandler.push({
        hide : showCloseDialog
    });
});

base.setLoading(false);

