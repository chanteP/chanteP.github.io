/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
import Controller from './controller'
import Page from './page'
import $ from './kit'
import h from '../history'

var histroy;

var go = (href) => {
    histroy.pushState(null, '', href);
    new Page(location.pathname).show();
}

export default function($){
    histroy = h($).history;
    $.listener(document)
        .on('click', 'a[href^="/"]', function(e){
            var target = this.getAttribute('target');
            if(target){return;}
            e.preventDefault();
            var href = this.getAttribute('href');
            go(href);
            $.ga && $.ga('send', 'pageview');
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
        loadPage(uri, contentNode, {scripts = [], styles = []} = {}){
            var page = new Page(uri);
            if(page.loader > page.LOADING){return;}
            page.needInit = !!scripts.length;
            page.controller.state = page.controller.state || !page.needInit;
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
            page.controller.check();
        },
        load : go,

        Page : Page,
        Controller : Controller,

        controllers : Controller.list,
        pages : Page.list
    };
}