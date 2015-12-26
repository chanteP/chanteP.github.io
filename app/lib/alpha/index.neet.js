import $ from '../base'

// require('../promise');
$.promise = window.Promise;
$config.cos_gaAccount = 'UA-57857767-1';

[
    require('../plugins/deviceCheck'),
    require('../plugins/tween'),
    require('../plugins/history'),
    require('../plugins/componentHandler'),
    require('../plugins/keyboardHandler'),
    require('../plugins/dom'),
    require('../plugins/fastclick'),
    require('../plugins/ga'),
    require('../plugins/pixelFix'),
    require('../plugins/app'),
    require('../plugins/imgLazyload'),
    require('../plugins/spaLoader'),
    require('../plugins/nav'),
    require('../plugins/background')
].forEach($.add);

if($.os === 'IOS' || $.os === 'Mac'){
    require('../plugins/preventScroll').bind();
}

$.listener($.spa.Page).on('beforechange', (uri, controller) => {
    $.nav.set(controller);
});

setTimeout(() => {
    var i = new Image();
    i.src = 'http://4.neetproject.sinaapp.com/Homeajax?url=' + location.href;
}, 1000);


var alpha = window.alpha = $

export default alpha