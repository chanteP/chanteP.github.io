var $ = require('np-kit');
var contentTemplate = [
    '<div class="page-wrap" data-page>',
        '<div class="loading" style="width:100%;height:100%;"></div>',
    '</div>'
].join('');

var wrapper;

var getWrapper = function(){
    return wrapper || (wrapper = $.find('#wrapper'));
}

module.exports = {
    build : function(page){
        return $.create(contentTemplate);
    },
    hide : function(page){
        page.run('hide');
        $.remove(page.node);
        page.run('afterHide');
    },
    show : function(page){
        getWrapper().innerHTML = '';
        page.run('beforeShow');
        if(page.node.parentNode !== getWrapper()){
            getWrapper().appendChild(page.node);
        }
        if(page.loader < page.LOADED){
            document.body.classList.add('loading');
            return;
        }
        else{
            document.body.classList.remove('loading');
        }
        if(page.loader < page.INITED){
            page.run('init');
            page.loader = page.INITED;
        }
        page.run('show');
    }
}