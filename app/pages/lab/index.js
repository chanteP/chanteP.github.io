import {$} from '../core'
import css from './style.scss'

$.register('lab', ($) => {
    return {
        init : function(){
            $.lazyload(this.node.firstChild, this.node.firstChild, 'data-lazy', function(el, src){
                el.src = src;
            });
        }
    };
});