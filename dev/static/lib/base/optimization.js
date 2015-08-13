/*
    杂七杂八的优化项
*/
module.exports = function(){
    window.document.addEventListener('touchstart', function(e){
        //移除输入状态
        var tagName = e.touches[0].target && e.touches[0].target.tagName;
        if(tagName !== 'INPUT' && tagName !== 'TEXTAREA'){
            document.activeElement && document.activeElement.blur();
        }
    });

    window.document.addEventListener('DOMContentLoaded', function() {
        //安卓300ms延迟避免初始化fastclick
        if(/Android/i.test(navigator.userAgent)){return;}
        window.FastClick && window.FastClick.attach(document.body);
    }, false);
}