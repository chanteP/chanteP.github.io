/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
module.exports = function($){
    $.lazyload = function(wrapper, node, attr, callback, isLive){
        var lazyload = function(el, src, callback){
            el.setAttribute('lazy-loading', '1');
            var img = new Image();
            img.onload = function(){
                callback && callback(el, src);
                // el.src = this.src;
                el.removeAttribute('lazy-loading');
            }
            setTimeout(function(){
                img.src = src;
            }, 400);
        }
        if(arguments.length === 3){
            //纯加载回调 node, src, callback
            lazyload(wrapper, node, attr);
        }
        else{
            //滚动视口检测
            wrapper = wrapper || document.body;
            var hasLazyLoad = node.hasBindLazyLoad;
            node.hasBindLazyLoad = attr;
            var checkTimer;
            var timerCheck = function(){
                clearTimeout(checkTimer);
                checkTimer = setTimeout(check, 50);
                node.hasBindLazyLoad = false;
            }
            var check = function(){
                var list = $.findAll('['+attr+']', node);
                if(!list.length && !isLive){
                    wrapper.removeEventListener('scroll', timerCheck);
                    return;
                }
                var docHeight = document.documentElement.clientHeight;
                [].every.call(list, function(el){
                    var bd = el.getBoundingClientRect();
                    if(bd.top + el.clientHeight < 0){
                        return true;
                    }
                    else if(bd.top < docHeight){
                        lazyload(el, el.getAttribute(attr), callback);
                        el.removeAttribute(attr);
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            }
            !hasLazyLoad && wrapper.addEventListener('scroll', timerCheck);  
            check();
        }
    }
}