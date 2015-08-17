core.register('index', function($, wrap){
    console.log(wrap)
    return {
        show : function(){
            console.log('index show')
        },
        hide : function(){
            console.log('index hide')
        }
    };
});