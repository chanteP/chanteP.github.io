window.parent.core.initPage(document, function(wrap, $, window){
    var bindUrl = window.core.on;
    var D = window.DataBind;
    var wrapper = $.find('#wrapper');

    var storage = {};

    var Post = function(node, url){
        this.url = url;

        this.node = node;
        this.contentNode = $.find('[data-node="content"]', node);

        this.status = this.WAITING;
        this.mark = this.node.dataset.url;
        this.toggle();
    }
    Post.prototype = {
        WAITING : 'waiting',
        LOADING : 'loading',
        LOADED : 'loaded',
        AUTOHIDE : 'autohide',
        ERROR : 'error',
        HIDE : 'hide',
        SHOW : 'show',

        set status(value){
            this.cacheStatus = value;
            this.node.dataset.status = value;
            this.setProps(value);
            return value;
        },
        get status(){
            return this.cacheStatus;
        },

        load : function(){
            this.status = this.LOADING;
            $.iLoad(this.url, this.getContent.bind(this), this.loadFail.bind(this));
        },
        getContent : function(i){
            this.status = this.LOADED;
            try{
                this.contentNode.innerHTML = i.contentWindow.document.getElementById('content').innerHTML;
            }catch(e){}
            this.status = this.SHOW;
        },
        loadFail : function(){
            this.status = this.ERROR;
        },
        scrollTo : function(){
            var padding = window.getComputedStyle(wrap);
            padding = padding ? parseInt(padding['padding-top']) : 0;
            $.scrollTo(this.node.offsetTop + padding + 8 - ($.isMobileMode ? 70 : 0), wrapper);
        },
        toggle : function(){
            this.scrollTo();
            if(this.status === this.ERROR || this.status === this.WAITING){
                this.load();
                return;
            }
            switch (this.status){
                case this.LOADED : ;
                case this.AUTOHIDE : ;
                case this.HIDE : 
                    this.status = this.SHOW;
                    break;
                case this.SHOW :
                    this.status = this.HIDE;
                    break;
                default : 
                    break;
            }
        },
        setProps : function(status){
            var self = this;
            window.setTimeout(function(){
                [].forEach.call($.findAll('[data-fake]', self.node), function(btn){
                    btn.dataset.fake = '/blog' + (status === self.SHOW ? '' : self.mark);
                });
            }, 0);

            this.contentNode.style.height = status === this.SHOW ? this.contentNode.scrollHeight + 'px' : '';
        }
    }
    var togglePost = function(e){
        var unitDOM;
        if(!e){return;}
        if(e.toString().slice(-8) === "Element]"){
            unitDOM = e;
        }
        else{
            e.preventDefault()
            unitDOM = $.parent(this, '[data-node="postlist"]');
        }
        var url = unitDOM.dataset.url.slice(2);
        if(!storage[url]){
            storage[url] = new Post(unitDOM, url);
        }
        else{
            storage[url].toggle();
        }
    }
    // init()
    return {
        init : function(){
            $.evt(wrap)
                // .on('click', function(){alert(2424534)})
                .on('click', '[data-act="loadBlog"]', togglePost)
                .on('click', '[data-act="toTop"]', function(){
                    storage[$.parent(this, '[data-node="postlist"]').dataset.url.slice(2)].scrollTo();
                });
        },
        show : function(){
            var checkHash = window.location.hash, artical;
            if(window.String(checkHash).length > 8){
                var artical = $.find('[data-url="'+checkHash+'"]', wrap);
                togglePost(artical);
            }
        }
    }
});