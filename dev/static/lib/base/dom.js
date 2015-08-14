module.exports = function($){
    return {
        animate : function(node, type, callback){
            node.classList.add('animated');
            node.classList.add(type);
            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';
            //var evt = 'webkitAnimationEnd';
            node.addEventListener(evt, listenerAnimate);

            function listenerAnimate(e){
                if(e.target === node){
                    node.classList.remove('animated');
                    node.classList.remove(type);
                    node.removeEventListener(evt, listenerAnimate);
                    callback && callback(this);
                }
            }
        },
        setLoading : function(bool, node){
            (node || document.body).classList[bool ? 'add' : 'remove']('loading');
        },
        //插入样式
        insertStyle : function(css){
            var styleNode = document.createElement('style');
            styleNode.innerHTML = css;
            document.head.appendChild(styleNode);
        }
    }
}