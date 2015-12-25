/** track@alpha:{"version":"0.2.45","build":"2015-12-25 11:52:18","hash":""} */
import spa from './spa'

module.exports = function($){
    var mod_spa = spa($);
    return {
        iLoad : function(url){
            new Promise(function(res, rej){
                var i = document.createElement('iframe');
                i.style.cssText = 'border:0;margin:0;padding:0;visibility:hidden;height:0;width:0;overflow:hidden;';
                i.onload = function(){
                    // try{
                        if(!i.contentWindow.document.title && !i.contentWindow.fin){
                            rej();
                        }
                        else{
                            res(i);
                        }
                    // }catch(e){
                        res(i);
                    // }
                    $.remove(i);
                }
                i.src = url;
                document.body.appendChild(i);
            });
        },
        loadPage : mod_spa.loadPage,
        register : mod_spa.register,
        controllers : mod_spa.controllers,
        pages : mod_spa.pages,
        spa : mod_spa
    }
}
