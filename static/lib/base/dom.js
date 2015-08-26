module.exports = function($){
    var api;
    $.domReady(function(){
        api.setLoading(false);
    });
    return api = {
        animate : function(node, type, callback){
            node.classList.add('animated');
            node.classList.add(type);
            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';
            //var evt = 'webkitAnimationEnd';
            node.addEventListener(evt, function(e){
                if(e.target === node){
                    node.classList.remove('animated');
                    node.classList.remove(type);
                    node.removeEventListener(evt, arguments.callee);
                    callback && callback(this);
                }
            });
        },
        setLoading : function(bool){
            document.body.classList[bool ? 'add' : 'remove']('loading');
        },
        //插入样式
        insertStyle : function(css){
            var styleNode = document.createElement('style');
            styleNode.innerHTML = css;
            document.head.appendChild(styleNode);
        }
    }
}
