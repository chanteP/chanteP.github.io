var setMeta = function(metaNode, content){
    if(!metaNode){return;}
    metaNode.content = content;
    metaNode.setAttribute('content', content);
}
var scaleRoot = function(os, scale){
    var meta = document.querySelector('meta[name="viewport"]');
    switch(os){
        case 'IOS' : 
            setMeta(meta, `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`);
            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
            break;
        case 'Android' :
            document.documentElement.style.zoom = scale*100 + '%';
            break;
        default : 
            // setMeta(meta, `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`);
            document.documentElement.style.zoom = scale*100 + '%';
    }
}
var setRootFontSize = function(rpx){
    document.documentElement.style.fontSize = rpx + 'px'
}
module.exports = function($){
    var pixelRatio = window.devicePixelRatio || 1;
    pixelRatio = pixelRatio | 0;

    switch (true){
        case require('../base').os === 'Android':
            pixelRatio = 1;break;
        case pixelRatio < 2:
            pixelRatio = 1;break;
        case 2 <= pixelRatio :
            pixelRatio = 2;break;
        default : 
            pixelRatio = 1;break;
    }

    var fontSize = 50 * pixelRatio,
        scale = 1/pixelRatio;
    setRootFontSize(fontSize);
    scaleRoot($.os, scale);
    var api = {
        pixelRatio : pixelRatio,
        font : fontSize,
        scale : scale,
        width : document.documentElement.clientWidth,
        height : document.documentElement.clientHeight
    }

    // alert(JSON.stringify(api))
    return api;
}