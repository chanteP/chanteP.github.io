/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
window.$config = window.$config || {};
window.$data = window.$data || {};

import $ from './kit'

var api = $;

$.add = function(mod){
    $.merge(api, typeof mod === 'function' ? mod($) : mod, true);
};

$.add(require('./env'));
require('./config')($, ['os', 'env', 'deviceLevel', 'debug', 'devkit']);
$.add(require('./errorControl'));

export default api;
