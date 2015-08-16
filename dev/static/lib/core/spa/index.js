var $ = require('np-kit');

window.loadPage = function(contentNode, url){
    var template = contentNode.innerHTML;

    $.load(url);
}