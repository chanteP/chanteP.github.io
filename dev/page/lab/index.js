window.parent.core.initPage(document, function(wrap, $, window){
    var D = window.DataBind;
    var api = window._config.apiHost + '/api/getLabData.php';

    var vm = {
        data : null
    };
    var init = function(){
        $.io.get(api, {
            onSuccess : function(data){
                vm.data = data.data;
            }
        });
        new D('lab', vm);
    }
    init();
    return {
        init : function(){
        },
        showonce : function(){
            D.scan(wrap);
            $.lazyload($.find('#wrapper'), wrap, 'data-lazy', function(el, src){
                el.src = src;
            });
        }
    }
});