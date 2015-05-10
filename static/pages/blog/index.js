window.parent.core.initPage(document, function(wrap, $, window){
    var bindUrl = window.core.on;
    var D = window.DataBind;
    var wrapper = $.find('#wrapper');

    var storage = {};

    // init()
    return {
        init : function(){
            // $.evt(wrap, {})
            //     // .on('click', function(){alert(2424534)})
            //     .on('tap', '[data-act="loadBlog"]', togglePost)
            //     .on('tap', '[data-act="toTop"]', function(){
            //         storage[$.parent(this, '[data-node="postlist"]').dataset.url.slice(2)].scrollTo();
            //     });
        },
        show : function(){
            // var checkHash = window.location.hash, artical;
            // if(window.String(checkHash).length > 8){
            //     var artical = $.find('[data-url="'+checkHash+'"]', wrap);
            //     togglePost(artical);
            // }
        }
    }
});