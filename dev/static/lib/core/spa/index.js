import $ from 'np-kit'
import histroy from 'np-history'

import Controller from './controller'
import Page from './page'

var go = (href) => {
    histroy.pushState(null, '', href);
}

export default function(){
    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href = this.getAttribute('href');
            var target = this.getAttribute('target');
            if(target){return;}
            go(href);
        });

    $.domReady(() => {
        histroy.onstatechange(() => {
            new Page(location.pathname).show();
        });
        histroy.replaceState(null, '', location.pathname);
    });
    return {
        register(controller, factory){
            controller = new Controller(controller);
            controller.set(factory.call(controller, $));
            controller.check();
        },
        loadPage(uri, contentNode, option){
            var scripts = option.scripts || [],
                styles = option.styles || [];

            var page = new Page(uri);
            if(page.loader > page.LOADING){return;}
            page.needInit = !!scripts.length;
            page.setContent(contentNode.innerHTML);
            styles.concat(scripts).forEach(function(url){
                $.load(url);
            });
        },
        load : go,

        Page : Page,
        Controller : Controller,

        controllers : Controller.list,
        pages : Page.list
    };
}