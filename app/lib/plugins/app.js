/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
export default ($) => {
    $.domReady(() => {
        $.listener(document.body).on('click', '[target="_self"]', function(e){
            e.preventDefault();
            $.app.locate(this.href);
        });
    })
    return {
        app : {
            close : (force) => {
                if(force){
                    window.open('', '_self').close();
                }
                else{
                    $.app.onCloseFuncList.some((func) => {
                        return func();
                    }) || $.app.close(true);
                }
            },
            back : () => {
                window.history.go(-1);
            },
            onBack : (func) => {
                $.history.onback(func);
            },
            onCloseFuncList : [],
            onClose : (func) => {
                if(typeof func === 'function'){
                    $.app.onCloseFuncList.push(func);
                }
            },
            setTitle : (title) => {
                document.title = title;
                $.trigger(document, 'setTitle');
            },
            locate : (url) => {
                document.body && document.body.classList.add('locate');
                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            }
        }
    }
}