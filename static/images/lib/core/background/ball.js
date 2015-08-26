var npc, ball, ballGroup = [];
var PI2 = Math.PI * 2, 
    abs = Math.abs,
    random = Math.random;

var initBall = function(){
    ball = npc.create(function(ctx, fps){
        this.reCalc(fps);
        ctx.fillStyle = this.color || '#48D3CE';
        ctx.beginPath();
        ctx.arc(0,0,this.r,0,PI2);
        ctx.closePath();
        ctx.fill();
    });
    ball.reCalc = function(fps){
        this.alpha = this.alpha + 1 * 1/1/fps;
        this.alpha = this.alpha > .4 ? .4 : this.alpha;
        this.color = 'hsla('+this.h+',80%,80%,'+this.alpha+')';

        if(!this.targetX || abs(this.x - this.targetX) < 2){
            var disX = random() * 50 - 25;
            this.dirX = disX > 0 ? 1 : -1;
            this.targetX = this.x + disX;
        }
        if(!this.targetY || abs(this.y - this.targetY) < 2){
            var disY = random() * 50 - 25;
            this.dirY = disY > 0 ? 1 : -1;
            this.targetY = this.y + disY;
        }
        var goDis = 3/fps;
        this.x += this.dirX * goDis;
        this.y += this.dirY * goDis;
    }
}
var newBall = function(){
    var b = ball.extend({
        alpha : 0,
        x : random() * document.documentElement.clientWidth,
        y : random() * document.documentElement.clientHeight,
        r : random() * 30 + 30,
        h : random() * 60 - 30 + 220
    });
    ballGroup.push(b);
}
var initBase = function(engine){
    npc = engine;
    npc.add(ballGroup);
    initBall();
    var num = 40;
    while(num-->0){
        newBall();
    }
}
module.exports = {
    init : initBase,
    name : 'Ball'
}