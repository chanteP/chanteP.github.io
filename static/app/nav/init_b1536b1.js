define('nav', function(require, exports){
    var spa = require('spa');

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
        if(spa.page == pageName){
            check(pageName);
        }
    }
    var check = function(value){
        console.log(123)
        var mode = regCan[value];
        if(!mode || mode === removeMarker){
            node.dataset[dataMarker] = null;
        }
        else{
            node.dataset[dataMarker] = mode;
        }
    }
    var init = function(){
        spa.ob('page', check);
    }
    init();
    exports.reg = registerNav;
});