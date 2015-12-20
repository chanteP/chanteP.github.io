/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
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
    require('../plugins/app')
].forEach($.add);

if($.os === 'IOS' || $.os === 'Mac'){
    require('../plugins/preventScroll').bind();
}

var alpha = window.alpha = $

export default alpha