define('nav', function(require, exports){
    var spal = require('spal');

    var node = $.find('#nav');
    var removeMarker = 'hide', dataMarker = 'mode';
    var regCan = {};

    var registerNav = function(pageName, mode){
        mode = typeof mode === 'string' ? mode : 'show';
        if(mode){
            regCan[pageName] = mode;
        }
        else{
            delete regCan[pageName];
        }
    }
    var init = function(){
        spal.vm.ob('page', function(value){
            var mode = regCan[value];
            if(!mode || mode === removeMarker){
                node.dataset[dataMarker] = null;
            }
            else{
                node.dataset[dataMarker] = mode;
            }
        });
    }
    init();
    exports.reg = registerNav;
});