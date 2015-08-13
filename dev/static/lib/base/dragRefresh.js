/*
    下拉刷新
*/
module.exports = function(){
    window.document.addEventListener('DOMContentLoaded', function(){
        var wrapper = window.document.getElementById('wrapper');
        if(!wrapper){return;}
        wrapper.addEventListener('scroll', function(){
            document.body.classList[this.scrollTop < 0 ? 'add' : 'remove']('drag-reload');
            if(this.scrollTop < -50){
                document.body.classList.add('done');
            }
            else{
                document.body.classList.remove('done');
            }
        });
        wrapper.addEventListener('touchend', function(){
            if(this.scrollTop < -50){
                window.location.reload();
            }
        });
    });
}