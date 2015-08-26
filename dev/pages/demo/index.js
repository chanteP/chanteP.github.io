core.register('demo', function($){
    return {
        init : function(){
            console.info('init');
            callDrawer.addEventListener('click', function(e){
                var drawer = new require('../../common/components/drawer');
                drawer.node.innerHTML = '123123123';
                drawer.show();
            });
            callDialog.addEventListener('click', function(e){
                var dialog = new require('../../common/components/dialog');
                dialog.show();
            });
        },
        show : function(){
        },
        hide : function(){
        }
    };
});