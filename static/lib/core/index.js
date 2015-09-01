import base from '../base'
import kit from 'np-kit'

var $ = $.merge(kit, base, true);
$.debug = true;

import mod_spa from './spa'
import mod_nav from './nav'
import mod_background from './background'


var spa = mod_spa($);
var nav = mod_nav($);
var background = mod_background($);

$.listener(spa.Page).on('beforechange', (uri, controller) => {
    nav.set(controller);
});

window.alpha = $.merge($, {
    loadPage : spa.loadPage,
    register : spa.register,
    controllers : spa.controllers,
    pages : spa.pages,

    nav : nav
}, true);

export default alpha