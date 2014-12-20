var nav;
var $ = require('../kit');

document.addEventListener('DOMContentLoaded', function(){
    nav = $.find('#mainnav');

    nav.set = function(page){
        var cur = $.find('.cur', nav);
        var to = $.find('[data-for="'+page+'"]', nav);
        cur && cur.classList.remove('cur');
        to && to.classList.add('cur');
        to && (to.dataset.hide ? this.hide() : this.show());
    }
    nav.show = function(){
        nav.classList.add('show');
    }
    nav.hide = function(){
        nav.classList.remove('show');
    }
});
