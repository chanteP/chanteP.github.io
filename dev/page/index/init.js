window.parent.core.initPage(document, function(wrap, $){
    var npc, ball, group = [], PI2 = Math.PI * 2;


    return {
        init : function(){
            DataBind.scan($.find('footer', wrap));
        },
        show : function(){
        }
    }
});