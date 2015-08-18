var $ = require('np-kit');
var loader = require('./loader')();


module.exports = function(){
    $.evt(document)
        .on('click', 'a[href^="/"]', function(e){
            e.preventDefault();
            var href = this.getAttribute('href');
            var target = this.getAttribute('target');
            if(target){return;}

            loader.load(href);
        });
    $.domReady(function(){
        loader.init();
    });
    return {
        register : loader.register,
        loadPage : loader.loadPage
    };
}