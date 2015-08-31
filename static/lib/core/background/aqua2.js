

var npcLayers;

var water = [];
var contWidth, contHeight, R, r;

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

var g = 9.8;

var defaultFill = 0.5;
var toArc = (deg) => {
    return deg * 2 * PI / 360;
}
var toDeg = (arc) => {
    return arc / 2 / PI * 360;
}
var createGradient = function(npc, height, color){

    var mainColor = color || 177,
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
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight, 2) + pow(contWidth, 2));
    r = R / 2;

    var {gradient, color, colorBorder} = createGradient(npc, R, index ? 177 : 200);

    var w = npc.create(contWidth / 2, contHeight / 2, function(ctx, fps){
        //speed +-[0, 10]
        this.rotateSpeed = this.rotateSpeed + (this.targetRotate - this.rotate) / fps;
        this.rotateSpeed *= .9;
        this.rotate += this.rotateSpeed;
        ctx.rotate(toArc(this.rotate));

        this.fill += (this.targetFill - this.fill) / fps;
        let curH = R * (this.fill - 0.5);
        let wave = 20;
        this.timer += 1 + index / 2;

        ctx.beginPath();

        curH += sin(toArc(this.timer)) * 10;

        ctx.moveTo(-r, curH);
        let step = R * 1,
            stepWidth = R / step;
        for(let i = 0, j = step; i < j; i++){
            ctx.lineTo(-r + i * stepWidth, curH + sin(toArc(i + this.timer * 2) + index) * (window.wave || 6));
        }
        ctx.lineTo(R, r);
        ctx.lineTo(-r, r);
        ctx.lineTo(-r, curH);

        ctx.strokeStyle = colorBorder;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    });

    water.push(w);

    w.canvas = npc.canvas;
    w.timer = 0;
    w.rotate = 0;
    w.rotateSpeed = 0;
    w.fill = defaultFill;
    setWater(0, defaultFill, w);
    npc.add(w);
}

var setWater = (rotate, fill, w) => {
    w = w ? [w] : water;
    w.forEach((w) => {
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

    var rotate = acos(y / g1) * 360 / 2 / PI;
    var fill = (z < 0 ? g1 : 2 * g - g1) / 2 / g;
    fill = asin(fill * 2 - 1) / 2 / asin(1) + .5;

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    // fill = max(80, min(fill, 180));
    return {rotate, fill};
}

export default {
    init : (canvasNodes, initFunc) => {
        npcLayers = [].map.call(canvasNodes, (node, index) => {
            var npc = initFunc(node);
            npc.width /= 2;
            npc.height /= 2;
            return npc;
        });
        npcLayers.forEach((npc, index) => {
            initWater(npc, index);
            npc.play();
        });


        var lock = false;
        var counter = 0;
        if (window.DeviceOrientationEvent) {
            window.addEventListener('devicemotion', (e) => {
                if(counter++ > 3){
                    counter = 0;
                    if(lock){return;}
                    var {rotate, fill} = calcHorizon(e.accelerationIncludingGravity);
                    setWater(rotate, fill);
                }
            });
    　　}
    },
    name : 'Aqua'
}
