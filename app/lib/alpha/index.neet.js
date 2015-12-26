import $ from '../base'

// require('../promise');
$.promise = window.Promise;

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


var alpha = window.alpha = $

export default alpha