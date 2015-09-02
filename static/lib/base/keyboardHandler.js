export default ($) => {
    var scrollTimer;
    var bindEvt = () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => $.trigger(window, 'scrollend'), 100);
    }
    var check = () => {
        return setTimeout(() => {
            $.each($.findAll('[data-lazyload]:not(.lazyloading)'), (node) => {
                var src = node.dataset.lazyload;
                if(!src){
                    return;
                }
                node.classList.add('lazyloading');
                $.load(src, '').onload = () => {
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