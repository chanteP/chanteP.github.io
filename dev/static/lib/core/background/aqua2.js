var npcLayers;

var water = [];

var tan = Math.tan, 
    cos = Math.cos,
    acos = Math.acos,
    sin = Math.sin,
    asin = Math.asin,
    PI = Math.PI, 
    abs = Math.abs,
    sqrt = Math.sqrt,
    pow = Math.pow,
    max = Math.max,
    min = Math.min,
    log = Math.log,
    random = Math.random,
    sign = Math.sign;

var PId180 = PI / 180,
    PIbd180 = 180 / PI;

var g = 9.8;

var defaultFill = 0;
var rotateSpeedShrink = .95;
var wavePointAbs = 52;


var toArc = (deg) => {
    return deg * PId180;
}
var toDeg = (arc) => {
    return arc * PIbd180;
}
var createGradient = function(npc, height, color){

    var mainColor = color,
    // var mainColor = 330,
        colorLite = 'hsla('+mainColor+', 61.23%, 90%, .8)',
        colorBase = 'hsl('+mainColor+', 61.23%, 72%)',
        colorDeep = 'hsl('+(mainColor+5)+', 71.23%, 60%)',
        colorBorder = 'hsl('+mainColor+', 51.23%, 50%)'
        ;

    var gradient = npc.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colorLite);
    gradient.addColorStop(0.5, colorBase);
    gradient.addColorStop(1, colorDeep);
    return {gradient, color, colorBorder};
}

var initWater = (npc, index) => {
    var contWidth, contHeight, R, r;
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight, 2) + pow(contWidth, 2));
    r = R / 2;

    var step = R / wavePointAbs,
    stepWidth = R / step;
    var timerStep = index ? 2 : 1.5;

    var {gradient, color, colorBorder} = createGradient(npc, R, index ? 177 : 200);

    var w = npc.create(contWidth / 2, contHeight / 2, function(ctx, fps){
        this.rotateSpeed = (this.rotateSpeed + (this.targetRotate - this.rotate) / fps) * rotateSpeedShrink;

        this.rotate += this.rotateSpeed;
        ctx.rotate(toArc(this.rotate));

        this.fill += (this.targetFill - this.fill) / fps;

        this.timer += timerStep;

        ctx.beginPath();

        let curH = R * this.fill;

        //delta
        if(this.fill > 0){
            curH = curH * (index ? -1 : 1) + sin(toArc(this.timer)) * 10;
        }
        //sync
        else{
            curH = curH + sin(toArc(this.timer)) * 18 - (this.rotateSpeed * 10);
        }

        ctx.moveTo(-r, curH);
        for(let i = 0, j = step; i <= j; i++){
            ctx.lineTo(
                (-r + i * stepWidth) | 0, 
                (curH + sin(toArc(i * wavePointAbs + this.timer)) * (10 - abs(this.rotateSpeed))) | 0
            );
        }
        // document.getElementsByTagName('h1')[0] && (document.getElementsByTagName('h1')[0].innerHTML = this.fill.toFixed(2))
        
        ctx.lineTo(R, r);
        ctx.lineTo(-r, r);
        ctx.lineTo(-r, curH);

        ctx.strokeStyle = colorBorder;
        ctx.fillStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    });

    water.push(w);

    w.canvas = npc.canvas;
    w.timer = 0;
    w.rotate = 0;
    w.rotateSpeed = 0;
    w.fill = defaultFill;
    npc.add(w);
}

var setWater = (rotate, fill) => {
    fill = fill * 1.5;
    water.forEach((w) => {
        let r = rotate === null ? w.targetRotate : rotate;
        w.rotate = w.rotate % 360;
        
        r = -r % 360;

        w.targetRotate = r + (
            r > 180 ? -360 : 
            r < -180 ? +360 : 
            0);

        w.targetFill = fill;
    });
}
var calcHorizon = ({x, y, z}) => {
    var g1 = sqrt(pow(x, 2) + pow(y, 2));

    // var rotate = acos(y / g1) * 360 / 2 / PI;
    var rotate = acos(y / g1) * PIbd180;
    // var fill = z < 0 ? g1 / 2 / g : (2 * g - g1) / 2 / g;
    var fill = z < 0 ? 
        g1 / 2 / g : 
        1 - g1 / 2 / g;
    fill = asin(fill * 2 - 1) / 2 / asin(1);

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    // fill = max(80, min(fill, 180));
    return {rotate, fill};
}

var api = {
    name : 'Aqua',

    lock : true,
    init : (canvasNodes, initFunc) => {
        npcLayers = [].map.call(canvasNodes, (node, index) => {
            var npc = initFunc(node);
            return npc;
        });
        npcLayers.forEach((npc, index) => {
            initWater(npc, index);
        });

        var counter = 0;
        if (window.DeviceOrientationEvent) {
            window.addEventListener('devicemotion', (e) => {
                if(counter++ > 3){
                    counter = 0;
                    if(api.lock){return;}
                    var {rotate, fill} = calcHorizon(e.accelerationIncludingGravity);
                    setWater(rotate, fill);
                }
            });
    　　}
    },
    play : () => {
        api.lock = false;
        setWater(0, defaultFill);
        npcLayers.forEach((npc) => npc.play());
    },
    stop : () => {
        api.lock = true;
        setWater(0, 1);

        clearTimeout(api.stopTimer);
        api.stopTimer = setTimeout(function(){
            npcLayers.forEach((npc) => npc.stop());
        }, 5000);
    }
}
export default api;