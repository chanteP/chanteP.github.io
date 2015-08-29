module.exports = function($){
    var scrollTimer;
    var bindEvt = function(){
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function(){
            $.trigger(window, 'scrollend');
        }, 100);
    }
    var check = function(){
        setTimeout(function(){
            $.each($.findAll('[data-lazyload]:not(.lazyloading)'), function(node){
                var src = node.dataset.lazyload;
                if(!src){
                    return;
                }
                node.classList.add('lazyloading');
                $.load(src, '').onload = function(){
                    node.src = src;
                    node.classList.remove('lazyloading');
                    node.dataset.lazyload = '';
                }
            });
        }, 200);
    }
    window.addEventListener('mousewheel', bindEvt);

    window.addEventListener('click', check);
    window.addEventListener('scrollend', check);
    $.domReady(check);
}