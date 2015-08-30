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
        npc.width = Math.min(canvas.clientWidth, 1000);
        npc.height = npc.width / canvas.clientWidth * canvas.clientHeight;

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
            
        var battery = navigator.battery || navigator.webkitBattery;
        if (battery) {
            battery.addEventListener("levelchange", (e) => {
                if(battery.level < .5){
                    npc.stop();
                }
            });
        }
    });
    return npc;
};
