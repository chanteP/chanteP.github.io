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
        toggle : function(){
            $.scrollTo(this.node.offsetTop, wrapper);

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

            var self = this;
            setTimeout(function(){
                [].forEach.call($.findAll('[data-fake]', this.node), function(btn){
                    btn.dataset.fake = '/blog' + (self.status === self.SHOW ? '' : self.mark);
                });
            }, 0);
        }
    }
    var togglePost = function(e){
        e.preventDefault()
        var url = this.getAttribute('href');
        if(!storage[url]){
            storage[url] = new Post($.parent(this, '[data-node="postlist"]'), url);
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
                .on('click', '[data-act="loadBlog"]', togglePost);
        },
        show : function(){
            alert('show')
        }
    }
});