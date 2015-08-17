var $ = require('np-kit');
module.exports = function(pageShow, pageHide){
    var wrapper = $.find('#wrapper');

    pageHide.run('hide');
    $.remove(pageHide.contentNode);

    if(!pageShow.inited){
        pageShow.run('init');
        pageShow.inited = true;
    }

    wrapper.appendChild(pageShow.contentNode);
    pageShow.run('show');
}