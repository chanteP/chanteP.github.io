if(!('defineProperty' in Object)){
    alert('如果\n你能换个高级浏览器的话\n或许生活会更美好');
}
var $ = require('./kit');
window._config = require('./config');
window.DataBind = require('np-databind');
window.$ = $;
window.core = require('./spa/init');

require('./nav/init');

module.exports = $;