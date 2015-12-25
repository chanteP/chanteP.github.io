import {$} from '../core'
import css from './style.scss'

$.register('lab', ($) => {
    return {
        init : function(){
            $.lazyload($.find('#wrapper'), this.node, 'data-lazy', function(el, src){
                el.src = src;
            });
        }
    };
});