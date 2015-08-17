var base = require('../base');
var $ = require('np-kit');

var spaCore = require('./spa')(base.componentHandler);

var core = {
    loadPage : spaCore.loadPage,
    register : spaCore.register
}
window.core  = core;
