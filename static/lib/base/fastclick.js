export default ($) => {
    $.domReady(() => {
        // 安卓300ms延迟避免初始化fastclick
        // if(/Android/i.test(navigator.userAgent)){return;}
        if(window.FastClick && $config.env !== 'Mac'){
            window.FastClick.attach(document.body);
            document.body.classList.add('fastclick_outer');
        }
    })
}