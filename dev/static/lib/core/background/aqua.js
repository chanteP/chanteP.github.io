var npc;

var water;
var contWidth, contHeight, R;

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

var mainColor = 177,
// var mainColor = 330,
    color_lite = 'hsl('+mainColor+', 61.23%, 90%)',
    color_base = 'hsl('+mainColor+', 61.23%, 72%)',
    color_deep = 'hsl('+(mainColor+5)+', 71.23%, 60%)',
    color_border = 'hsl('+mainColor+', 51.23%, 50%)'
    ;
var defaultFill = 0.5;
var toArc = (deg) => {
    return deg * 2 * PI / 360;
}
var toDeg = (arc) => {
    return arc / 2 / PI * 360;
}

var initWater = () => {
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight, 2) + pow(contWidth, 2));

    //TODO优化
    var gradient = npc.ctx.createLinearGradient(0, 0, 0, contHeight);
    gradient.addColorStop(0, color_lite);
    gradient.addColorStop(0.5, color_base);
    gradient.addColorStop(1, color_deep);


    water = npc.create(.5 * contWidth, .5 * contHeight, function(ctx, fps){
        //speed +-[0, 10]
        this.rotateSpeed = this.rotateSpeed + (this.targetRotate - this.rotate) / fps;
        this.rotateSpeed *= .97;
        this.rotate += this.rotateSpeed;
        ctx.rotate(toArc(this.rotate));

        this.fill += (this.targetFill - this.fill) / fps;
        let deltaH = R - 2 * R * this.fill;
        let rsDeg = asin(deltaH / R);

        ctx.beginPath();
        ctx.arc(0, 0, R, PI - rsDeg, rsDeg, true);
        
        this.timer++;

        // document.getElementsByTagName('h1')[0] && (document.getElementsByTagName('h1')[0].innerHTML = 
        //     [deltaH].map((n)=>n.toFixed(2))
        // );
        var px = (0) | 0, 
            py = (deltaH) | 0;

        // var arcTime, wave;
        // arcTime = sin(toArc(this.timer));
        // wave = (arcTime * min(100, R - abs(py))) | 0;
        // ctx.moveTo(px, py);
        // ctx.bezierCurveTo(0, py + wave, 0, py - wave, -px, py);
        // ctx.strokeStyle = color_border;
        // ctx.lineWidth = 2;
        // ctx.stroke();

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        // ctx.strokeStyle = '#000';
        // ctx.strokeRect(px, py, 4, 4);
    });
    water.timer = 0;
    water.rotate = 0;
    water.rotateSpeed = 0;
    water.fill = defaultFill;
    setWater(0, defaultFill);
    npc.add(water);
}

var setWater = (rotate, fill) => {
    rotate = rotate === null ? water.targetRotate : rotate;
    water.rotate = water.rotate % 360;
    
    rotate = -rotate % 360;

    water.targetRotate = rotate + (
        rotate > 180 ? -360 : 
        rotate < -180 ? +360 : 
        0);

    water.targetFill = fill;
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
    init : (engine) => {
        npc = engine;
        initWater();
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
