export default ($) => {
    var api;
    $.domReady(() => {
        api.setLoading(false);
    });
    return api = {
        animate : function(node, type, callback, unique){
            node.classList.add('animated');
            node.classList.add(type);
            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';
            //var evt = 'webkitAnimationEnd';
            var func = function(e){
                if(e.target === node){
                    node.classList.remove('animated');
                    node.classList.remove(type);
                    // console.info('del', node, evt, callback);
                    node.removeEventListener(evt, func);
                    callback && callback(this);
                }
            }
            if(unique){
                if(node.bindAnimatedFunc){
                    node.removeEventListener(evt, node.bindAnimatedFunc);
                }
                node.bindAnimatedFunc = func;
            }
            // console.info('add', node, evt, callback);
            node.addEventListener(evt, func);
        },
        setLoading : (bool) => {
            document.body.classList[bool ? 'add' : 'remove']('loading');
        },
        //插入样式
        insertStyle : (css) => {
            // var styleNode = document.createElement('style');
            // styleNode.innerHTML = css;
            // document.head.appendChild(styleNode);
        }
    }
}
