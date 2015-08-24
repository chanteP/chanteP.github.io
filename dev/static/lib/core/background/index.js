var $ = require('../kit');
var NPCanvas = require('np-canvas');
var core = require('../spa');
// var effect = $.isMobileMode && require('./Aqua');
var effect = require('./Aqua');
var databind = require('np-databind');
var npc;

var fitPage = function(page, prePage){
    if(!page){return;}
    if((page === 'index') ^ (prePage === 'index')){
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var canvas = $.find('#npc');
    if(!canvas){return;}
    npc = canvas.engine = new NPCanvas(canvas, {
        autoFit : true,
        pixelRatio : window.devicePixelRatio
    });
    effect && effect.init(npc);
    npc.play();
    core.onPageChange(fitPage);

    new DataBind('style', effect ? effect.name : 'prototype');
    $.evt(document.body, $.isMobileMode && {})
        .on($.isMobileMode ? 'tap' : 'click', '[data-npc]', function(){
            if(this.dataset.npc === 'pause'){
                npc.pause();
                this.dataset.npc = 'play';
            }
            else if(this.dataset.npc === 'play'){
                npc.play();
                this.dataset.npc = 'pause';
            }
        });
});

module.exports = npc;
