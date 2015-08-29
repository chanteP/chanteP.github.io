module.exports = function($){
    $.domReady(function() {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        window.FastClick && window.FastClick.attach(document.body);
    })
}