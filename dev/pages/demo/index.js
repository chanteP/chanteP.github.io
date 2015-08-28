var Drawer = require('../../common/components/drawer'),
    Dialog = require('../../common/components/dialog');
core.register('demo', function($){
    return {
        init : function(){
            callDrawer.addEventListener('click', function(e){
                var drawer = new Drawer;
                drawer.setContent('123123123');
                drawer.show();
            });
        },
        show : function(){
        },
        hide : function(){
        }
    };
});