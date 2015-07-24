var template = require('./template.html'),
    style = require('./style.scss');
var drawer = require('../../../../common/animator/drawer'),
    mask = require('../../../../common/components/mask'),
    dialog = require('../../../../common/components/dialog');
var base = require('../../../../lib/base');

var io = require('../io');
var dataAPI;

var render = require('./render.jsx'),
    renderIns;

var cont = drawer(template);

var poiData;

base.insertStyle(style);

var func = {
    render : function(list, newId){
        var value = dataAPI.get('pois') || [],
            valueMap = {},
            valueIdMap = {};
        var renderList = [],
            rsValue = [];

        var defaultShow = dataAPI.get('show'),
            defaultVerifiable = dataAPI.get('verifiable');

        //先创建一个最终值
        value.forEach(function(item){
            defaultShow && (item.show = item.show === null ? 1 : item.show);
            defaultVerifiable && (item.verifiable = item.verifiable === null ? 0 : item.verifiable);
            rsValue.push(item);
            valueMap[+item.id] = 1;
            valueIdMap[+item.id] = item;
        });

        //展示列表
        list.forEach(function(item){
            //。。。
            if(defaultShow){
                if(valueMap[+item.id]){
                    item.show = valueIdMap[+item.id].show;
                }
                item.show = item.show === null ? 1 : item.show;
            }
            if(defaultVerifiable){
                if(valueMap[+item.id]){
                    item.verifiable = valueIdMap[+item.id].verifiable;
                }
                item.verifiable = item.verifiable === null ? 0 : item.verifiable;
            }
            //TODO 优化...newId若干年后还会是数组
            if(+item.id === +newId && !valueMap[+item.id]){
                valueMap[+item.id] = 1;
                value.push(item);
                rsValue.push(item);
            }
            renderList[(+item.id in valueMap) ? 'unshift' : 'push'](item);
        });
        renderIns = render($('[data-node="poiList"]', cont.node)[0], renderList, rsValue, {
            show : defaultShow,
            verifiable : defaultVerifiable
        });
    },
    saveCheck : function(){
        var show = dataAPI.get('show'),
            verifiable = dataAPI.get('verifiable');

        var value = [].concat(renderIns.getValue() || []);

        value = value.map(function(item){
            var rs = {
                id : item.id + '',
                name : item.name
            }
            show && (rs['show'] = item.show + '');
            verifiable && (rs['verifiable'] = item.verifiable + '');
            return rs;
        });
        return value;
    },
    show : function(id){
        cont.show({
            title : '门店选择'
        });
        var url = '/poi/available.json?' + [
            ((id && typeof id === 'string') ? 'poiId=' + id : ''),
            'pageSize=500'
        ].join('&');
        if(!poiData){
            mask.show(999, '门店加载中...');
            // cont.block = true;
            io.get(url, {
                    dealId : dataAPI.get('dealId')
                }, function(data){
                    // cont.block = false;
                    poiData = data;
                    mask.hide();
                    func.render(data, id);
                }, function(){
                    // cont.block = false;
                    mask.hide();
                    dialog().show({
                        type : 'error',
                        content : '数据请求失败'
                    }, true);
                });
        }else{
            func.render(poiData);
        }
    }
}
module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;

    //回填main
    dataAPI.sync('pois', function(pois){
        dataAPI.checkToggle('poi', dataAPI.get('pois.0'), function(valueCont){
            valueCont.innerHTML = [
                '<span class="poi-count">共支持 '+(dataAPI.get('pois').length)+' 家</span>',
                '<span class="poi-info">'+(dataAPI.get('pois.0.name') || '')+'</span>'
            ].join('');
        });
    });
    //注册验证规则
    dataAPI.addValidate('poi', function(pois){
        var poiValue = pois ? pois : dataAPI.get('pois');
        var check = poiValue.length;
        var globalShow = dataAPI.get('show'),
            globalVerifiable = dataAPI.get('verifiable');
        if(!check){
            return '请选择门店';
        }
        if(globalShow && !poiValue.every(function(poi){
            return poi.show;
        })){
            return '至少选择一个可显示门店';
        }
        if(globalVerifiable && !poiValue.every(function(poi){
            return poi.verifiable;
        })){
            return '至少选择一个可验券门店';
        }
    });

    //################################################################################
    //ios审核前fix
    if(base.os === 'IOS' || !base.os){
        $('#newPoi')[0].parentNode.style.display = 'none';
        $('#newPoi')[0].parentNode.nextElementSibling.className = '';
    }
    //################################################################################

    if(!editable){return;}

    //打开poi页面
    $(node).on('tap', function(){
        func.show();
    });

    cont.on('hide', function(){
        if(!poiData){
            mask.hide();
        }
    });

    $('#newPoi').on('tap', function(){
        var value = func.saveCheck();
        var href = window.location.href.replace(/[\&]?newpoi\=[\d]+[\&]?/, '&');
        href = encodeURIComponent(href);
        if(!value || !value.length){
            window.location.href = 'merchant://webview/poi/add?webUrl='+href;
            return;
        }

        dataAPI.save({
                pois : value
            }, function(){
                dataAPI.set('pois', value);
                dataAPI.trigger('pois');
                window.location.href = 'merchant://webview/poi/add?webUrl='+href;
            }, function(){
                window.location.href = 'merchant://webview/poi/add?webUrl='+href;
            }, true);
    });

    $('#poiSave').on('tap', function(){
        var value = func.saveCheck();

        if(dataAPI.validate('poi', [value])){
            return ;
        }

        dataAPI.save({
                pois : value
            }, function(){
                cont.hide();
                dataAPI.set('pois', value);
                dataAPI.trigger('pois');
            }, function(){
            });
    });
    return {
        show : func.show
    }
}
