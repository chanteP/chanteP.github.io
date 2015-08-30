import $ from 'np-kit'
import histroy from 'np-history'

import Controller from './controller'
import Page from './page'

var go = (href) => {
    histroy.pushState(null, '', href);
    new Page(location.pathname).show();
}

export default function(){
    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            var target = this.getAttribute('target');
            if(target){return;}
            e.preventDefault();
            var href = this.getAttribute('href');
            go(href);
        });

    $.domReady(() => {
        histroy.onpopstate(() => {
            new Page(location.pathname).show();
        });
        histroy.replaceState(null, '', location.pathname);
        new Page(location.pathname).show();
    });
    return {
        register(controller, factory){
            controller = new Controller(controller);
            controller.set(factory.call(controller, $));
            controller.check();
        },
        loadPage(uri, contentNode, {scripts = [], styles = []}){
            var page = new Page(uri);
            if(page.loader > page.LOADING){return;}
            page.needInit = !!scripts.length;
            page.setContent(contentNode.innerHTML);
            contentNode.innerHTML = '';
            styles.forEach(function(url){
                if(url[0] === '/' || url[0] === '.'){
                    $.load(url);
                }
                else{
                    $.insertStyle(url);
                }
            });
            scripts.forEach(function(url){
                if(url[0] === '/' || url[0] === '.'){
                    $.load(url);
                }
                else{
                    eval(url);
                }
            });
        },
        load : go,

        Page : Page,
        Controller : Controller,

        controllers : Controller.list,
        pages : Page.list
    };
}