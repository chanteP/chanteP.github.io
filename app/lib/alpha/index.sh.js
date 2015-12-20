/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import $ from '../base'

$.promise = window.Promise;

require('../mtnb_common');
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

$.domReady(() => {
    if($.env === 'APP'){
        $.app.close = function(){
            window.location.href = 'merchant://webview?action=back';
        }
    }
    setTimeout(() => {
        if($.env === 'APP'){
            window.webviewBack = function(){
                if($.components.stack.length > 0){
                    window.history.go(-1);
                }
                else{
                    $.app.close();
                }
            }
            window.location = "merchant://webview?customBack=webviewBack";
        }
    }, 1000);
});

$.getStaticResource = function(uri){
    return $config.staticHost + uri;
}
var alpha = window.alpha = $

export default alpha