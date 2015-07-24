window.parent.core.initPage(document, function(wrap, $, window){
    var npc, ball, group = [], PI2 = Math.PI * 2;


    return {
        showonce : function(){
            window.DataBind.scan($.find('footer', wrap));
        },
        show : function(){
        }
    }
});