import {$} from '../core'
import css from './style.scss'

$.register('lab', ($) => {
    return {
        init : function(){
            $.lazyload($.find('.page_lab', this.node), $.find('.page_lab', this.node), 'data-lazy', function(el, src){
                el.src = src;
            });
        }
    };
});