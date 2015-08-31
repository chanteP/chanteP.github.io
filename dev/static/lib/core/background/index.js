import NPCanvas from 'np-canvas'
import effect from './aqua2'
import $ from 'np-kit'

var npcStorage = [];

var initNPC = (canvasNode, cfg) => {
    var npc;
    npc = canvasNode.engine = new NPCanvas(canvasNode, $.merge({
        fitSize : true,
        pixelRatio : 1
    }, cfg, true));
    npc.width = ($.os === 'IOS' || $.os === 'Acdroid') ? 
        canvasNode.clientWidth : 
        canvasNode.clientWidth / 2;
    npc.height = npc.width / canvasNode.clientWidth * canvasNode.clientHeight;
    npcStorage.push(npc);
    return npc;
}

export default ($, core) => {
    $.domReady(() => {
        var canvas = $.findAll('[id^="canvas"]', $.find('#syscomp'));
        if(!canvas && !canvas.length){return;}
        
        effect && effect.init && effect.init(canvas, initNPC);
        effect.play();

        $.evt(document.body)
            .on('click', '[data-npc]', function(){
                if(this.dataset.npc === 'pause'){
                    npcStorage.forEach((npc) => npc.pause());
                    this.dataset.npc = 'play';
                }
                else if(this.dataset.npc === 'play'){
                    npcStorage.forEach((npc) => npc.play());
                    this.dataset.npc = 'pause';
                }
            });
        $.evt(window)
            .on('blur', function(){
                npcStorage.forEach((npc) => npc.pause());
            })
            .on('focus', function(){
                npcStorage.forEach((npc) => npc.play());
            });
            
        var battery = navigator.battery || navigator.webkitBattery;
        if (battery){
            battery.addEventListener("levelchange", (e) => {
                if(battery.level < .5){
                    effect && effect.stop && effect.stop();
                }
            });
        }
    });
    return effect;
};
