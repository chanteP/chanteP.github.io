import base from '../base'
import $ from 'np-kit'
$.debug = true

import mod_spa from './spa'
import mod_nav from './nav'
import mod_background from './background'


var spa = mod_spa($, base);
var nav = mod_nav($, base);
var background = mod_background($, base);

$.listener(spa.Page).on('beforechange', (uri, controller) => {
    nav.set(controller);
});


window.alpha = $.merge($, base, {
    loadPage : spa.loadPage,
    register : spa.register,
    controllers : spa.controllers,
    pages : spa.pages,

    nav : nav
}, true);

export default alpha