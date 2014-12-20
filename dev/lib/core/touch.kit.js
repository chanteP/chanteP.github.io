var $ = require('./kit');
if(!document){return;}
var func = {
    'enter' : function(e){
        $.touch = e.touches.length;
    },
    'leave' : function(e){
        $.touch = e.touches.length;
    },
    'down' : function(){
        $.touch = true;
    },
    'up' : function(){
        $.touch = false;
    }
}
if('ontouchstart' in window){
    document.addEventListener('touchstart', func.enter);
    document.addEventListener('touchend', func.leave);
}
else{
    document.addEventListener('mousedown', func.down, 1);
    document.addEventListener('mouseup', func.up, 1);
}
module.exports = 0;