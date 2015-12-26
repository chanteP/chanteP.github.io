import $ from '../../base/kit'
var nav, api;

export default ($) => {
    api = {
        set(page){
            if(!nav){return;}
            api.check();
            [].forEach.call($.findAll('.cur', nav), (node) => {node.classList.remove('cur');});
            [].some.call($.findAll('[data-for]', nav), (li) => {
                if(li.dataset['for'].split(',').indexOf(page) >= 0 && !+li.dataset['hide']){
                    li.classList.add('cur');
                    $.scrollTo([li.offsetLeft - nav.clientWidth / 2 + li.clientWidth / 2], nav);
                    return true;
                }
            }) ? api.show() : api.hide();
        },
        show(){
            nav && nav.classList.add('show');
        },
        hide(){
            nav && nav.classList.remove('show');
        },
        check(){
            if(new Date().getHours() > 6){return;}
            [].map.call($.findAll('li[data-for="???"]'), (li) => {
                li.outerHTML = [
                    '<li data-for="memories">',
                        '<a href="/memories"><icon>᯽</icon><span>memories</span></a>',
                    '</li>'
                ].join('\n');
            });
        }
    }
    $.domReady(() => {
        nav = $.find('#mainnav');
        api.check();

        nav.set = api.set;
        nav.show = api.show;
        nav.hide = api.hide;
    });   
    return {
        nav : api
    }; 
}
