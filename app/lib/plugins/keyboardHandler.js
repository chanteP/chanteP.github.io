/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
export default ($) => {
    var lastTarget;
    var api = {
        keyboard : {
            hide : function(){
                document.activeElement && document.activeElement.blur && document.activeElement.blur();
            }
        }
    };
    window.document.addEventListener('click', (e) => {
        var target = e.target;
        if(target === lastTarget){
            return;
        }
        //移除输入状态
        var tagName = target.tagName;
        if(tagName !== 'INPUT' && tagName !== 'TEXTAREA'){
            api.keyboard.hide();
        }
        lastTarget = e.target;
    });
    return api;
}