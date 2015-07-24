var uploader = require('../picUploader');

var mask = require('../../../../common/components/mask');
var dialog = require('../../../../common/components/dialog');
var picview = require('../../../../common/components/picview');
var base = require('../../../../lib/base');

var render = require('./render.jsx');

var style = require('./style.scss');
base.insertStyle(style);

var dataAPI;
var edit;

var nodes = [];

var func = {
    upload : function(typeId, file, callback){
        file = file[0];
        if(!file || !typeId){return;}
        mask.show(8000, '图片上传中...');
        uploader(file, {
                dealId : dataAPI.get('dealId'),
                typeId : typeId
            }, function(data){
                // dataAPI.get('photos')['1'] = [data];
                // dataAPI.trigger(['photos']);
                data.id += '';
                mask.hide();
                if(!dataAPI.get('photos.'+typeId)){
                    dataAPI.set('photos.'+typeId, []);
                }
                dataAPI.get('photos.'+typeId).push(data);
                dataAPI.trigger('photos');
                callback && callback(data);
            }, function(msg){
                mask.show(8000, msg || '上传失败', {touch:true});
            });
    },
    delConfirm : function(typeId, index, callback){
        dialog().show({
            title : '',
            content : '<div style="text-align:center;"><h2 style="font-size:.36rem;font-weight:700;">删除图片</h2><p style="font-size:.3rem;margin-top:.28rem;">确定删除图片？</p></div>',
            button : [
                {
                    text : '取消', 
                    callback : function(){
                        this.hide()
                    }
                },
                {
                    text : '确定', 
                    style : 'active',
                    callback : function(){
                        dataAPI.get('photos.'+typeId).splice(index, 1);
                        dataAPI.trigger('photos');
                        this.hide();
                        callback && callback();
                    }
                }
            ]
        });
    },
    fitViewData : function(data){
        return (data || []).map(function(item){
            item.thumb = item.thumbnailUrl;
            item.src = item.sourceWidth < 800 ? item.sourceUrl : item.fullViewUrl;
            return item;
        });
    },
    view : function(typeId, i){
        var data = func.fitViewData(dataAPI.get('photos.'+typeId));
        var config = func.getTypeIdConfig(typeId);
        picview.show(data, +i, {
            btnList : edit ? btnList : [],
            max : config.max,
            upload : edit,
            del : edit,
            gaevent : '/project/edit/uploadPic',
            extra : {
                typeId : typeId
            },
            uploadCallback : function(files){
                func.upload(typeId, files, function(data){
                    picview.photoList = func.fitViewData(dataAPI.get('photos.'+typeId));
                    picview.render();
                });
            },
            delCallback : function(index){
                func.delConfirm(typeId, index, function(){
                    picview.photoList = func.fitViewData(dataAPI.get('photos.'+typeId));
                    picview.render();
                });
            }
        });
    },
    getTypeIdConfig : function(typeId){
        var photoConfigs = dataAPI.get('photoTypes') || [];
        var typeConfig = photoConfigs.filter(function(typeInfo){
            return +typeInfo.id === +typeId; 
        })[0] || {};
        return {
            typeId : typeId,
            max : typeConfig.maxNumber || 1,
            name : typeConfig.name || '',
            upload : edit,
            del : edit
        }
    },
    render : function(node, typeId){
        typeId = typeId || node.getAttribute('data-photocontent');
        if(!typeId){return;}
        var data = dataAPI.get('photos.' + typeId) || [];

        var config = func.getTypeIdConfig(typeId);
        render(node, data || [], config);
    }
}
var btnList = [
    {
        text : '替换<input type="file" class="hidden" data-node="replaceNode" />',
        callback : function(){

        }
    },
    {
        text : '删除',
        callback : function(){
            if(!this.photoList[this.current]){return;}
            var typeId = this.config.extra.typeId;
            func.delConfirm(typeId, this.current, function(){
                picview.photoList = func.fitViewData(dataAPI.get('photos.'+typeId));
                picview.render();
            });
            // this.photoList.
        }
    }
];

module.exports = function(dataHandler, nodeList, editable){
    dataAPI = dataHandler;
    edit = editable;

    //注册绑定属性
    dataAPI.sync('photos', function(){
        [].forEach.call(nodeList, function(content){
            func.render(content);
        });
    });
    dataAPI.onload(function(){
        //hehe
        var photos = dataAPI.get('photos');
        for(var key in photos){
            if(photos.hasOwnProperty(key) && Array.isArray(photos[key])){
                photos[key].forEach(function(item){
                    item.id += '';
                });
            }
        }
    });

    //预览替换
    $(picview.node).on('change', '[data-node="replaceNode"]', function(){
        var replaceIndex = picview.current,
            typeId = picview.config.extra.typeId;

        func.upload(typeId, this.files, function(data){
            var data = dataAPI.get('photos.'+typeId);
            data.splice(replaceIndex, 1, data.pop());
            picview.photoList = func.fitViewData(dataAPI.get('photos.'+typeId));
            picview.render();
            dataAPI.trigger('photos');
            picview.hide();
        });
    });

    dataAPI.trigger('photos');

    [].forEach.call(nodeList, function(node){
        var typeId = node.getAttribute('data-photocontent');

        //点击预览
        $(node).on('tap', 'img', function(){
            //展示预览
            var index = this.getAttribute('data-value');
            func.view(typeId, index);
        });
        $(node).on('tap', '.form-item-title', function(){
            var config = func.getTypeIdConfig(typeId);
            dialog().show({
                title : '',
                content : '必填，最多不能超过' + config.max + '张',
                button : [{
                    text : '确定',
                    style : 'active',
                    callback : function(){
                        this.hide();
                    }
                }]
            });
        });

        $(node).on('change', 'input[type="file"]', function(){
            if(!editable){return;}
            var self = this;
            func.upload(typeId, this.files, function(){
                self.value = '';
            });
        });
        $(node).on('tap', '[data-act="del"]', function(){
            if(!editable){return;}
            func.delConfirm(typeId, this.getAttribute('data-value'));
        });
    });
}