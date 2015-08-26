/*
    图片大图预览
    唯一
    改着改着不象人型了...TODO优化

    list : [
        {thumb, src}
        ...
    ]
*/
var core = require('../../core');
var style = require('./style.scss');
var tweenAni = require('../../../lib/tweenAni/tweenAni');

var render = require('./render.jsx')(core);

var node;
var ani;

core.insertStyle(style);
var buildNode = function(){
    node = document.createElement('div');
    node.className = 'm-picview';
    document.body.appendChild(node);

    $(node)
        .on('click', '[data-actid]', function(){
            var index = this.getAttribute('data-actid');
            api.btnList && api.btnList[index] && api.btnList[index].callback.call(api, api.current);
        })
        .on('click', '[data-act="select"]', function(){
            build(api.photoList, +this.getAttribute('data-value'), api.config);
        })
        .on('click', '[data-act="del"]', function(){
            if(!api.config.delCallback){return;}
            api.config.delCallback.call(api, this.parentNode.getAttribute('data-value'));
        })
        .on('change', '[data-node="uploader"]', function(){
            var files = this.files,
                fileNode = this;
            if(files.length && api.config.uploadCallback){
                api.config.uploadCallback.call(api, files, fileNode);
            }
            //异步重置。。不确定会不会有问题...callback里面不要异步获取file的话应该大丈夫
            setTimeout(function(){
                fileNode.value = '';
            }, 0);
        })
        .on('swipeLeft', '.view-main', function(){
            api.render(null, api.current + 1)
        })
        .on('swipeRight', '.view-main', function(){
            api.render(null, api.current - 1)
        })
        .on('load', '[data-node="showImg"]', function(){
            $('[data-node="imgCont"]', node).removeClass('loading');
        });
    return node;
}
var build = function(photoList, index, config){
    api.current = index;
    $('[data-node="imgCont"]', node).removeClass('loading');
    render(node, photoList, index, config);

    var target = $('[data-node="photoCont"] [data-value="'+index+'"]', node)[0];
    if(target){
        var scrollNode = $('[data-node="photoCont"]', node)[0].parentNode;
        setTimeout(function(){
            ani && ani.stop();
            ani = tweenAni({
                'type' : 'cubic-easeout',
                'begin': scrollNode.scrollLeft,
                'end'  : target ? target.offsetLeft : 0,
                'duration' : 600,
                'func' : function(num){
                    scrollNode.scrollLeft = num;
                },
            });
        }, 20);   
    }
    return node;
}

buildNode();
var api = module.exports = {
    node : node,
    current : null,
    isShown : false,
    photoList : [],
    btnList : [],
    config : null,
    show : function(photoList, index, config){
        if(this.isShown){return;}
        this.isShown = true;

        index = typeof index === 'number' ? index : 0;

        this.config = config = $.extend({
            max : 1,
            upload : true,
            del : true,
            btnList : [],
            gaevent : '',
            uploadCallback : null,
            delCallback : null,
            extra : {}
        }, config);

        this.photoList = photoList ? [].concat(photoList) : [];
        this.btnList = this.config.btnList;

        build(photoList, index, config);

        core.animate(this.node, 'fadeIn');
        core.componentHandler.push(this);
        this.node.setAttribute('data-onshow', '1');
        $(this).triggerHandler('show');
        return this;
    },
    render : function(photoList, index){
        build(photoList || api.photoList, typeof index === 'number' ? index : api.current, api.config);
        return this;
    },
    hide : function(){
        if(!this.isShown){return;}
        this.isShown = false;
        core.animate(this.node, 'fadeOut');
        core.componentHandler.remove(this);
        this.node.removeAttribute('data-onshow');
        $(this).triggerHandler('hide');
        return this;
    }
}