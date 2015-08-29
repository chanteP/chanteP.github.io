import $ from '../core'
$.register('lab', ($) => {
    return {
        init(){
            console.log('lab init')
        },
        show(){
            console.log('lab show')
        },
        hide(){
            console.log('lab hide')
        }
    };
});