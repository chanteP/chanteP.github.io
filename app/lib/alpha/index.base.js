/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import $ from '../base'

// require('../promise');
$.promise = window.Promise;

[
].forEach($.add);

// if($.os === 'IOS' || $.os === 'Mac'){
//     require('../plugins/preventScroll').bind();
// }

var alpha = window.alpha = $

export default alpha