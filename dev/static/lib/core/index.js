var base = require('../base');
var $ = require('np-kit');

var spaCore = require('./spa')($, base);
var nav = require('./nav')($, base);
var background = require('./background')($, base);

$.listener(spaCore.Page).on('beforechange', function(uri, controller){
    nav.set(controller);
});

module.exports = window.core = $.merge(base, {
    loadPage : spaCore.loadPage,
    register : spaCore.register,
    controllers : spaCore.controllers,
    pages : spaCore.pages,

    nav : nav
}, true);
