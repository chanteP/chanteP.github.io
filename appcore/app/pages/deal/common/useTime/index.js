var template = require('./template.html');
var drawer = require('../../../../common/animator/drawer');
var Content = require('./render.jsx');
var document = global.document;

var style = require('./style.scss'),
    base = require('../../../../lib/base');
base.insertStyle(style);

var cont = drawer(template);

var dataAPI, nodeContent;

var func = {
    //主页面回填
    toggle : function(){
        dataAPI.checkToggle('usetime', dataAPI.get('attributes.df_attr_56.useTime'), function(node){
            node.innerHTML = +dataAPI.get('attributes.df_attr_56.useTime') ? '24小时可用' : '部分时间可用';
        });
    },
    render: function() {
        var node = document.getElementById('J-useTime-container');
        nodeContent = React.render(React.createElement(Content, dataTrans.from(), null), node);
    },
    fixTimeFromNumber : function(time){
        var minute = Math.floor((Math.ceil(time) - time) * 60),
            hour = Math.floor(time),
            prefix = hour >= 24 ? '次日' : '';

            minute = minute < 10 ? '0' + minute : '' + minute;
            hour = hour >= 24 ? hour - 24 : hour;
            hour = hour < 10 ? '0' + hour : '' + hour;
        return prefix + hour + ':' + minute;
    },
    fixTimeFromString : function(time){
        if(typeof time !== 'string'){return;}
        var match = /^(次日)?([\d]+):([\d]+)$/.exec(time);
        if(!match){return;}
        return (match[1] ? 24 : 0) + (+match[2] || 0) + +((+match[3] / 60).toFixed(2));
    },
    show : function(){
        cont.show({
            title : '消费时间'
        });
        func.render();
    }
};

var dataTrans = {
    from: function(){
        var timeRanges = [];
        var startTimes = dataAPI.get('attributes.df_attr_56.startDate'),
            endTimes = dataAPI.get('attributes.df_attr_56.endDate');
        startTimes = startTimes ? startTimes.split(',') : [];
        endTimes = endTimes ? endTimes.split(',') : [];
        startTimes.forEach(function(e, i){
            timeRanges.push({
                from : func.fixTimeFromString(startTimes[i]),
                to : func.fixTimeFromString(endTimes[i])
            });
        });
        return {
            useTime: {
                useTime : dataAPI.get('attributes.df_attr_56.useTime') || '1',
                timeRanges : timeRanges
            }
        };
    },
    to: function(data){
        return {
            attrCode : "df_attr_56",
            attrValue : {
                useTime : data.useTime,
                specialCondition : "",
                startDate : (data.timeRanges || []).map(function(item){
                    return func.fixTimeFromNumber(item.from);
                }).join(','),
                endDate : (data.timeRanges || []).map(function(item){
                    return func.fixTimeFromNumber(item.to);
                }).join(',')
            }
        }
    }
};

module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;

    dataAPI.onload(function(){
        func.toggle();
    });
    if(!editable){
        return;
    }

    dataAPI.onload(function(){
        func.render();
    });

    $(node).on('tap', function(){
        func.show();
    });

    dataAPI.addValidate('useTime', function(data){
        data = data || dataAPI.get('attributes.df_attr_56');
        if(!data || (!+data.useTime && !data.startDate)){
            return '请选择使用时间';
        }
    });
    $('#timeSave').on('tap', function(){
        var data = {
            attributes : [
                dataTrans.to(nodeContent.getValue())
            ]
        };
        if(dataAPI.validate('useTime', [data.attributes[0].attrValue])){return;}

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