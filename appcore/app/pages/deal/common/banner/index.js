var uploader = require('../picUploader');

var mask = require('../../../../common/components/mask');
var dialog = require('../../../../common/components/dialog');
var picview = require('../../../../common/components/picview');
var base = require('../../../../lib/base');

var style = require('./style.scss');
base.insertStyle(style);

var dataAPI;
var edit;

var uploaderCont, bannerUploader, imgNode;

//上传
var upload = function(file, callback){
    file = file[0];
    if(!file){return;}
    mask.show(8000, '图片上传中...');
    uploader(file, {
            dealId : dataAPI.get('dealId'),
            typeId : '1'
        }, function(data){
            // dataAPI.get('photos')['1'] = [data];
            // dataAPI.trigger(['photos']);
            func.fitViewData([data]);
            mask.hide();
            callback && callback(data);
        }, function(msg){
            mask.show(8000, msg || '上传失败', {touch:true});
        });
}
var func = {
    fitViewData : function(data){
        data.forEach(function(item){
            item.thumb = item.thumbnailUrl;
            item.src = item.sourceWidth < 800 ? item.sourceUrl : item.fullViewUrl;
        });
    },
    save : function(view){
        if(dataAPI.validate('banner', [view.photoList])){
            return ;
        }

        var data = view.photoList.map(function(item){
            return {
                id : item.id + ''
            }
        });

        dataAPI.save({
                photos : {
                    '1' : data
                }
            }, function(){
                view.hide();
                dataAPI.set('photos.1', view.photoList);
                dataAPI.trigger('photos');
            }, function(){
            });
    },
    view : function(data){
        picview.show(data, null, {
            btnList : edit ? btnList : [],
            max : 1,
            upload : edit,
            del : edit,
            gaevent : 'project/Uploadphoto',
            uploadCallback : function(files){
                upload(files, function(data){
                    picview.photoList.push(data);
                    picview.render();
                });
            },
            delCallback : function(index){
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
                                picview.photoList.splice(index, 1);
                                picview.render();
                                this.hide();
                            }
                        }
                    ]
                });
            }
        });
    },
    show : function(){
        var data = dataAPI.get('photos.1') || [];
        func.fitViewData(data);
        func.view(data);
    }
}
var btnList = [
    {
        text : '保存',
        callback : function(){
            func.save(this);    
        }
    }
];

module.exports = function(dataHandler, node, editable){
    uploaderCont = $('[data-node="uploaderCont"]', node)[0];
    bannerUploader = $('[data-node="bannerUploader"]', node)[0];
    imgNode = $('[data-node="bannerView"]', node)[0];

    dataAPI = dataHandler;
    edit = editable;

    //注册绑定属性
    dataAPI.sync('photos', function(data){
        if(data && data['1'] && data['1'][0]){
            // imgNode.src = data['1'][0].thumbnailUrl;
            imgNode.style.display = '';
            imgNode.style.backgroundImage = 'url("' + (data['1'][0].sourceWidth < 800 ? data['1'][0].sourceUrl : data['1'][0].fullViewUrl) + '")';
            uploaderCont.style.display = 'none';
        }
        else{
            imgNode.style.display = 'none';
            imgNode.style.backgroundImage = '';
            uploaderCont.style.display = '';
        }
    });


    if(!editable){
        $(bannerUploader).prop('disabled', true);
        return;
    }

    dataAPI.addValidate('banner', function(photoList){
        var check = photoList ? photoList.length : dataAPI.get('photos.1');
        if(!check){
            return '请上传手机首图';
        }
    });

    $(bannerUploader).on('change', function(){
        if(!editable){return;}
        upload(this.files, function(data){
            func.view([data]);   
        });
        // this.value = '';
    });
    //点击预览
    $(imgNode).on('tap', function(){
        //展示预览
        if(!dataAPI.get('photos.1')){return;}
        func.show();
    });
    return {
        show : func.show
    }
}
