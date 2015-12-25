/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
import $ from './kit'
import dom from '../dom'

var base = dom($);

// var loadingTemplate = '<div data-node="pageloading" class="loading" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>';
var contentTemplate = [
    '<div class="page-wrap" data-page>',
    // loadingTemplate,
    '</div>'
].join('');

var wrapper;

var getWrapper = () => {
    return wrapper || (wrapper = $.find('#wrapper'));
}

export default {
    build(page){
        return $.create(contentTemplate);
    },
    hide(page){
        page.run('hide');
        base.animate(page.node, 'fadeOutDown', function(){
            $.remove(page.node);
            page.run('afterHide');
        }, true);
    },
    show(page){
        // getWrapper().innerHTML = '';
        page.run('beforeShow');
        if(page.node.parentNode !== getWrapper()){
            getWrapper().appendChild(page.node);
            page.constructor.last && page.constructor.last !== page.uri && base.animate(page.node, 'fadeInDown', null, true);
        }
        if(page.loader < page.LOADED){
            base.setLoading(true);
            return;
        }
        else{
            base.setLoading(false);
        }
        if(page.loader < page.INITED){
            page.run('init');
            page.loader = page.INITED;
        }
        page.run('show');
    }
}