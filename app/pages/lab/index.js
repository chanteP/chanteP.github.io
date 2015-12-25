import {$} from '../core'
import css from './style.scss'

$.register('lab', ($) => {
    return {
        init : () => {
            $.lazyload($.find('#wrapper'), wrap, 'data-lazy', function(el, src){
                el.src = src;
            });
        }
    };
});