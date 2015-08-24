var base = require('../base');
var $ = require('np-kit');

var spaCore = require('./spa')($);
var nav = require('./nav')($);

$.listener(spaCore.Page).on('beforechange', function(uri, controller){
    nav.set(controller);
});

var core = {
    loadPage : spaCore.loadPage,
    register : spaCore.register,
    controllers : spaCore.controllers,
    pages : spaCore.pages,

    nav : nav
}
window.core  = core;
