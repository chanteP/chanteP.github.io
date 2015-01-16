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
    color_deep = 'hsl('+(mainColor+5)+', 71.23%, 60%)',
    color_border = 'hsl('+mainColor+', 51.23%, 50%)'
    ;
var $ = require('../kit');
var defaultDeg = $.isMobileMode ? 104 : 90;
var toArc = function(deg){
    return deg * 2 * PI / 360;
}

var initWater = function(){
    contWidth = npc.width;
    contHeight = npc.height;
    R = sqrt(pow(contHeight/npc.pixelRatio, 2) + pow(contWidth/npc.pixelRatio, 2));

    //TODO优化
    var gradient = npc.ctx.createLinearGradient(0, 0, 0, contHeight);
    gradient.addColorStop(0, color_lite);
    gradient.addColorStop(0.5, color_base);
    gradient.addColorStop(1, color_deep);

    water = npc.create(.5 * contWidth, .5 * contHeight, function(ctx, fps){
        // this.rotate += this.targetRotateDis * 2 / fps;
        this.rotate += (this.targetRotate - this.rotate) / fps;
        this.deg += (this.targetDeg - this.deg) / fps;

        var px = (R * sin(this.deg)) | 0, py = (R * cos(this.deg)) | 0;
        var arcTime, wave;

        ctx.rotate(toArc(this.rotate));

        ctx.beginPath();

        ctx.arc(0, 0, R, PI / 2 + this.deg, PI / 2 - this.deg, true);

        arcTime = sin(toArc(this.timer++));
        wave = (arcTime * min(100, R - abs(py))) | 0;
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(0, py + wave, 0, py - wave, -px, py);


        ctx.strokeStyle = color_border;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    });
    water.timer = 0;
    water.rotate = 0;
    water.deg = toArc(defaultDeg);
    setWater(0, defaultDeg);
    npc.add(water);
}

var setWater = function(rotate, deg){
    rotate = rotate === null ? water.targetRotate : rotate;
    water.rotate = water.rotate % 360;
    
    water.targetRotate = -rotate % 360;
    // water.targetRotateDis = -rotate - water.rotate;
    if(water.targetRotate > 180){
        water.targetRotate -= 360;
    }
    if(water.targetRotate < -180){
        water.targetRotate += 360;
    }
    // document.getElementsByTagName('h1')[0].innerHTML = water.rotate;
    water.targetDeg = toArc(deg);
    // npc.canvas.style.backgroundColor = 'hsla(177, 61.23%, 55%, '+ min(.1, max(0, 1 - water.deg + 1.13 - .6))+')';
}
var calcHorizon = function(x, y, z){
    var g1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var rotate = Math.acos(y / g1) * 360 / 2 / Math.PI;
    // document.getElementsByTagName('h1')[0].innerHTML = g1 + ' ' +z;
    var deg = (z < 0 ? g1 : 10 - g1 + 14) / 10 / 2 * 180;

    rotate = 180 - (x > 0 ? 1 : -1) * rotate;
    deg = max(80, min(deg, 180));
    setWater(rotate, deg);
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
    //TODO
    page.onPageChange(function(pageName){
        clearTimeout(timer);
        if(pageName === 'index'){
            lock = false;
            setWater(null, defaultDeg);
            npc.play();
        }
        else{
            lock = true;
            setWater(0, 180);
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
