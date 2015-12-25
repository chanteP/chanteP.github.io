import $ from '../../base/kit'
var nav, api;

export default ($) => {
    api = {
        set(page){
            if(!nav){return;}
            [].forEach.call($.findAll('.cur', nav), (node) => {node.classList.remove('cur');});
            [].some.call($.findAll('[data-for]', nav), (li) => {
                if(li.dataset['for'].split(',').indexOf(page) >= 0 && !+li.dataset['hide']){
                    li.classList.add('cur');
                    return true;
                }
            }) ? api.show() : api.hide();
        },
        show(){
            nav && nav.classList.add('show');
        },
        hide(){
            nav && nav.classList.remove('show');
        }
    }
    $.domReady(() => {
        nav = $.find('#mainnav');

        nav.set = api.set;
        nav.show = api.show;
        nav.hide = api.hide;
    });   
    return {
        nav : api
    }; 
}
