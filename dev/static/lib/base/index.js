window.$config = window.$config || {};
window.$data = window.$data || {};

import $ from 'np-kit'

var api = {};
[
    require('./config'),
    require('./errorControl'),
    require('./dom'),
    require('./componentHandler'),
    require('./fastclick'),
    require('./lazyload'),
    require('./pixelFix'),
    require('./ga')
].forEach(function(mod){
    $.merge(api, mod($), true);
});

export default api;

require('np-scrollp').bind();
