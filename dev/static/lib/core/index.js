var base = require('../base');
var $ = require('np-kit');

var spaCore = require('./spa')();

var core = {
    loadPage : spaCore.loadPage,
    register : spaCore.register,
    controllers : spaCore.controllers,
    pages : spaCore.pages
}
window.core  = core;
