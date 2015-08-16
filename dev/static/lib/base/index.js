window.$config = window.$config || {};
window.$data = window.$data || {};

var $ = require('np-kit');
var api = {};
[
    require('./errorControl'),
    require('./dom'),
    require('./componentHandler'),
    require('./fastclick'),
    require('./keyboardHandler'),
    require('./pixelFix'),
    require('./ga')
].forEach(function(mod){
    $.merge(api, mod($), true);
});

module.exports = api;

require('np-scrollp').bind();

$.domReady(function(){
    api.setLoading(false);
});

