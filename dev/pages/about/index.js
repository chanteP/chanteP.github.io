core.register('about', function($){
    return {
        init : function(){
            console.log('about init')
        },
        show : function(){
            console.log('about show')
        },
        hide : function(){
            console.log('about hide')
        }
    };
});