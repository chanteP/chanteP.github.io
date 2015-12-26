import {$} from '../core'
import css from './style.scss'

$.register('memories', () => {
    return {
        init(){
            $.nav.check(true);
            $.nav.show();
            $.lazyload($.find('.gallery_list', this.node), $.find('.gallery_list', this.node), 'data-lazyload', function(el, src){
                el.src = src;
            });
        },
        show(){
        },
        hide(){
        }
    };
});