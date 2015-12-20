/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
module.exports = function($){
    $.domReady(function() {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        if(window.FastClick && $.os !== 'Mac'){
            window.FastClick.attach(document.body);
            document.body.classList.add('fastclick_outer');
        }
    })
}