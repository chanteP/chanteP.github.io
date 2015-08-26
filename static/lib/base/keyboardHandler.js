module.exports = function($){
    var lastTarget;
    window.document.addEventListener('click', function(e){
        var target = e.target;
        if(target === lastTarget){
            return;
        }
        //移除输入状态
        var tagName = target.tagName;
        if(tagName !== 'INPUT' && tagName !== 'TEXTAREA'){
            document.activeElement && document.activeElement.blur();
        }
        lastTarget = e.target;
    });
}