module.exports = function($){
    $.domReady(function() {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        if(window.FastClick){
            window.FastClick.attach(document.body);
            document.body.classList.add('fastclick_outer');
        }
    })
}