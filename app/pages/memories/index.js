import {$} from '../core'
import css from './style.scss'

$.register('memories', () => {
    return {
        init(){
            $.nav.check(true);
            $.nav.set('memories');
            [].map.call($.findAll('[data-lazyload]', this.node), (el) => {
                el.style.height = el.clientWidth * 0.67 + 'px';
            });
            $.lazyload($.find('.gallery_list', this.node), $.find('.gallery_list', this.node), 'data-lazyload', function(el, src){
                el.src = src;
                el.style.height = '';
                el.parentNode.classList.remove('loading');
            });
        },
        show(){
        },
        hide(){
        }
    };
});