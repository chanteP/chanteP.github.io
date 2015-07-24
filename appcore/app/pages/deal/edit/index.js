var base = require('../../../lib/base');
var dataHandler = require('../common/dataHandler');
var Dialog = require('../../../common/components/dialog');

var style = require('./style.scss');
base.insertStyle(style);

var submitDia = new Dialog();

var editable = $data.editable;

var page = {
    //主页面
    main : require('./main')(dataHandler, $('#main')[0], editable),
    //品类选择
    // category : require('../common/category')(dataHandler, $('#category')[0], editable),
    //首图
    picBlock : require('../common/picBlock')(dataHandler, $('[data-photocontent]'), editable),
    //门店
    poi : require('../common/poi')(dataHandler, $('#poi')[0], editable),
    //套餐
    // plan : require('../common/plan')(dataHandler, $('#plan')[0], editable),
    //服务图
    // picmin : require('../common/picmin')(dataHandler, $('#picMin')[0], editable),
    //有效期
    // validity : require('../common/validity')(dataHandler, $('#validity')[0], editable),
    //使用时间
    useTime : require('../common/useTime')(dataHandler, $('#useTime')[0], editable),
    //购买须知
    buynote : require('../common/buynote')(dataHandler, $('#buyNote')[0], editable),
    //驳回原因
    rejectReason : require('../common/rejectReason')(dataHandler, $('#rejectReason')[0], editable),
    //标红
    scarletRed : require('./scarletRed')(dataHandler, editable)
};

dataHandler.query(function(){
    var match;
    //创建poi回跳
    if(match = /\bnewpoi=([\d\,]+)\b/.exec(window.location.search)){
        page.poi.show(match[1]);
    }
    // page.category.show();
    // base.setLoading(true);
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

$('#submit').on('tap', function(){
    page.main.save(function(){
        if(dataHandler.validate(null, null, validateMsg)){
            return;
        }
        dataHandler.submit( 
            function(){
                submitDia.show({
                    content : '提交成功！项目审核中，请到项目管理－待上线项目查看',
                    type : 'succ',
                    button : [
                        {
                            text : '退出',
                            style : 'active',
                            callback : function(){
                                window.location.href = 'merchant://webview?action=back';
                                window.close();
                                this.hide();
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

var checkCloseFunc = function(){
    base.componentHandler.block = true;
    Dialog().show({
        content : '请确认是否保存，未保存的内容将丢失',
        button : [{
            text : '确定',
            callback : function(){
                base.componentHandler.block = false;
                this.hide();
                window.location.href = "merchant://webview?action=back";
                window.close();
            }
        }, {
            text : '取消',
            style : 'active',
            callback : function(){
                base.componentHandler.block = false;
                this.hide();
                base.componentHandler.pushState();
            }
        }]
    });
}

$(base.componentHandler).on('init', function(){
    editable && base.componentHandler.push({
        hide : function(){
            base.componentHandler.block = true;
            Dialog().show({
                content : '请确认是否保存，未保存的内容将丢失',
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
            });
        }
    });
});
base.componentHandler.checkClose(function(){
    Dialog().show({
        content : '请确认是否保存，未保存的内容将丢失',
        button : [{
            text : '取消',
            callback : function(){
                this.hide();
            }
        }, {
            text : '确定',
            style : 'active',
            callback : function(){
                window.location.href = "merchant://webview?action=back";
                this.hide();
            }
        }]
    });
});
base.setLoading(false);

