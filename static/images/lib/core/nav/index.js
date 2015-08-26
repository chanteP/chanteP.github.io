var nav, api;

module.exports = function($){
    api = {
        set : function(page){
            if(!nav){return;}
            [].forEach.call($.findAll('.cur', nav), function(node){node.classList.remove('cur');});
            [].some.call($.findAll('[data-for]', nav), function(li){
                if(li.dataset['for'].split(',').indexOf(page) >= 0 && !+li.dataset['hide']){
                    li.classList.add('cur');
                    return true;
                }
            }) ? api.show() : api.hide();
        },
        show : function(){
            nav && nav.classList.add('show');
        },
        hide : function(){
            nav && nav.classList.remove('show');
        }
    }
    $.domReady(function(){
        nav = $.find('#mainnav');

        nav.set = api.set;
        nav.show = api.show;
        nav.hide = api.hide;
    });   
    return api; 
}
