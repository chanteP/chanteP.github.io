/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
module.exports = function($){
    var api;
    $.domReady(function(){
        api.setLoading(false);
    
        $.checkUIFixed();
    });

    return api = {
        isTouched : false,
        animate : function(node, type, callback){
            if($.deviceLevel <= 2){
                return setTimeout(callback, 0);
            }
            // setTimeout(() => {
            node.classList.add('animated');
            node.classList.add(type);
            var evt = 'AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd';

            node.addEventListener(evt, function ani(e){
                if(e.target === node){
                    node.classList.remove('animated');
                    node.classList.remove(type);
                    // console.info('del', node, evt, callback);
                    node.removeEventListener(evt, ani);
                    callback && callback(this);
                }
            });
            // }, 0);
        },
        setLoading : function(bool){
            document.body.classList[bool ? 'add' : 'remove']('loading');
        },
        checkUIFixed : function(){
            var selector = $config.UIFixedSelector || '.ui-fixed';
            [].forEach.call($.findAll(selector), function(el){
                document.body.appendChild(el);
            });
        }
    }
}
