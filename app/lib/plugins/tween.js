/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
var parse = function(){
    var type = 0, args = arguments
    var hold = false, rsObj, curObj;
    if(args[args.length-1] === true){
        hold = true;
    }
    rsObj = hold ? args[0] : {};
    for(var i = +hold, j = args.length - hold; i<j; i++) {
        curObj = args[i];
        if(typeof curObj !== 'object'){continue;}
        for(var key in (type ? curObj : args[0])){
            if(!args[i].hasOwnProperty(key)){continue;}
            rsObj[key] = curObj[key];
        }
    };
    return rsObj;
};
window.requestAnimationFrame = null
    || window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(callback) {setTimeout(callback, 1000 / 60);};
    //raf优化
var tweenAniAnchor = function(opts){
    opts = parse({
        'type' : 'cubic-easein',
        'begin': 0,
        'end'  : 0,
        'duration' : 600,
        'extra' : undefined,
        'func' : function(){},
        'fps' : 60,
        'endfunc' : function(){}
    },opts);
    var spf = 1000 / opts.fps;
    var duration = opts.duration;
    var step = Math.round(duration / spf);
    var tweenTRS = tweenT(opts.type, opts.begin, opts.end, step, opts.extra);
    var startTimer = Date.now(), distance;
    var controll;
    var ani = {
        'stop' : function(){
            controll = true;
        },
        'opts' : opts
    };
    var frame = function(){
        if(controll){return;}
        distance = Date.now() - startTimer;
        if(distance >= duration){
            ani.step = Math.round(duration / spf);
            opts.func.call(ani, opts.end, duration, duration, opts);
            opts.endfunc();
            return;
        }
        ani.step = Math.round(distance / spf);
        opts.func.call(ani, tweenTRS(ani.step), distance, duration, opts);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return ani;
};
//指定t输出数值
var tweenT = function(type, begin, end, duration, extra){
    var b = Math.min(begin, end);
    var c = Math.max(begin, end);
    return function(t){
        if(t > duration){return end;}
        return begin > end ? 
            c - tween[type].apply(null, [t, 0, c-b, duration].concat(extra)): 
            b + tween[type].apply(null, [t, 0, c-b, duration].concat(extra));
    }
};

var tween;
tweenAniAnchor.types = tween = (function(){
    var rs = {};
    var type = {
        'linear' : function(t, b, c, d) {
            return c * t / d + b;
        },
        'quad' : {
            easeIn : function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut : function(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut : function(t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        'cubic' : {
            easeIn : function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut : function(t, b, c, d) {
                return c * (( t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut : function(t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        'quart' : {
            easeIn : function(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut : function(t, b, c, d) {
                return -c * (( t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut : function(t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        'quint' : {
            easeIn : function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut : function(t, b, c, d) {
                return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut : function(t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        'sine' : {
            easeIn : function(t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut : function(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut : function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        'expo' : {
            easeIn : function(t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut : function(t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut : function(t, b, c, d) {
                if (t == 0)
                    return b;
                if (t == d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        'circ' : {
            easeIn : function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut : function(t, b, c, d) {
                return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
            },
            easeInOut : function(t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        'elastic' : {
            easeIn : function(t, b, c, d, a, p) {
                if (t == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!p)
                    p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut : function(t, b, c, d, a, p) {
                if (t == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!p)
                    p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut : function(t, b, c, d, a, p) {
                if (t == 0)
                    return b;
                if ((t /= d / 2) == 2)
                    return b + c;
                if (!p)
                    p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1)
                    return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        'back' : {
            easeIn : function(t, b, c, d, s) {
                if (s == undefined)
                    s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut : function(t, b, c, d, s) {
                if (s == undefined)
                    s = 1.70158;
                return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut : function(t, b, c, d, s) {
                if (s == undefined)
                    s = 1.70158;
                if ((t /= d / 2) < 1)
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        'bounce' : {
            easeIn : function(t, b, c, d) {
                return c - type.bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut : function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut : function(t, b, c, d) {
                if (t < d / 2)
                    return type.bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else
                    return type.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    };
    for(var key in type){
        if(typeof type[key] === 'function'){
            rs[key] = type[key];
        }
        else{
            for(var style in type[key]){
                rs[key + '-' + style.toLowerCase()] = type[key][style];
            }
        }
    }
    return rs;
})();
module.exports = {
    tween : tweenAniAnchor
}
