window.parent.core.initPage(document, function(wrap, $, window){
    var bindUrl = window.core.on;
    var content, title, bread;

    var build = function(url){
        if(!url){
            content.innerHTML = '';
            return;
        }
        $.iLoad(url, function(i){
            content.innerHTML = i.contentWindow.content.innerHTML;
            articleBread.innerHTML = title.innerHTML = i.contentWindow.document.title;
        }, function(){
            content.innerHTML = 'loadError';
        });
    };

    return {
        init : function(){
            content = $.find('#articleContent', wrap);
            bread = $.find('#articleBread', wrap);
            title = $.find('#articleTitle', wrap);
        },
        show : function(){
            build(window.location.hash.slice(2));
        },
        hide : function(){
            build('');
        }
    }
});