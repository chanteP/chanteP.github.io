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
        D.scan(wrap);
    }
    init();
    return {
        init : function(){
            $.lazyload($.find('#wrapper'), wrap, 'data-lazy');
        }
    }
});