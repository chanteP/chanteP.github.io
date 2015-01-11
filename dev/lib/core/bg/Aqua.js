var npc;

var contWidth, contHeight, contPercent = .6, R;
var water;

var tan = Math.tan, 
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI, 
    abs = Math.abs,
    sqrt = Math.sqrt,
    pow = Math.pow,
    max = Math.max,
    min = Math.min,
    random = Math.random;

var mainColor = 177,
// var mainColor = 330,
    color_lite = 'hsl('+mainColor+', 61.23%, 90%)',
    color_base = 'hsl('+mainColor+', 61.23%, 72%)',
    color_deep = 'hsl('+(mainColor+5)+', 71.23%, 60%)'
    ;


var toArc = function(deg){
    return deg * 2 * PI / 360;
}

var initWater = function(){
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight/npc.pixelRatio, 2) + pow(contWidth/npc.pixelRatio, 2));

    water = npc.create(.5 * contWidth, .5 * contHeight, function(ctx, fps){
        this.rotate += this.targetRotateDis * 2 / fps;
        // this.rotate = this.targetRotate;
        this.deg += (this.targetDeg - this.deg) / fps;

        var arcTime = sin(toArc(this.timer++));

        var px = (R * sin(this.deg)) | 0, py = (R * cos(this.deg)) | 0;
        var wave = (arcTime * min(100, R - abs(py))) | 0;
        ctx.rotate(toArc(this.rotate));

        ctx.beginPath();

        ctx.arc(0, 0, R, PI / 2 + this.deg, PI / 2 - this.deg, true);
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(0, py + wave, 0, py - wave, -px, py);

        //TODO优化
        var gradient = npc.ctx.createLinearGradient(0, py, 0, contHeight - this.y);
        gradient.addColorStop(0, color_lite);
        gradient.addColorStop(0.5, color_base);
        gradient.addColorStop(1, color_deep);

        ctx.strokeStyle = color_base;
        ctx.strokeWidth = 1;
        ctx.stroke();

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    });
    water.timer = 0;
    water.rotate = 0;
    water.deg = toArc(90);
    setWater(0, 90);
    npc.add(water);
}

var setWater = function(rotate, deg){
    water.targetRotateDis = (rotate - water.rotate) % 360;
    // document.getElementsByTagName('h1')[0].innerHTML = deg;
    if(water.targetRotateDis > 180){
        water.targetRotateDis = water.targetRotateDis - 360;
    }
    if(water.targetRotateDis < -180){
        water.targetRotateDis = 360 - water.targetRotateDis;
    }
    water.targetDeg = toArc(deg);
    // npc.canvas.style.backgroundColor = 'hsla(177, 61.23%, 55%, '+ min(.1, max(0, 1 - water.deg + 1.13 - .6))+')';
}
var calcHorizon = function(a,b,r){
    // console.log(parseInt(a),parseInt(b),parseInt(r))
    var synbr = r > 0 ? 1 : -1,
        synbb = b > 0 ? 1 : -1;
    r = abs(r);
    b = abs(b);

    var checkr = r - 90 > 0;

    var rotate = 0;
    //最后应该不是加cos...
    rotate = b > r ? 
        (synbb > 0 ? 0 : 180) + (synbb > 0 ? 1 : -1) * (synbr > 0 ? -1 : 1) * r * cos(toArc(b)):
        (synbr > 0 ? 270 : 90) + (synbb ^ synbr ? -1 : 1) * b;

    // switch(true){
    //     case synbb > 0 && synbr < 0 : //1象限
    //         rotate = b > r ? r : 90 - b;
    //         break;
    //     case synbb < 0 && synbr < 0 : //2象限
    //         rotate = b > r ? 180 - r : 90 + b;
    //         break;
    //     case synbb < 0 && synbr > 0 : //3象限
    //         rotate = b > r ? 180 + r : 270 - b;
    //         break;
    //     case synbb > 0 && synbr > 0 : //4象限
    //         rotate = b > r ? -r : 270 + b;
    //         break;
    // }
    var deg = (r + b) | 0;
    // deg = 90 + (deg > 90 ? 1 : -1) * 90 * pow((90 - deg) / 90, 2);
    deg = max(80, min(deg, 180));
    setWater(rotate, deg);
}

var initBase = function(engine){
	npc = engine;
    initWater();
    var counter = 0
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e){
            if(counter++ > 3){
                counter = 0;
                calcHorizon(e.alpha, e.beta, e.gamma);
            }
        });
　　}
}
module.exports = {
	init : initBase,
    name : 'Aqua'
}
