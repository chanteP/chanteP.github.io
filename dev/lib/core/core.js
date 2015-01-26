require('./errorReport');
if(!('defineProperty' in Object)){
    alert('Modern Browser Only!!!');
}
var $ = require('./kit');
window._config = require('./config');
window.DataBind = require('np-databind');
window.$ = $;
window.core = require('./spa');

require('./nav');
require('./bg');
module.exports = $;
