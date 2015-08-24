core.register('blog', function($){
    return {
        init : function(){
            console.log('blog init')
        },
        show : function(){
            console.log('blog show')
        },
        hide : function(){
            console.log('blog hide')
        }
    };
});