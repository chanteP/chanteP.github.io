import {$} from '../core'
import css from './style.scss'

$.register('lab', ($) => {
    return {
        init : function(){
            setTimeout(() => {
                $.lazyload($.find('.page_lab', this.node), $.find('.page_lab', this.node), 'data-lazyload', function(el, src){
                    el.src = src;
                });
            }, 500);
        }
    };
});