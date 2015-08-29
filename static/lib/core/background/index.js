var NPCanvas = require('np-canvas');
var effect = require('./aqua');
var npc;

module.exports = function($, core){
    $.domReady(function(){
        var canvas = $.find('#npc');
        if(!canvas){return;}
        npc = canvas.engine = new NPCanvas(canvas, {
            fitSize : true,
            pixelRatio : 1
        });
        effect && effect.init(npc);
        npc.play();

        $.evt(document.body)
            .on('click', '[data-npc]', function(){
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
    return npc;
};
