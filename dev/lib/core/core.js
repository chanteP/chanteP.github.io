if(!('defineProperty' in Object)){
    alert('高级浏览器only!!!');
}
var $ = require('./kit');
window._config = require('./config');
window.DataBind = require('np-databind');
window.$ = $;
window.core = require('./spa/init');

require('./nav/init');
module.exports = $;