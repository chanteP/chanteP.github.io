export default function($){
    var scrollTimer;
    var bindEvt = function(){
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function(){
            $.trigger(window, 'scrollend');
        }, 200);
    }
    var check = function(){
        setTimeout(function(){
            var docHeight = document.documentElement.clientHeight;
            $.each($.findAll('[data-lazyload]:not(.lazyloading)'), (node) => {
                var src = node.dataset.lazyload;
                if(!src || !node.scrollHeight){
                    return;
                }
                var top = node.getBoundingClientRect().top;
                if(top < -20 || top > docHeight){
                    return;
                }
                node.classList.add('lazyloading');
                $.load(src, '').onload = function(){
                    node.src = src;
                    node.classList.remove('lazyloading');
                    node.dataset.lazyload = '';
                }
            });
        }, 500);
    }
    window.addEventListener('scroll', bindEvt, true);

    window.addEventListener('click', check, true);
    window.addEventListener('scrollend', check);
    window.addEventListener('load', check);
}