window.parent.core.initPage(document, function(wrap, $, window){
    var bindUrl = window.core.on;
    var content;

    var build = function(url){
        if(!url){
            content.innerHTML = '';
            return;
        }
        $.iLoad(url, function(i){
            content.innerHTML = i.contentWindow.content.innerHTML;
        }, function(){
            content.innerHTML = 'loadError';
        });
    };

    return {
        init : function(){
            content = $.find('#articalContent', wrap);
        },
        show : function(){
            build(window.location.hash.slice(2));
        },
        hide : function(){
            build('');
        }
    }
});