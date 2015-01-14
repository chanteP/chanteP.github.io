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
        // this.rotate += (this.targetRotate - this.rotate) / fps;
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
    rotate = rotate === null ? water.targetRotate : rotate;
    water.targetRotate = rotate;
    water.targetRotateDis = -rotate - water.rotate;
    if(water.targetRotateDis > 180){
        water.targetRotateDis -= 360;
    }
    else if(water.targetRotateDis < -180){
        water.targetRotateDis += 360;
    }
    water.targetDeg = toArc(deg);
    // npc.canvas.style.backgroundColor = 'hsla(177, 61.23%, 55%, '+ min(.1, max(0, 1 - water.deg + 1.13 - .6))+')';
}
var calcHorizon = function(x, y, z){
    var g1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var rotate = Math.acos(y / g1) * 360 / 2 / Math.PI;
    var deg = (z < 0 ? g1 : 9.8 + g1) / 9.8 / 2 * 180;

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    deg = max(80, min(deg, 180));
    setWater(rotate, deg);
    // document.getElementsByTagName('h1')[0].innerHTML = g1 + ', ' + z;
}

var initBase = function(engine){
    npc = engine;
    initWater();
    var lock = false;
    var counter = 0;
    if (window.DeviceOrientationEvent) {
        window.addEventListener('devicemotion', function(e){
            if(counter++ > 3){
                counter = 0;
                if(lock){return;}
                calcHorizon(e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z);
            }
        });
　　}
    var timer;
    page.onPageChange(function(pageName){
        clearTimeout(timer);
        if(pageName === 'index'){
            lock = false;
            setWater(null, 90);
            npc.play();
        }
        else{
            lock = true;
            setWater(null, 180);
            timer = setTimeout(function(){
                npc.pause();
            }, 5000);
        }
    });
    var battery = navigator.battery || navigator.webkitBattery;
    if (battery) {
        battery.addEventListener("levelchange", function (e){
            if(battery.level < .5){
                npc.stop();
            }
        });
    }
}
module.exports = {
    init : initBase,
    name : 'Aqua'
}
var page = require('../spa');
