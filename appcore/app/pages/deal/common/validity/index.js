var template = require('./template.html');
var drawer = require('../../../../common/animator/drawer');
var Dialog = require('../../../../common/components/dialog');
var Content = require('./render.jsx');
var _ = require('lodash');
var document = global.document;

var style = require('./style.scss'),
    base = require('../../../../lib/base');
base.insertStyle(style);

var cont = drawer(template);

var dataAPI,
    nodeContent;

var func = {
    //主页面回填
    toggle : function(){
        dataAPI.checkToggle('validity', dataAPI.get('attributes.df_attr_54.label.monthCount') || dataAPI.get('attributes.df_attr_54.label.expireDate'), function(node){
            node.innerHTML = dataAPI.get('attributes.df_attr_54.key') === 'NM' ?
                (dataAPI.get('attributes.df_attr_54.label.monthCount') + '个月') :  
                dataAPI.get('attributes.df_attr_54.label.expireDate');
        });
    },
    render: function() {
        var node = document.getElementById('J-validity-container');
        nodeContent = React.render(React.createElement(Content, dataTrans.from(), null), node);
    },
    toBool: function(str) {
        if (str === 'N') return false;
        if (str === 'Y') return true;
        return;
    },
    fromBool: function(bool) {
        if (true === bool) return 'Y';
        if (false === bool) return 'N';
        return '';
    },
    show : function(){
        cont.show({
            title : '有效期'
        });
        func.render();
    }
};

var dialog = new Dialog({
    content : '<div></div>',
    title : '',
    button : [
        {
            text : '取消',
            callback : function(){
                this.hide();
            }
        },
        {
            text : '确定',
            callback : function(){
                this.node;
                this.hide();
            }
        }
    ]
});

var dataTrans = {
    from: function() {
        var obj = {};
        obj.monthCount = Number(dataAPI.get('attributes.df_attr_54.label.monthCount') || 1);
        obj.useDay = dataAPI.get('attributes.df_attr_11') || {useDay:true};
        obj.renewal = func.toBool(dataAPI.get('attributes.df_attr_293'));
        return obj;
    },
    to: function(data) {
        return [
            {
                attrCode : "df_attr_54",
                attrValue : {
                    "label":{
                        "monthCount": data.monthCount + '',
                        "dayCount":"",
                        "expireDate":""
                    },
                    "template":{
                        "NM":"自上线之日起 {monthCount}个月",
                        "ND":"自上线之日起 {dayCount} 天",
                        "DT":"自上线之日起至 {expireDate} 23:59:59"
                    },
                    "key":"NM"
                }
            },
            {
                attrCode: "df_attr_11",
                attrValue: (function(useDay){
                    useDay.useDay = +useDay.useDay + '';
                    useDay.startDate = useDay.holiday ? "2015-01-01,2015-02-19,2015-05-01,2015-06-20,2015-09-27,2015-10-01" : '';
                    useDay.endDate = useDay.holiday ? "2015-01-03,2015-02-25,2015-05-03,2015-06-22,2015-09-27,2015-10-07" : '';

                    useDay.weekday = useDay.weekend ? '6,7' : '';
                    return useDay;
                })(data.useDay) || {useDay: '0', weekday : '', startDate:'', endDate:'', specialCondition:''}
            },
            {
                attrCode: "df_attr_293", 
                attrValue: func.fromBool(data.renewal)
            }
        ]; 
    }
};

module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;

    dataAPI.onload(function(){
        func.toggle();
        if(dataAPI.get('isOnline')){
            $(node).removeClass('tips-select');
            editable = false;
        }
    });

    //上线后不能修改
    if(!editable){return;}

    dataAPI.addValidate('validity', function(data){
        var target;
        target = data ? 
            dataAPI.findAttr('df_attr_54', data).attrValue.label.monthCount : 
            (dataAPI.get('attributes.df_attr_54.label.monthCount') || dataAPI.get('attributes.df_attr_54.label.expireDate'));
        if(!target){
            return '请选择有效期-上线后可用时间';
        }
        target = data ? dataAPI.findAttr('df_attr_11', data).attrValue : dataAPI.get('attributes.df_attr_11');
        if(!target || !+target.useDay && (!target.weekday && !target.startDate)){
            return '请选择有效期-不可用日期';
        }
        //自动延期
    });
    $(node).on('tap', function(){
        if(!editable){return;}
        func.show();   
    });

    $('#validitySave').on('tap', function(){
        var data = {
            attributes : dataTrans.to(nodeContent.getValue())
        };
        if(dataAPI.validate('validity', [data])){return;}

        dataAPI.save(data, function(){
                //succ
                cont.hide();
                func.toggle();
            }, function(msg){
                //err
            });
    });
    return {
        show : func.show
    }
}