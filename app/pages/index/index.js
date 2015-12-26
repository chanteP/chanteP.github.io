import {$} from '../core'
import css from './style.scss'

$.register('index', () => {
    return {
        init(){
            $.nav.check();
        },
        show(){
        },
        hide(){
        }
    };
});