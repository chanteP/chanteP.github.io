var uploader = require('../picUploader');
var uploaderCont, bannerUploader, imgNode;

var mask = require('../../../../common/components/mask');
var dialog = require('../../../../common/components/dialog');
var picview = require('../../../../common/components/picview');
var base = require('../../../../lib/base');

var dataAPI;
var edit;

var typeId = '10';

//上传
var func = {
    upload : function(file, callback){
        file = file[0];
        if(!file){return;}
        mask.show(8000, '图片上传中...');
        uploader(file, {
                dealId : dataAPI.get('dealId'),
                typeId : typeId
            }, function(data){
                // dataAPI.get('photos')['1'] = [data];
                // dataAPI.trigger(['photos']);
                func.fitViewData([data]);
                mask.hide();
                callback && callback(data);
            }, function(msg){
                mask.show(8000, msg || '上传失败', {touch:true});
            });
    },
    fitViewData : function(data){
        data.forEach(function(item){
            item.thumb = item.thumbnailUrl;
            item.src = item.sourceWidth < 800 ? item.sourceUrl : item.fullViewUrl;
        });
    },
    save : function(view){
        if(dataAPI.validate('picmin', [view.photoList])){
            return ;
        }
        var data = {photos : {}};
        data.photos[typeId] = view.photoList.map(function(item){
            return {
                id : item.id + ''
            }
        })

        dataAPI.save(data, function(){
                view.hide();
                dataAPI.set('photos.'+typeId, view.photoList);
                dataAPI.trigger('photos');
            }, function(){
            });
    },
    view : function(data){
        picview.show(data, null, {
            btnList : edit ? viewBtnList : [],
            max : 999,
            upload : edit,
            del : edit,
            gaevent : 'project/Uploadphoto',
            uploadCallback : function(files){
                func.upload(files, function(data){
                    picview.photoList.push(data);
                    picview.render(null, picview.photoList.length - 1);
                });
            },
            delCallback : function(index){
                dialog().show({
                    title : '',
                    content : '<div style="text-align:center;"><h2 style="font-size:18px;font-weight:700;">删除图片</h2><p style="font-size:15px;margin-top:14px;">确定删除图片？</p></div>',
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
                                picview.photoList.splice(index, 1);
                                picview.render();
                                this.hide()
                            }
                        }
                    ]
                });
            }
        });
    },
    show : function(){
        //展示预览
        var data = dataAPI.get('photos.'+typeId) || [];
        // if(!data){return;}
        func.fitViewData(data);
        func.view(data);
    }
}
var viewBtnList = [
    {
        text : '保存',
        callback : function(){
            func.save(this);    
        }
    }
];

module.exports = function(dataHandler, node, editable){
    dataAPI = dataHandler;
    edit = editable;

    //注册绑定属性
    dataAPI.sync('photos', function(data){
        dataAPI.checkToggle('photo', dataAPI.get('photos.'+typeId+'.length'), function(node){
            node.innerHTML = '<em>'+dataAPI.get('photos.'+typeId+'.length')+'</em>张';
        });
    });
    //注册验证规则
    dataAPI.addValidate('picmin', function(photoList){
        var check = photoList ? photoList.length : dataAPI.get('photos.'+typeId);
        if(!check){
            return '请上传服务详情图';
        }
    });
    //点击预览
    $(node).on('tap', func.show);
    return {
        show : func.show
    }
}
