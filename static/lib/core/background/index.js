import NPCanvas from 'np-canvas'
import effect from './aqua'

var npc;

export default ($, core) => {
    $.domReady(() => {
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
